import {Badge, Card, Collapse} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import Text from "antd/es/typography/Text.js";
import Button from "antd/es/button/index.js";
import {useContext, useEffect, useState} from "react";
import NewToDo from "./NewToDo.jsx";
import {useQuery} from "@apollo/client";
import {GET_TODOS_BY_USER} from "../../../../API/Queries/Queries.js";
import {UserContext} from "../../../../Context/User Context/UserContext.jsx";

const ToDo = () => {

    const containerStyle = {
        height: '260px', // Set a fixed height
        overflowY: 'auto', // Add vertical scrollbar when content overflows
        overflowX: 'hidden', // Hide horizontal scrollbar
    };

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
      setOpen(true)
    }

    const handleClose = () => {
      setOpen(false)
    }

    const User = useContext(UserContext);


    const {loading:todoLoading,error:todoError,data:todoData}=useQuery(GET_TODOS_BY_USER,{
        variables:{emailAddress:User?.emailAddress}
    })

    if (todoLoading){
        console.log("Loading")
    }
    if (todoError){
        console.log(todoError)
    }


    const [Data, setData] = useState(null);


    useEffect(() => {
        if (todoData && todoData.getByUser){
            const mappedData=todoData.getByUser.map((item)=>({
                key:item.id.toString(),
                title:item.title,
                description:item.description,
                date:item.date
            }))

            setData(mappedData)
        }
    }, [todoData]);

    return(
        <>
            <Badge.Ribbon>
            <Card title={ <div className={'flex flex-row justify-between'}><Text strong>To do list</Text>
                <Button onClick={()=>handleOpen()} type="link">New ToDo</Button>
            </div>} size="small">
                <div style={containerStyle}>
                    <Collapse
                        bordered={false}
                        accordion
                        expandIcon={({isActive}) => (
                            <CaretRightOutlined rotate={isActive ? 90 : 0}/>
                        )}
                    >
                        {Data?.map((item)=>(
                            <Collapse.Panel header={item.title} key={item.key}>
                                <p>{item.description}</p>
                            </Collapse.Panel>
                        ))}

                    </Collapse>
                </div>

             </Card>
            </Badge.Ribbon>
            <NewToDo open={open} setOpen={setOpen} handleClose={handleClose}/>

        </>

    )

}
export default ToDo;