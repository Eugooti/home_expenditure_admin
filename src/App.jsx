import './App.css'
import Main from "./Views/Index2.jsx"
import {getFromLocalStorage} from "./Utils/LocalStorage/localStorage.jsx";
import Login from "./Views/Pages/Authentication/Login.jsx"
import {useEffect} from "react";
import axios from "axios";

function App() {




    //  useEffect( () => {
    //
    //      const fetchData = async() => {
    //          try {
    //
    //              const response=await axios.get(`http://localhost:8080/api/users/users`)
    //
    //              console.log(response)
    //
    //          }catch (e) {
    //              console.log(e)
    //          }
    //      }
    //
    //      fetchData();
    //
    //
    // }, []);
    const User=getFromLocalStorage("User")

    return (
        <>
            {User? <Main/>:<Login/>}
        </>
  )
}

export default App
