import React, { FormEvent, useEffect, useState } from 'react';
import { Listing } from '../../types';
import { toast } from 'react-toastify';
import { getUserListings } from '../../api';
import ListingList from '../../Components/ListingList/ListingList';
import { useNavigate } from 'react-router-dom';
import './AllUserLisitngs.css';


const AllUserListings: React.FC = (): JSX.Element => {
    const [userListings, setUserListings] = useState<Listing[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        getUserListings().then((result) => {
            if (typeof result === "string") {
                toast.error(result);
            } else {
                setUserListings(result.data);
            }
        })
    }, [])

    const onListingSelect = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.elements.namedItem("listingId") as HTMLInputElement;
        const listingId = Number(input.value);
        navigate(`/my-listings/listing/${listingId}`);
    }


    return (
        <div id="all-user-listings-page">
            <h1>My Listings</h1>
            <button className="new-listing-btn" onClick={() => navigate("/my-listings/new")}>+ New Listing</button>
            <ListingList listings={userListings} onSelect={onListingSelect} listingDetails={null} userChats={null} setUserChats={null} />
        </div>
    );
}

export default AllUserListings;