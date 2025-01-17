

interface Props {
}

const Navbar: React.FC<Props> = ({ }: Props): JSX.Element => {
    return (
        <nav>
            <h1>Growers Market</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/wishlist">Wishlist</a></li>
                <li><a href="/market">Market</a></li>
                <li><a href="/plants">Search For Plants</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;