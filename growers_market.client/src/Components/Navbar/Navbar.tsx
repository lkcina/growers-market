import { Link, NavLink } from "react-router";
import { useAuth } from "../../Context/UseAuth";
import "./Navbar.css";



const Navbar: React.FC = (): JSX.Element => {
    const { isLoggedIn, user, logoutUser } = useAuth();



    return (
        <nav>
            <div>
                <Link to="/">
                    <img src="/src/assets/Images/Growers_Market_Logo_No_Background_1.png" />
                    <h1>Growers Market</h1>
                </Link>
                {isLoggedIn() ? (
                    <div id="login-container">
                        <div className="welcome-user"><span>Welcome, </span> {user?.userName}</div>
                        <a className="logout-btn" onClick={logoutUser}>Logout</a>
                    </div>
                ) : (
                    <div id="login-container">
                        <Link className="login-btn" to="/login">Login</Link>
                        <Link className="logout-btn" to="/register">Sign Up</Link>
                    </div>
                )}
            </div>
            <ul>
                <li><NavLink to="/market/browse" className={({ isActive }) => isActive ? "active" : ""}>Market</NavLink></li>
                <li><NavLink to="/my-listings/all" className={({ isActive }) => isActive ? "active" : ""}>My Listings</NavLink></li>
                <li><NavLink to="/my-wishlist" className={({ isActive }) => isActive ? "active" : ""}>My Wishlist</NavLink></li>
                <li><NavLink to="/plant-search" className={({ isActive }) => isActive ? "active" : ""}>Search Plants</NavLink></li>

            </ul>
            
        </nav>
    );
}

export default Navbar;