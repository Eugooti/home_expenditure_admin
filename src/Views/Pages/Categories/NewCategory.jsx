import Header from "../../../Components/Header/Header.jsx";
import { useForm } from "antd/es/form/Form.js";
import { Form, Input, message } from "antd";
import TextArea from "antd/es/input/TextArea.js";
import { useContext } from "react";
import { UserContext } from "../../../Context/User Context/UserContext.jsx";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY } from "../../../API/GraphQL/Mutations/Mutations.js";

const NewCategory = () => {
    const User = useContext(UserContext);
    const [messageApi, contextHolder] = message.useMessage();

    const rules = {
        Category: [{ required: true, message: "Required field" }],
        maximum: [{ required: true, message: "Required field" }],
        Description: [{ required: true, message: "Required field" }],
    };

    const [form] = useForm();

    const [createCategory] = useMutation(CREATE_CATEGORY);

    const onFormFinish = async (values) => {
        const { name, description, maximumCash } = values;
        const createdBy = User?.emailAddress;

        try {
            const response = await createCategory({
                variables: {
                    name,
                    description,
                    maximumCash: parseInt(maximumCash), // Ensure it's an integer
                    createdBy,
                },
            });


            if (response.data.createCategory==="Category created successfully") {
                messageApi.open({
                    type: "success",
                    content: response.data?.createCategory,
                }).then(() => onFormClearClick());
            }

            else if (response.data.createCategory!=="Category created successfully"){
                messageApi.open({
                    type: "error",
                    content: response.data?.createCategory,
                });
            }



        } catch (error) {
            console.error(error);
            messageApi.open({
                type: "error",
                content: "Unable to add category",
            });
        }
    };

    const onFormFinishFailed = (errorInfo) => {
        console.log(errorInfo);
        // Handle form finish fail
    };

    const onFormClearClick = () => {
        form.resetFields();
    };

    return (
        <>
            <div className={"flex justify-center"}>
                {contextHolder}
                <div className={"w-1/2"}>
                    <Header Title={"New Category"} Subtitle={"What's new"} />
                    <Form
                        form={form}
                        name="basic"
                        layout="vertical"
                        initialValues={{ remember: true }}
                        onFinish={onFormFinish}
                        onFinishFailed={onFormFinishFailed}
                    >
                        <Form.Item rules={rules.Category} label="Category Name" name="name">
                            <Input size={"large"} />
                        </Form.Item>
                        <Form.Item rules={rules.maximum} label="Manage Cost" name="maximumCash">
                            <Input  size={"large"} />
                        </Form.Item>
                        <Form.Item rules={rules.Description} label="Description" name="description">
                            <TextArea rows={4} />
                        </Form.Item>
                        <Form.Item className={"flex justify-center"}>
                            <button className={"bg-gray-800 text-white text-lg hover:bg-gray-900 h-10 w-56 rounded-2xl "} type="submit">
                                Add Category
                            </button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default NewCategory;
