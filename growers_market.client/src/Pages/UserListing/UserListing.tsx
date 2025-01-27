import React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Listing } from '../../types';

interface Props {
}

const UserListing: React.FC<Props> = (): JSX.Element => {
    return (
            <Outlet />
    );
}

export default UserListing;