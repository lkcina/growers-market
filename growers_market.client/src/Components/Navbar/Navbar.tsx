import { Link, NavLink } from "react-router";
import { useAuth } from "../../Context/UseAuth";
import "./Navbar.css";
import { useEffect, useState } from "react";



const Navbar: React.FC = (): JSX.Element => {
    const { isLoggedIn, user, logoutUser } = useAuth();
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            console.log(window.innerWidth);
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);



    return (
        <nav>
            <div>
                <Link to="/">
                    <img src="/src/assets/Images/Growers_Market_Logo_No_Background_1.png" />
                    <h1>Growers Market</h1>
                </Link>
                {isLoggedIn() ? (
                    windowWidth > 784 ? (
                        <div id="login-container">
                            <div className="welcome-user"><span>Welcome, </span> {user?.userName}</div>
                            <a className="logout-btn" onClick={logoutUser}>Logout</a>
                        </div>
                    ) : (
                        <div id="login-summary">
                            <button>{user?.userName}</button>
                            <div id="login-summary-dropdown">
                                <Link to="/login" className="login-dropdown-option" onClick={logoutUser}>Logout</Link>
                            </div>
                        </div>
                    )
                ) : (
                    windowWidth > 784 ? (
                        <div id="login-container">
                            <Link className="login-btn" to="/login">Login</Link>
                            <Link className="logout-btn" to="/register">Sign Up</Link>
                        </div>
                    ) : (
                        <div id="login-summary">
                            <button>Account</button>
                            <div id="login-summary-dropdown">
                                <Link to="/login" className="login-dropdown-option">Login</Link>
                                <Link to="/register" className="login-dropdown-option">Sign Up</Link>
                            </div>
                        </div>
                    )
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