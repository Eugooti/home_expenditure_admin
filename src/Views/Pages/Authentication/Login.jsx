import Header from "../../../Components/Header/Header.jsx";
import {useForm} from "antd/es/form/Form.js";
import {Card, Form, Input, message} from "antd";
import {UnlockOutlined, UserOutlined} from "@ant-design/icons";
import axios from "axios";
import {setLocalStorage} from "../../../Utils/LocalStorage/localStorage.jsx";
import {GET_CATEGORIES,GET_EXPENDITURE} from "../../../API/RESTAPI/Requests.js";

const Login = () => {

    const [messageApi, contextHolder] = message.useMessage();

     const success = (message) => {
        messageApi.open({
            type: 'success',
            content: message,
        }).then(() => window.location.href='/');
    };
     const Error = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        }).then(() => console.log("opened"));
    };

    const [form] = useForm();

    const rules={
        username:[{required:true,message:"Required field"},{type:'email',message: "Enter a valid email"}],
        password:[{required:true,message:"Required field"}],
    }

    const onFormFinish =async (values) => {

        const username=values.username;
        const password=values.Password;

        try {
            const response = await axios.post("http://localhost:5000/api/login", { username, password });

            if (response.data.message === "Login successful") {

                console.log(response)
                setLocalStorage("User", response.data.user); // Log user information
                success(response.data?.message)
                setLocalStorage('authToken', response.data.authToken)
            }

        }catch (error) {
            if (error.response && error.response.status === 401) {
                // Handle 401 Unauthorized error here
                console.log(error.response.data);
                Error(error.response.data.message)
            } else {
                // Handle other errors here
                Error(error.message)
            }
        }
        // todo handle form finish
    };

    const onFormFinishFailed = (errorInfo) => {
        console.log(errorInfo)
        // todo handle form finish fail
    };

    const data=GET_CATEGORIES()
    const data2=GET_EXPENDITURE()

    console.log(data)
    console.log(data2)


    return (
        <div style={{height:'100vh'}} className={'flex justify-evenly bg-blue-400'}>
            {contextHolder}
            <div style={{outline:'dashed 2px rep '}} className={'grid grid-cols-1 md:gap-20 md:grid-cols-2 items-center justify-items-center '}>
                <div className={'flex flex-col'}>
                    <label  className={'font-bold italic text-2xl text-amber-900'}>Expenditure Tracker</label>
                    <label  className={'italic text-xl text-gray-700'}>
                        You can now manage you expenditure and save money.
                    </label>
                </div>

            <Card className={'md:h-2/3 h-3/4 w-2/3 flex justify-center align-middle flex-col '}>
                <Header Title={"Sign in"} Subtitle={"Welcome Back!"}/>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    initialValues={{remember: true}}
                    onFinish={onFormFinish}
                    onFinishFailed={onFormFinishFailed}
                    className={'grid gap-2'}

                >


                    <Form.Item rules={rules.username} label="User Name" name="username">
                        <Input
                            prefix={<UserOutlined/>}
                            size={"large"}>

                        </Input>
                    </Form.Item>
                    <Form.Item rules={rules.password} label="Password" name="Password">

                        <Input.Password
                            prefix={<UnlockOutlined/>}
                            type="password"
                            size={"large"}>

                        </Input.Password>
                    </Form.Item>

                    <Form.Item className={'flex justify-center'}>
                        <button className={'bg-gray-800 text-white text-lg hover:bg-gray-900 h-10 w-56 rounded-2xl '} type="submit">
                            sign in
                        </button>
                    </Form.Item>
                </Form>



            </Card>
            </div>
        </div>
    )
}
export default Login;
