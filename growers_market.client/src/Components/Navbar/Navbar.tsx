import { Link } from "react-router";
import { useAuth } from "../../Context/UseAuth";


interface Props {
}

const Navbar: React.FC<Props> = ({ }: Props): JSX.Element => {
    const { isLoggedIn, user, logoutUser } = useAuth();



    return (
        <nav>
            <h1>Growers Market</h1>
            {isLoggedIn() ? (
                <div>
                    <div>Welcome, {user?.userName}</div>
                    <a onClick={logoutUser}>Logout</a>
                </div>
            ) : (
                <div>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Signup</Link>"
                </div>
            )}
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/market">Market</Link></li>
                <li><Link to="/plant-search">Search Plants</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;