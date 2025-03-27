import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Listing } from '../../types';
import { getUserListings } from '../../api';

interface Props {
}

const UserListing: React.FC<Props> = (): JSX.Element => {
    return (
            <Outlet />
    );
}

export default UserListing;