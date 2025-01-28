import React from "react";
import "./ListingDetails.css";
import { Listing } from "../../types";

interface Props {
    listing: Listing;

}

const ListingDetails: React.FC<Props> = ({ listing }: Props,): JSX.Element => {
    return (
        <div className="listing-details">
            <div className="species-details-properties">
                <p>Seller: {listing.appUserName}</p>
                <p>Quantity: {listing.quantity}</p>
            </div>
            <div className="listing-details-description">
                {listing.description}
            </div>
        </div>
    );
}

export default ListingDetails;