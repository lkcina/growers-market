import React, { Dispatch, FormEvent, MouseEvent, SetStateAction, useEffect, useRef, useState } from 'react';
import { Chat, Listing } from '../../types';
import ListingCard from '../ListingCard/ListingCard';
import './ListingList.css';
import { v4 as uuidv4 } from 'uuid';
import ListingDetails from '../ListingDetails/ListingDetails';

interface Props {
    listings: Listing[];
    onSelect: (e: FormEvent<HTMLFormElement>) => void;
    listingDetails: number | null;
    userChats: Chat[] | null;
    setUserChats: Dispatch<SetStateAction<Chat[]>> | null;
}

const ListingList: React.FC<Props> = ({ listings, onSelect, listingDetails, userChats, setUserChats }): JSX.Element => {
    const listRef = useRef<HTMLDivElement>(null);
    const [listColumns, setListColumns] = useState<number>(0);
    const [listingColumn, setListingColumn] = useState<number>(0);
    const [searchResultDetails, setSearchResultDetails] = useState<Listing[]>([]);

    useEffect(() => {
        console.log("listing list rendered");
        console.log(userChats);
    });

    useEffect(() => {
        console.log("useEffect triggered");
        const handleListingList = () => {
            if (listRef.current) {
                if (listingDetails !== null) {
                    const columns = Math.min(Math.floor((listRef.current.offsetWidth + 15) / 235), listings.length);
                    console.log(columns);
                    setListColumns(columns);
                    const detailsListing: Listing = { ...listings.filter((s) => s.id === listingDetails)[0] }
                    console.log(detailsListing);
                    const rowOfListing = Math.floor(listings.indexOf(listings.find((l) => l.id === listingDetails)) / columns) + 1;
                    const columnOfListing = (listings.indexOf(listings.find((l) => l.id === listingDetails)) % columns) + 1;
                    setListingColumn(columnOfListing);
                    detailsListing.id = 0;
                    console.log(columns, columnOfListing, rowOfListing);
                    const detailsIndex = (rowOfListing * columns);
                    console.log(detailsIndex);
                    const newSearchResultDetails: Listing[] = [...listings];
                    newSearchResultDetails.splice(detailsIndex, 0, detailsListing);
                    console.log(newSearchResultDetails);
                    setSearchResultDetails(newSearchResultDetails);
                }
            }
        }

        handleListingList()

        if (listingDetails !== null) {
            window.addEventListener('resize', handleListingList)
        } else {
            window.removeEventListener('resize', handleListingList);
        }

        return () => {
            window.removeEventListener('resize', handleListingList);
        }

    }, [listingDetails, listings]);

    return (
        <div className="listing-list" ref={listRef} style={{ maxWidth: `${listings.length < 5 ? `${(235 * listings.length) - 15}px` : "1160px"}` }} >
            {listings.length > 0 ? (
                listingDetails === null ? (
                    listings.map((listing) => {
                        return (
                            <ListingCard key={listing.id} listing={listing} onSelect={onSelect} listingDetails={listingDetails} isAfterDetails={false} />
                        )
                    })
                ) : (
                    searchResultDetails.map((listing, index) => {
                        const detailsIndex = searchResultDetails.indexOf(searchResultDetails.find((l) => l.id === 0));
                        const chat = userChats?.find((chat) => chat.listing.id === listingDetails) || null;
                        return (
                            listing.id !== 0 ? index !== detailsIndex + 1 ? <ListingCard key={uuidv4()} listing={listing} onSelect={onSelect} listingDetails={listingDetails} isAfterDetails={false} />
                                : <ListingCard key={uuidv4()} listing={listing} onSelect={onSelect} listingDetails={listingDetails} isAfterDetails={true} />
                                : <ListingDetails key={uuidv4()} listing={listing} chat={chat} setUserChats={setUserChats} columns={listColumns} listingColumn={listingColumn} listingId={listingDetails} />
                        )
                    })
                )
            ) : (
                <h2>No results found</h2>
            )}
        </div>
    );
}

export default React.memo(ListingList);