import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Listing } from '../../types';

interface Props {
}

const UserListing: React.FC<Props> = (): JSX.Element => {
    const { listingId } = useParams();
    return (
        <div>
            <h1>UserListing Page</h1>
            <Outlet />
        </div>
    );
}

export default UserListing;