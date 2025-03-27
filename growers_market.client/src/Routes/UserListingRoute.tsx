import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/UseAuth';
import { getUserListings } from '../api';

interface Props {
    children: React.ReactNode
}

const UserListingRoute: React.FC<Props> = ({ children }: Props): JSX.Element => {
    const location = useLocation();
    const isAutho

    

    return isLoggedIn() ? (
        <div>
            {children}
        </div>
    ) : (
            <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default UserListingRoute;