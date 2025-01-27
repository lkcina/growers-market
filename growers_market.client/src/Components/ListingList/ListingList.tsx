import React, { FormEvent, MouseEvent } from 'react';
import { Listing } from '../../types';
import ListingCard from '../ListingCard/ListingCard';

interface Props {
    listings: Listing[];
    onSelect: (e: FormEvent<HTMLFormElement>) => void;
}

const ListingList: React.FC<Props> = ({ listings, onSelect }): JSX.Element => {


    return (
        <div id="user-listings">
            {listings.map((listing) => {
                return <ListingCard key={listing.id} listing={listing} onSelect={onSelect} />
            })}
        </div>
    );
}

export default ListingList;