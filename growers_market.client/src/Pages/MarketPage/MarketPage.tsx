import React from 'react';
import { Outlet } from 'react-router';
import './MarketPage.css';


const MarketPage: React.FC = () => {
    return (
        <div id="market">
            <h1>Market</h1>
            <Outlet />
        </div>
    );
};

export default MarketPage;