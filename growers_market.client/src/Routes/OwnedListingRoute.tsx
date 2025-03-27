import React, { useEffect, useLayoutEffect } from 'react';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../Context/UseAuth';
import { getUserListings } from '../api';

interface Props {
    children: React.ReactNode
}

const OwnedListingRoute: React.FC<Props> = ({ children }: Props): JSX.Element => {
    const { listingId } = useParams();
    const navigate = useNavigate();

    useLayoutEffect(() => {
        getUserListings().then((result) => {
            if (typeof result === "string") {
                navigate("/my-listings");
            } else if (Array.isArray(result.data)) {
                if (!result.data.find((listing) => listing.id === Number(listingId))) {
                    console.log("Listing not found");
                    navigate("/my-listings");
                }
            }
        })
    }, [listingId, navigate]);

    

    return (
        <div>
            {children}
        </div>
    )
}

export default OwnedListingRoute;