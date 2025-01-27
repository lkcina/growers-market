import React from "react";
import { Link } from "react-router-dom";

interface Props {

}

const MarketSidebar: React.FC<Props> = ({ }: Props): JSX.Element => {
    return (
        <div id="market-sidebar">
            <div>
                <Link to="/market/browse">Search</Link>
            </div>
            <div>
                <Link to="/market/chats">Chats</Link>
            </div>
            <div>
                <Link to="/market/my-listings/all">My Listings</Link>
            </div>
            <div>
                <Link to="/market/my-wishlist">My Wishlist</Link>
            </div>
        </div>
    )
}

export default MarketSidebar;