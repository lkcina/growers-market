import { Link, NavLink } from "react-router";
import { useAuth } from "../../Context/UseAuth";
import "./Navbar.css";



const Navbar: React.FC = (): JSX.Element => {
    const { isLoggedIn, user, logoutUser } = useAuth();



    return (
        <nav>
            <Link to="/"><h1>Growers Market</h1></Link>
            
            <ul>
                <li><NavLink to="/" className={({ isActive }) => isActive ? "active" : "" }>Home</NavLink></li>
                <li><NavLink to="/market/browse" className={({ isActive }) => isActive ? "active" : ""}>Market</NavLink></li>
                <li><NavLink to="/plant-search" className={({ isActive }) => isActive ? "active" : ""}>Search Plants</NavLink></li>
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