import './App.css'
import Main from "./Views/Index2.jsx"
import {getFromLocalStorage} from "./Utils/LocalStorage/localStorage.jsx";
import Login from "./Views/Pages/Authentication/Login.jsx"

function App() {


    const User=getFromLocalStorage("User")

    return (
        <>
            {User? <Main/>:<Login/>}
        </>
  )
}

export default App
