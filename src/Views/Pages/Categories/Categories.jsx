import {Form, Input, InputNumber, message, Popconfirm, Select, Table, Typography} from 'antd';
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useQuery} from "@apollo/client";
import {GET_CATEGORIES_BY_USER} from "../../../API/GraphQL/Queries/Queries.js";
import {UserContext} from "../../../Context/User Context/UserContext.jsx";
import {DeleteFilled, EditOutlined} from "@ant-design/icons";
// import {useMutation} from "@apollo/client";
// import {UPDATE_CATEGORY} from "../../../API/Mutations/Mutations.js";


const roles=[1000,2000,3000,4000,5000,6000]

const EditableCell = ({
                          // eslint-disable-next-line react/prop-types
                          editing,
                          // eslint-disable-next-line react/prop-types
                          dataIndex,
                          // eslint-disable-next-line react/prop-types
                          title,
                          // eslint-disable-next-line react/prop-types
                          inputType,
                          // eslint-disable-next-line no-unused-vars,react/prop-types
                          record,
                          // eslint-disable-next-line no-unused-vars,react/prop-types
                          index,
                          // eslint-disable-next-line react/prop-types
                          children,
                          ...restProps
                      }) => {
    const inputNode =
        inputType === 'number' ? (
            <InputNumber />
        ) : inputType === 'select' ? (
            <Select>
                {roles.map((role,index)=>(
                    <Select.Option key={index} value={role} >{role}</Select.Option>
                ))}
            </Select>
        ) : (
            <Input />
        );

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const Categories = () => {
    const User = useContext(UserContext);

    const {loading,error,data}=useQuery(GET_CATEGORIES_BY_USER,{
        variables:{emailAddress:User?.emailAddress}
    })

    if (loading){
        console.log("Loading")
    }
    if (error){
        console.log(error)
    }

    const [Data, setData] = useState();


    useEffect(() => {
        if (data && data.getCategoriesByUser){
            const mappedData=data.getCategoriesByUser.map((item)=>({
                key:item.id.toString(),
                name:item.name,
                maximumExpense:item.maximumCash,
                description:item.description
            }))

            setData(mappedData)
        }
    }, [data]);


    console.log(Data)

    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');


    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            maximumExpense: 1000, // Default value for age as a number (e.g., 1 for 'Parent')
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };
    const [messageApi, contextHolder] = message.useMessage();
    const handleDelete =async (key) => {

        const confirmed = window.confirm("Are you sure you want to delete this expenditure?");

        if (!confirmed) {
            return; // User canceled the deletion
        }

        try {
            const response = await axios.delete(`http://localhost:5000/api/category/${key.key}`);

            if (response.status !== 200) {

                messageApi.error("Failed to delete category")

            }

            messageApi.success("Category deleted successfully").then(()=>{
                const newData = [...Data];
                const index = newData.findIndex((item) => key.key === item.key);
                if (index > -1) {
                    newData.splice(index, 1);
                    setData(newData);
                }
            })
        } catch (error) {
            console.log('Error:', error);
            messageApi.error(error.message)
            // Handle the error appropriately
        }
    };

    const cancel = () => {
        setEditingKey('');
    };

    // const [UpdateCategory]=useMutation(UPDATE_CATEGORY)

    const save = async (key) => {

        try {
            const row = await form.validateFields();

            const {name,maximumExpense}=row


            const response=await axios.put(`http://localhost:5000/api/category/${key}`,{
                name,
                maximumCash:maximumExpense
            })

            if (response.status!==200){
                messageApi.error("Unable to update category")
            }

            const newData = [...Data];

            console.log(response)

            messageApi.success(response.data.message).then(()=>{
                const index = newData.findIndex((item) => key === item.key);
                if (index > -1) {
                    const item = newData[index];
                    newData.splice(index, 1, {
                        ...item,
                        ...row,
                    });
                    setData(newData);
                    setEditingKey('');
                }
                else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                }
            })

        }catch (error) {
            console.log(error)
            messageApi.error(error.message)

        }

        // try {
        //     const row = await form.validateFields();
        //
        //     const {name,maximumExpense}=row

        //     const updateCategory=await UpdateCategory({
        //         variables:{
        //             id:parseInt(key),
        //             name:name,
        //             maximumCash:maximumExpense
        //         }
        //     })
        //
        //     console.log(name,maximumExpense)
        //     console.log("key",key)
        //
        //
        //     const newData = [...Data];
        //     if (updateCategory && updateCategory.updateCategory){
        //         messageApi.success("Category updated successfully").then(()=>{
        //             const index = newData.findIndex((item) => key === item.key);
        //             if (index > -1) {
        //                 const item = newData[index];
        //                 newData.splice(index, 1, {
        //                     ...item,
        //                     ...row,
        //                 });
        //                 setData(newData);
        //                 setEditingKey('');
        //             }
        //             else {
        //                 newData.push(row);
        //                 setData(newData);
        //                 setEditingKey('');
        //             }
        //         })
        //     }
        //
        //     messageApi.error("Unable to update category")
        //
        // } catch (errInfo) {
        //     messageApi.error("Unable to update category").then(()=>{
        //         console.log(errInfo)
        //     })
        // }
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '35%',
            editable: true,
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Maximum Expense',
            dataIndex: 'maximumExpense',
            width: '30%',
            editable: true,
            inputType: 'select', // Specify inputType as 'select' for the age column
            filters: [
                {
                    text: 1000,
                    value: 1000,
                },
                {
                    text: 2000,
                    value: 2000,
                },
                {
                    text: 3000,
                    value: 3000,
                },
                {
                    text: 4000,
                    value: 4000,
                },
                {
                    text: 5000,
                    value: 5000,
                },
            ],
            onFilter: (value, record) => record.maximumExpense <= value, // Fixed filtering condition
            sorter: (a, b) => a.maximumExpense - b.maximumExpense, // Numeric sorting
            sortDirections: ['descend'],
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record.key)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <div className={'grid grid-cols-2 pl-3'}>
                        <Typography.Link  disabled={editingKey !== ''} onClick={() => edit(record)}>

                            <EditOutlined className={'cursor-grab'} />
                        </Typography.Link>
                        <Typography.Link
                            className={'pl-3 text-red-800'}
                            disabled={editingKey !== ''}
                            onClick={() => handleDelete(record)}
                        >
                            <DeleteFilled className={'text-red-800'} />
                        </Typography.Link>
                    </div>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'maximumExpenses' ? 'select' : 'text', // Use 'select' for age, 'text' for others
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };

    const [selectionType] = useState('radio');

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <>
            {contextHolder}
             <Form form={form} component={false}>

            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                onChange={onChange}
                bordered
                dataSource={Data}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={{
                    onChange: cancel,
                }}
                scroll={{
                    y: 440,
                }}
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                title={() => 'All Categories'}
                expandable={{
                    expandedRowRender: (record) => (
                        <p
                            style={{
                                margin: 0,
                            }}
                        >
                            {record.description}
                        </p>
                    ),
                }}
            />
        </Form>
        </>
    );
};

export default Categories;
