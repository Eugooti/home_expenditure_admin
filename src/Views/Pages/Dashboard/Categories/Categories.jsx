import {Card, List, Spin} from "antd";
import {useQuery} from "@apollo/client";
import {GET_CATEGORIES_BY_USER} from "../../../../API/GraphQL/Queries/Queries.js";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../../../Context/User Context/UserContext.jsx";
import Text from "antd/es/typography/Text.js";
import {LoadingOutlined} from "@ant-design/icons";


const Categories = () => {

    const User = useContext(UserContext);

    const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES_BY_USER, {
        variables: { emailAddress: User?.emailAddress },
    });


    if (categoriesLoading){
        console.log("Loading")
    }
    if (categoriesError){
        console.log(categoriesError)
    }


    const [data, setData] = useState(null);


    useEffect(() => {
        if (categoriesData && categoriesData.getCategoriesByUser){
            const mappedData=categoriesData.getCategoriesByUser.map((item)=>({
                key:item.id.toString(),
                name:item.name,
                maximumExpense:item.maximumCash,
                description:item.description
            }));

            setData(mappedData)
        }

        }, [categoriesData]);


    const containerStyle = {
        height: '260px', // Set a fixed height
        overflowY: 'auto', // Add vertical scrollbar when content overflows
        overflowX: 'hidden', // Hide horizontal scrollbar
    };



    return (
        <>
            <Card title={<Text strong>Categories</Text>}>
                <div style={containerStyle}>
                    {data?
                    <List
                        grid={{gutter: 10, column: 2}}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <Card title={<div><Text strong>{item.name}</Text></div>}>
                                    <p className="mt-5 line-clamp-2  text-sm leading-6 text-gray-600" style={{textAlign:"justify"}}>{item.description}</p>
                                </Card>
                            </List.Item>
                        )}
                    />:<div className={'h-full w-full flex items-center justify-center'}>
                            {/*<Spin size="large"/>*/}
                            <Spin indicator={<LoadingOutlined style={{fontSize: 24}} spin size='large'/>}/>

                        </div>}
                </div>
            </Card>
        </>
    )
}
export default Categories