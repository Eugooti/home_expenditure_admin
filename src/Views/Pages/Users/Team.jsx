import {useForm} from "antd/es/form/Form.js";
import {Button, Form, Input, message, Select, Space} from "antd";
import Header from "../../../Components/Header/Header.jsx";
import axios from "axios";
import {MinusCircleOutlined, PlusOutlined, PoweroffOutlined} from "@ant-design/icons";
import {useState} from "react";

const Team = () => {



    const [messageApi, contextHolder] = message.useMessage();

    const Error = (message) => {
        messageApi.open({
            type: 'error',
            content: message,
        }).then(() => console.log("opened"));
    };

    const rules={
        firstName:[{required:true,message:"Required Field"}],
        lastName:[{required:true,message:"Required Field"}],
        email:[{required:true,message:"Required Field"},{type:'email',message: "Enter a valid email"}],
        role:[{required:true,message:"Required Field"}],
        phone:[{required:true,message:"Required Field"},
            {pattern:/^(?:254|\+254|0)?((?:(?:7(?:(?:[01249][0-9])|(?:5[789])|(?:6[89])))|(?:1(?:[1][0-5])))[0-9]{6})$/ ,message:"Enter a valid phone number"}

        ]

    }

    const [form] = useForm();

    const roles=["Parent","Guardian","Children",'Relatives',"Guest"]

    const onFormFinish = async (values) => {

        const firstName=values.firstName;
        const lastName=values.lastName;
        const emailAddress=values.email;
        const phoneNumber=values.phone;
        const access=values.role;

        try {
            const response=await axios.post('http://localhost:5000/api/user',{firstName,lastName, emailAddress, phoneNumber, access});

            if (response.status!==201){
                throw new Error('Failed to create user');
            }

            messageApi.open({
                type:"success",
                content:response.data.message
            }).then(()=>onFormClearClick())


        }catch (error){

            if (error.response && error.response.status === 400) {
                // Handle 400 Unauthorized error here
                Error(error.response.data.error)
            } else {
                // Handle other errors here
                console.error(error);
            }
        }

        // todo handle form finish
    };

    const onFormFinishFailed = (errorInfo) => {
        // todo handle form finish fail
        console.log(errorInfo)
    };

    const onFormClearClick = () => {
        form.resetFields();
    };

    return (
        <div className={'flex justify-center'}>
            {contextHolder}

            <div className={'w-1/2'}>

                <Header Title={"Add Users."} Subtitle={"Whose the new user?"}/>

                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    initialValues={{remember: true}}
                    onFinish={onFormFinish}
                    onFinishFailed={onFormFinishFailed}
                    className={'grid gap-2'}
                >

                    <div className={'grid lg:grid-cols-2 gap-6 sm:gap-2'}>
                        <Form.Item rules={rules.firstName} className={'w-full'} label="First Name" name="firstName">
                            <Input size={"large"}/>
                        </Form.Item>
                        <Form.Item rules={rules.lastName} className={'w-full'} label="Last Name" name="lastName">
                            <Input size={"large"}/>
                        </Form.Item>
                    </div>

                    <Form.Item rules={rules.email} label="Email Address" name="email">
                        <Input size={"large"}/>
                    </Form.Item>
                    <Form.Item rules={rules.phone} label="Phone Number" name="phone">
                        <Input size={"large"}/>
                    </Form.Item>

                    <Form.Item rules={rules.role} name={'role'} label="Access">
                        <Select size={"large"}>
                            {roles.map((role,index)=>(
                                <Select.Option key={index} value={role} >{role}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.List name="users">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <Space
                                        key={key}
                                        style={{
                                            display: 'flex',
                                            marginBottom: 8,
                                        }}
                                        align="baseline"

                                    >
                                        <Form.Item
                                            {...restField}
                                            // label={"Allowance"}
                                            name={[name, 'Allowance']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Required field',
                                                },
                                            ]}
                                        >
                                            <Input  size={"large"} />
                                        </Form.Item>

                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Add Allowance
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item className={'flex justify-center'}>
                        <button className={'bg-gray-800 text-white text-lg hover:bg-gray-900 h-10 w-56 rounded-2xl '} type="submit">
                            Add User
                        </button>
                    </Form.Item>
                </Form>
            </div>

        </div>
    )
}
export default Team;