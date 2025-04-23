import React from 'react';
import { Outlet } from 'react-router-dom';


const UserListing: React.FC = (): JSX.Element => {
    return (
            <Outlet />
    );
}

export default UserListing;