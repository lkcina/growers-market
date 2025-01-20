import { Link } from "react-router";


interface Props {
}

const Navbar: React.FC<Props> = ({ }: Props): JSX.Element => {
    return (
        <nav>
            <h1>Growers Market</h1>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/market">Market</Link></li>
                <li><Link to="/plant-search">Search Plants</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;