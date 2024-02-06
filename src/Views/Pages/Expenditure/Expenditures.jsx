// eslint-disable-next-line no-unused-vars
import React, {useContext, useEffect, useState} from 'react';
import {Form, Input, InputNumber, message, Popconfirm, Select, Table, Typography} from 'antd';
import {DeleteFilled, EditOutlined} from '@ant-design/icons';
import axios from 'axios';
import {UserContext} from "../../../Context/User Context/UserContext.jsx";
import {GET_CATEGORIES_BY_USER, GET_EXPENDITURES_BY_USER} from "../../../API/GraphQL/Queries/Queries.js";
import {useQuery} from "@apollo/client";


const Expenditures = () => {

    const User = useContext(UserContext);

    const { loading: expendituresLoading, error: expendituresError, data: expendituresData } = useQuery(GET_EXPENDITURES_BY_USER, {
        variables: { emailAddress: User?.emailAddress },
    });

    const [Data, setData] = useState(null);

    useEffect(() => {
        if (expendituresData && expendituresData.getExpenditureByUser) {
            const mappedData = expendituresData.getExpenditureByUser.map((item) => ({
                key: item.id.toString(),
                name: item.name,
                Category: item.category,
                cost: item.cost,
                description: item.description,
                id: item.id,
            }));

            setData(mappedData);
        }
    }, [expendituresData]);

    if (expendituresLoading) {
        console.log("Loading");
    }

    if (expendituresError) {
        // Handle error
    }


    const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES_BY_USER, {
        variables: { emailAddress: User?.emailAddress },
    });

    if (categoriesLoading){
        console.log("Loading")
    }

    if (categoriesError){
        console.log(categoriesError)
    }

    let Categories=null;

    if (categoriesData && categoriesData.getCategoriesByUser){

        Categories=categoriesData.getCategoriesByUser;
    }



    let filter=[];

    Categories?.map((item)=>{
        filter.push({
            text: item.name,
            value: item.name,
        })
    })

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
                    {Categories?.map((role, index) => (
                        <Select.Option key={index} value={role.name}>
                            {role.name}
                        </Select.Option>
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


    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState('');


    const isEditing = (record) => record.key === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            Category: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };


    const [messageApi, contextHolder] = message.useMessage();

    const handleDelete = async (key) => {
        const confirmed = window.confirm("Are you sure you want to delete this expenditure?");

        if (!confirmed) {
            return; // User canceled the deletion
        }

        try {


            const response = await axios.delete(`http://localhost:5000/api/expenditure/${key.key}`);

            if (response.status === 200) {
                console.log('Deletion successful');

                messageApi.success("Expenditure deleted successfully").then(()=>{

                    // Optimistically update the UI

                    const newData = Data.filter((item) => key.key !== item.key);
                    setData(newData);
                })

                // You can perform additional actions after successful deletion here
            } else {

                messageApi.error("Error deleting expenditure")

            }
        } catch (error) {
            console.log('Error:', error);

        }
    };


    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key) => {
        try {
            const row = await form.validateFields();

            const {name,Category,cost}=row;


            const response=await axios.put(`http://localhost:5000/api/expenditure/${key}`,{
                name,
                category:Category,
                cost
            })

            if (response.status!==200){
                messageApi.error("Unable to update expenditure")
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
                } else {
                    newData.push(row);
                    setData(newData);
                    setEditingKey('');
                }
            })


        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };



    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Category',
            dataIndex: 'Category',
            width: '20%',
            editable: true,
            inputType: 'select',
            filters: filter,
            onFilter: (value, record) => record.Category === value,
            sorter: (a, b) => a.Category - b.Category,
            sortDirections: ['descend'],
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            width: '25%',
            editable: true,
        },
        {
            title: 'Action',
            dataIndex: 'operation',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
                ) : (
                    <div className={'grid grid-cols-2 pl-3'}>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>

                            <EditOutlined className={'cursor-grab'} />
                        </Typography.Link>
                        <Typography.Link
                            // className={'ml-10'}
                            disabled={editingKey !== ''}
                            onClick={() => handleDelete(record)}
                        >
                            <DeleteFilled className={'text-red-800'} />
                        </Typography.Link>
                    </div>
                );
            },
        }
    ];

    const columns2=[
        {
            title: 'Name',
            dataIndex: 'name',
            width: '35%',
            editable: true,
        },
        Table.EXPAND_COLUMN,
        {
            title: 'Category',
            dataIndex: 'Category',
            width: '30%',
            editable: true,
            inputType: 'select',
            filters: filter,
            onFilter: (value, record) => record.Category === value,
            sorter: (a, b) => a.Category - b.Category,
            sortDirections: ['descend'],
        },
        {
            title: 'Cost',
            dataIndex: 'cost',
            // width: '25%',
            editable: true,
        }
    ]

    const mergedColumns = User&&User.access==="Parent"? columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'Category' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    }):columns2.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: col.dataIndex === 'Category' ? 'select' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    })

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
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
                        title={() => 'All Expenditures'}
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

export default Expenditures;
