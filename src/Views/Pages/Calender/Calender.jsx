import {Calendar,dateFnsLocalizer} from "react-big-calendar";
import {parse,format,getDay,startOfWeek} from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css"
import './Calendar.css'
import date_fns from "date-fns/locale/en-US";
import {useEffect, useState} from "react";
import {setLocalStorage} from "../../Utils/LocalStorage/localStorage.jsx";
import {Card, Button,Modal, Space} from "antd";
import Example from "./Modal.jsx";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import Title from "antd/es/typography/Title.js";
import Text from "antd/es/typography/Text.js";


const locales={
    "en-US": date_fns
}
const localizer=dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const CalenderScheduler = () => {


    const [open, setOpen] = useState(false);

    const handleClose = () => {
      setOpen(false)
    }

    const Open = () => {
      setOpen(true)
    }

    const [events, setEvents] = useState([]);


    useEffect(() => {
        const fetchEvents = async () => {
          try {
              const response=await fetch('http://localhost:5000/api/events');
              const data=await response.json();
              console.log(response.json())
              setEvents(data)
          }catch (e) {
              console.log("Failed to fetch events",e)
          }
        }
        fetchEvents();
    }, []);
    // Function to handle event click

    // console.log(events)

    const [modal, contextHolder] = Modal.useModal();
    const confirm = (item) => {
        modal.confirm({
            title: <><div className={'grid grid-cols-2'}>

                <Title level={4}>{item.title}</Title>
                <Text  type="warning">{`${item.start} - ${item.end}`}</Text>

            </div> </>,
            icon: <ExclamationCircleOutlined />,
            content: <>
                <div className={'grid grid-cols-1'}>
                    {/*<h1 className={''}>{item.description}</h1>*/}
                    <Text italic>{item.description}</Text>
                </div>
            </>,
            okText: 'Ok',
            cancelButtonProps: { style: { display: 'none' } }, // Hide cancel button
            okButtonProps:{style:{background:'red'}},
        });
    };

    const handleEventClick = (event) => {
        setLocalStorage('Event', event);
        confirm(event)
    };


            return(
                <Card title={"Calendar"} className="calendar-container"> {/* Use a CSS class for container */}
                    <div className="flex justify-end mb-10">
                        <Button
                            type={"link"}
                            variant="contained"
                            className={''}
                            onClick={Open}
                        >
                            Add Event
                        </Button>
                    </div>
                    <div className="calendar">
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 600, width: "90%" }}
                            onSelectEvent={handleEventClick}
                        />
                        {contextHolder}
                    </div>
                    <Example open={open} handleClose={handleClose} setOpen={setOpen}/>
                </Card>
            )

}
export default CalenderScheduler;
