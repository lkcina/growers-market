import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { Listing } from '../../types';
import { getUserListings } from '../../api';

interface Props {
}

const UserListing: React.FC<Props> = (): JSX.Element => {
    const { listingId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getUserListings().then((result) => {
            if (typeof result === "string") {
                navigate("/my-listings/all");
            } else if (Array.isArray(result.data)) {
                if (!result.data.find((listing) => listing.id === Number(listingId))) {
                    console.log("Listing not found");
                    navigate("/my-listings/all");
                }
            }
        })
    }, [listingId, navigate]);

    return (
            <Outlet />
    );
}

export default UserListing;