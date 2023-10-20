// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import {
    BarChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ShopOutlined,
    TeamOutlined,
    ShoppingCartOutlined,
    FolderAddOutlined,
    DashboardOutlined,
    FolderViewOutlined,
    UsergroupAddOutlined,
    CalendarOutlined,
} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {Button, FloatButton, Layout, Menu, Switch, theme} from 'antd';
import Pages from "./Pages/Index.jsx";
import {getFromLocalStorage, setLocalStorage} from "./Utils/LocalStorage/localStorage.jsx";
import Example from "../Components/Header/NavBar.jsx";

const { Header, Content, Sider, Footer } = Layout;



const menuItems = [
    {
        key: "1",
        icon: <DashboardOutlined />,
        label: "Dashboard",
        to: "/",
    },
    {
        key: "2",
        icon: <ShopOutlined/>,
        label: "Expenditures",
        to: "/expenditures",
    },
    {
        key: "3",
        icon: <ShoppingCartOutlined />,
        label: "New Expenditure",
        to: "/newexpenditure",
    },

    {
        key: "4",
        icon: <FolderViewOutlined />,
        label: "Categories",
        to: "/categories",
    },
    {
        key: "5",
        icon: <FolderAddOutlined />,
        label: "New Categories",
        to: "/newCategory",
    },

    {
        key: "6",
        icon: <TeamOutlined />,
        label: "Users",
        to: "/users",
    },
    {
        key: "7",
        icon: <UsergroupAddOutlined />,
        label: "Add User",
        to: "/team",
    },

    {
        key: "8",
        icon: <CalendarOutlined />,
        label: "Calender",
        to: "/login",
    },



];






const Main = () => {

    const navigate=useNavigate();

    const [Selected, setSelected] = useState("1");
    const handleMenuItemClick = (index) => {
        setLocalStorage("key",index)
    };

    useEffect(() => {
        setSelected(`${getFromLocalStorage("key")}`)
    }, [Selected]);

    const [collapsed, setCollapsed] = useState(true);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                theme="dark"
                mode="inline"
                style={{
                    position: 'fixed',
                    height: '100%',
                    left: 0,
                    overflow:"auto"
                }}
            >
                <div className="flex justify-end demo-logo-vertical">
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined  /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        className={'text-white pr-3'}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </div>

                <Menu theme="dark" mode="inline" >
                    {menuItems.map((item) => (
                        <Menu.Item
                            key={item.key}
                            icon={item.icon}
                            onClick={() => handleMenuItemClick(item.key)}
                        >
                            <Link to={item.to}>{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>


            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Example/>
                </Header>
                <Content
                    // className={'container'}
                    style={{
                        margin: '24px 16px 0',
                        padding: '24px',
                        background: colorBgContainer,
                    }}
                >
                    <Pages/>

                    <FloatButton.Group trigger="hover" type="primary">
                        <FloatButton onClick={()=>navigate('/team')} icon={<UsergroupAddOutlined/>}/>
                        <FloatButton onClick={()=>navigate('/newexpenditure')} icon={<ShoppingCartOutlined/>}/>
                        <FloatButton onClick={()=>navigate('/newCategory')} icon={<FolderAddOutlined/>} />
                    </FloatButton.Group>


                </Content>
                <Footer style={{ textAlign: 'center' }}> ©2023 Created by OEO</Footer>
            </Layout>
        </Layout>
    );
};

export default Main;
