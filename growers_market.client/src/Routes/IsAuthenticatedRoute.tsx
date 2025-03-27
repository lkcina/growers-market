import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Context/UseAuth';

interface Props {
    children: React.ReactNode
}

const IsAuthenticatedRoute: React.FC<Props> = ({ children }: Props): JSX.Element => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    return isLoggedIn() ? (
        <div>
            {children}
        </div>
    ) : (
            <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default IsAuthenticatedRoute;