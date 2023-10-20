import {Form, Input, InputNumber, Popconfirm, Select, Table, Typography} from 'antd';
import {useEffect, useState} from "react";
import { EditOutlined, EyeOutlined} from "@ant-design/icons";
import Drawers from "../../../Components/Drawer/Drawer.jsx";
import {setLocalStorage} from "../../Utils/LocalStorage/localStorage.jsx";


const roles=["Parent","Guardian","Children",'Relatives',"Guest"]



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
const Users = () => {


    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const [form] = Form.useForm();
    const [data, setData] = useState();
    const [editingKey, setEditingKey] = useState('');


    useEffect(() => {

        const fetchUsers = async () => {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();

            const originData=data.users.map((item)=>({
                key:item.id.toString(),
                name:`${item.firstName} ${item.lastName}`,
                Access:item.access,
                address:item.emailAddress,
                active:item.activeState===true?"Active":"Inactive",
                phone:item.phoneNumber,

            }));

            setData(originData)
        }

        fetchUsers()

    }, []);
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            name: '',
            Access: '',
            address: '',
            ...record,
        });
        setEditingKey(record.key);
    };

    const handleDelete = (key) => {
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
            newData.splice(index, 1);
            setData(newData);
        }
    };

    const Show = (items) => {
      console.log(items)
        showDrawer()
        setLocalStorage("user",items)
    }

    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key) => {
        try {
            const row = await form.validateFields();
            const newData = [...data];
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
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            title: 'name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
        },

        {
            title: 'Access',
            dataIndex: 'Access',
            width: '15%',
            editable: true,
            inputType:'select',
            filters:[
                {
                    text:'Parent',
                    value:"Parent"
                },
                {
                    text:'Guardian',
                    value:"Guardian"
                },
                {
                    text:'Children',
                    value:"Children"
                },
                {
                    text:'Relatives',
                    value:"Relatives"
                },
                {
                    text:'Guest',
                    value:"Guest"
                },

            ],
            onFilter: (value, record) => record.Access === value, // Fixed filtering condition
            sorter: (a, b) => a.Access - b.Access,
            sortDirections: ['descend'],
        },

        {
            title: 'Email',
            dataIndex: 'address',
            width: '27%',
            editable: true,
        },
        {
            title: "Active",
            dataIndex: 'active',
            width: '12%',
            editable: true,
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
                    <div >
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <EditOutlined/>
                        </Typography.Link>
                        {/*<Typography.Link className={'pl-5 text-red-800'} disabled={editingKey !== ''} onClick={() => handleDelete(record.key)}>*/}
                        {/*    <DeleteFilled className={'text-red-900'}/>*/}
                        {/*</Typography.Link>*/}
                        <Typography.Link className={'pl-5 text-red-800'} disabled={editingKey !== ''} onClick={() => Show(record)}>
                            <EyeOutlined/>
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
                inputType: col.dataIndex === 'Access' ? 'select' : 'text', // Use 'select' for Access, 'text' for others
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
        // console.log('params', pagination, filters, sorter, extra);
    };

    return (

        <>

            <Form form={form} component={false}>
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    // onChange={onChange}
                    bordered
                    dataSource={data}
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
                    title={() => 'All Users'}

                />
            </Form>

            <Drawers open={open} onClose={onClose}/>
        </>
    );
};
export default Users;