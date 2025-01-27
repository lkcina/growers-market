import React, { useEffect, useState } from 'react';  
import ListingForm from '../ListingForm/ListingForm';  
import { Listing, SpeciesInfo } from '../../types';  
import { createListing, getUsedSpecies, getUserListings, updateListing } from '../../api';  
import { toast } from 'react-toastify';
import { Link, Outlet } from 'react-router-dom';
  
interface Props {
}  
  
const UserListingsPage: React.FC<Props> = () => {  
    

    const updateUserListings = (newUserListings: Listing[]) => {
        setUserListings(newUserListings);
    }
  
    return (  
        <div>  
            <h1>UserListings Page</h1>
            <Outlet />
        </div>  
    );  
};  
  
export default UserListingsPage;