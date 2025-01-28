import React, { FormEvent, MouseEvent } from 'react';
import { Listing } from '../../types';
import ListingCard from '../ListingCard/ListingCard';

interface Props {
    listings: Listing[];
    onSelect: (e: FormEvent<HTMLFormElement>) => void;
    listingDetails: number | null;
}

const ListingList: React.FC<Props> = ({ listings, onSelect, listingDetails }): JSX.Element => {


    return (
        <div id="user-listings">
            {listings.length > 0 ? (
                listings.map((listing) => {
                    return <ListingCard key={listing.id} listing={listing} onSelect={onSelect} listingDetails={listingDetails} />
                })
            ) : (
                <h2>No results found</h2>
            )}
        </div>
    );
}

export default ListingList;