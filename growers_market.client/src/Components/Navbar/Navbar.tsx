import { Link } from "react-router";
import { useAuth } from "../../Context/UseAuth";
import "./Navbar.css";



const Navbar: React.FC = (): JSX.Element => {
    const { isLoggedIn, user, logoutUser } = useAuth();



    return (
        <nav>
            <Link to="/"><h1>Growers Market</h1></Link>
            
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/market/browse">Market</Link></li>
                <li><Link to="/plant-search">Search Plants</Link></li>
            </ul>
            {isLoggedIn() ? (
                <div id="login-container">
                    <div className="welcome-user"><span>Welcome, </span>{user?.userName}</div>
                    <a className="logout-btn" onClick={logoutUser}>Logout</a>
                </div>
            ) : (
                <div id="login-container">
                    <Link className="login-btn" to="/login">Login</Link>
                    <Link className="logout-btn" to="/register">Signup</Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;