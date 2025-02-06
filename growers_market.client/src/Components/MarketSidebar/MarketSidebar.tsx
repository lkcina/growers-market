import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./MarketSidebar.css";

interface Props {

}

const MarketSidebar: React.FC<Props> = ({ }: Props): JSX.Element => {
    return (
        <div id="market-sidebar">
            
            <NavLink to="/market/browse" className={({ isActive }) => isActive ? "active" : ""}>Browse</NavLink>
            
            <NavLink to="/market/chats" className={({ isActive }) => isActive ? "active" : ""}>My Chats</NavLink>
            
            <NavLink to="/market/my-listings/all" className={({ isActive }) => isActive ? "active" : ""}>My Listings</NavLink>
            
            <NavLink to="/market/my-wishlist" className={({ isActive }) => isActive ? "active" : ""}>My Wishlist</NavLink>
            
        </div>
    )
}

export default MarketSidebar;