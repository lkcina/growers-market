import React from 'react';
import MarketSidebar from '../../Components/MarketSidebar/MarketSidebar';
import { Outlet } from 'react-router';
import './MarketPage.css';

interface Props {
}

const MarketPage: React.FC<Props> = () => {
    return (
        <div id="market">
            <h1>Market</h1>
            <div id="market-container">
                <MarketSidebar />
                <Outlet />
            </div>
        </div>
    );
};

export default MarketPage;