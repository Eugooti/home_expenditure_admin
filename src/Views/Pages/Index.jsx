import {Routes,Route } from 'react-router-dom'
import Example from "../Index.jsx";
import Expenditures from "./Expenditure/Expenditures.jsx";
import Categories from "./Categories/Categories.jsx";
import NewExpenditure from "./Expenditure/NewExpenditure.jsx";
import NewCategory from "./Categories/NewCategory.jsx";
import Team from "./Users/Team.jsx";
import Users from "./Users/Users.jsx";
import CalenderScheduler from "./Calender/Calender.jsx"
import EventModal from "./Calender/EventModal.jsx"
import Index from "./Dashboard/Index.jsx";

const Pages = () => {
    return (
        <>
                <Routes>
                    <Route exact path={"/"} element={<Index/>}/>
                    <Route exact path={"/expenditures"} element={<Expenditures/>}/>
                    <Route exact path={"/categories"} element={<Categories/>}/>
                    <Route exact path={'/newexpenditure'} element={<NewExpenditure/>}/>
                    <Route exact path={"/photos"} element={<Categories/>}/>
                    <Route exact path={"/newCategory"} element={<NewCategory/>}/>
                    <Route exact path={"/login"} element={<CalenderScheduler/>}/>
                    <Route exact path={"/team"} element={<Team/>}/>
                    <Route exact path={"/users"} element={<Users/>}/>
                </Routes>
        </>
    )
}
export default Pages;
