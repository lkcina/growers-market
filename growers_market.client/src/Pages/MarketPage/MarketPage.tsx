import React from 'react';
import MarketSidebar from '../../Components/MarketSidebar/MarketSidebar';
import { Outlet } from 'react-router';

interface Props {
}

const MarketPage: React.FC<Props> = () => {
    return (
        <div id="market">
            <h1>Market Page</h1>
            <MarketSidebar />
            <Outlet />
        </div>
    );
};

export default MarketPage;