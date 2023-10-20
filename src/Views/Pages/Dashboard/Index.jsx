import UserCalendar from "./Calendar/Calendar.jsx";
import Categories from "./Categories/Categories.jsx";
import Liquid from "../Categories/Liquid.jsx";
import PieChart from "./PieChart/PieChart.jsx";
import {Badge, Card, Collapse, Divider, List} from "antd";
import {CaretRightOutlined} from "@ant-design/icons";
import Text from "antd/es/typography/Text.js";
import Button from "antd/es/button/index.js";
import DemoArea from "../User/Profile.jsx";
import ToDo from "./ToDo/ToDo.jsx";

const Index = () => {



    return (
        <div className={'grid grid-cols-1 gap-5'}>
            <div  className={' h-auto grid md:grid-cols-3    gap-5 sm:grid-cols-1'}>

                <Liquid/>
                <UserCalendar/>
                <ToDo/>
                <PieChart/>
                <Categories/>

                <DemoArea/>

                {/*<UserCalendar/>*/}

            </div>


        </div>
    )
}

export default Index;