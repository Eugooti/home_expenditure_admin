import {getFromLocalStorage} from "../Utils/LocalStorage/localStorage.jsx";
import {Navigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({children}) => {

    const user = getFromLocalStorage("User");
    return user? children :<Navigate to={"/login"}/>;
}

export default ProtectedRoute;