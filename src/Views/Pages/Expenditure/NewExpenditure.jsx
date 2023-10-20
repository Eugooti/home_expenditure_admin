import {Form, Input, message, Select} from "antd";
import Header from "../../../Components/Header/Header.jsx";
import {useForm} from "antd/es/form/Form.js";
import TextArea from "antd/es/input/TextArea.js";
import {UserContext} from "../../../Context/User Context/UserContext.jsx";
import {useContext} from "react";
import {CREATE_EXPENDITURE} from "../../../API/Mutations/Mutations.js";
import {useMutation, useQuery} from "@apollo/client";
import {GET_CATEGORIES_BY_USER} from "../../../API/Queries/Queries.js";

const NewExpenditure = () => {


    const User = useContext(UserContext);

    const [messageApi, contextHolder] = message.useMessage();

    const rules={
        name:[{required:true,message:"Required field"}],
        Category:[{required:true,message:"Required field"}],
        Cost:[{required:true,message:"Required field"}],
        Description:[{required:true,message:"Required field"}],
    }

    const [form] = useForm();

    const [createExpenditure] = useMutation(CREATE_EXPENDITURE);

    const onFormFinish = async (values) => {
        const { name, Category, Cost, description } = values;
        const createdBy = User?.emailAddress;

        try {
            const response = await createExpenditure({
                variables: {
                    name,
                    category: Category,
                    cost: parseInt(Cost),
                    description,
                    createdBy,
                },
            });

            if (response.data.createExpenditure) {
                messageApi.success('Expenditure created successfully').then(
                    ()=>{
                        onFormClearClick()
                        console.log(response.data.createExpenditure)
                    }
                );
            } else {
                throw new Error('Failed to create expenditure');
            }
        } catch (error) {
            console.error('Error adding expenditure', error);
        }
    };
    const onFormFinishFailed = (errorInfo) => {
        console.log(User?.emailAddress);
        console.log(errorInfo)
        // todo handle form finish fail
    };

    const onFormClearClick = () => {
        form.resetFields();
    };


    // const [Data, setData] = useState();

    // useEffect(() => {
    //
    //     const fetchCategories = async () => {
    //         try {
    //             const response = await fetch('http://localhost:5000/api/categories');
    //             const data=await response.json();
    //
    //             const originData=data.categories.map((item)=>({
    //                 key:item.id.toString(),
    //                 name:item.name,
    //                 maximumExpense:item.maximumCash,
    //                 description:item.description
    //             }))
    //
    //             setData(originData)
    //
    //         }catch (e) {
    //             // console.log("error",e)
    //         }
    //     }
    //
    //     fetchCategories()
    //
    // }, []);


    let Data=null;

    const {loading,error,data}=useQuery(GET_CATEGORIES_BY_USER,{
        variables:{emailAddress:User?.emailAddress}
    })

    if (loading){
        console.log("Loading")
    }
    if (error){
        console.log(error)
    }

    if (data && data.getCategoriesByUser){
        Data=data.getCategoriesByUser;
    }

    return (
            <div className={'flex  justify-center'}>

                {contextHolder}

                <div className={'w-1/2'}>


                <Header Title={"New Expenditure"} Subtitle={"What are we buying today"}/>
                <Form
                    form={form}
                    name="basic"
                    layout="vertical"
                    initialValues={{remember: true}}
                    onFinish={onFormFinish}
                    onFinishFailed={onFormFinishFailed}
                    className={'grid gap-2 '}
                >

                        <Form.Item rules={rules.name}  className={'w-full'} label="Item name." name="name">
                            <Input size={"large"}/>
                        </Form.Item>


                    <Form.Item rules={rules.Category}  name={'Category'} label="Category">
                        <Select size={"large"}>
                            {Data?.map((category,index)=>(
                                <Select.Option key={index} value={category.name} >{category.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item rules={rules.Cost} className={'w-full'} label="Cost" name="Cost">
                        <Input size={"large"}/>
                    </Form.Item>

                    <Form.Item rules={rules.Description} label="Description" name="description">
                        <TextArea rows={4}/>
                    </Form.Item>

                    <Form.Item className={'flex justify-center'}>
                        <button className={'bg-gray-800 text-white text-lg hover:bg-gray-900 h-10 w-56 rounded-2xl '} type="submit">
                            Buy Item
                        </button>
                    </Form.Item>
                </Form>
                </div>

            </div>

    )
}
export default NewExpenditure;
