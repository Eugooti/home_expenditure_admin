// Login.js
import { useAuth } from './AuthContext';
import { useHistory, useLocation } from 'react-router-dom';

function Login() {
    const { login } = useAuth();
    const history = useHistory();
    const location = useLocation();

    const handleLogin = () => {
        // Perform authentication logic and then call login function.
        login();

        // Redirect to the previous page or a specific URL.
        const { from } = location.state || { from: { pathname: '/' } };
        history.replace(from);
    };

    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
