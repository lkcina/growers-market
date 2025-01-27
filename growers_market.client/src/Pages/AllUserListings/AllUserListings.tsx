import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Listing } from '../../types';
import { toast } from 'react-toastify';
import { getUserListings } from '../../api';
import ListingList from '../../Components/ListingList/ListingList';

interface Props {
}

const AllUserListings: React.FC<Props> = (): JSX.Element => {
    const [userListings, setUserListings] = useState<Listing[]>([]);

    useEffect(() => {
        getUserListings().then((result) => {
            if (typeof result === "string") {
                toast.error(result);
            } else {
                console.log(result.data);
                setUserListings(result.data);
            }
        })
    }, [])

    return (
        <div>
            <h1>AllUserListings Page</h1>
            <ListingList />
        </div>
    );
}

export default AllUserListings;