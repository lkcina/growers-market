import React, { useEffect, useState, MouseEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { Chat, Listing } from "../../types";
import { getListing, getListingChats } from "../../api";
import ChatList from "../../Components/ChatList/ChatList";

interface Props {

}

const UserListingInfo: React.FC<Props> = (): JSX.Element => {
    const { listingId } = useParams();
    const [listing, setListing] = useState<Listing | null>(null);
    const [chats, setChats] = useState<Chat[]>([]);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [serverError, setServerError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        getListing(Number(listingId)).then((result) => {
            if (typeof result === "string") {
                setServerError(result);
                navigate("/market/my-listings/all");
            } else {
                setListing(result.data);
                getListingChats(Number(listingId)).then((chatResult) => {
                    if (typeof chatResult === "string") {
                        setServerError(chatResult);
                    } else if (Array.isArray(chatResult.data)) {
                        setChats(chatResult.data);
                    }
                })
            }
        })
    }, [])

    const onNextImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (listing) {
            if (imageIndex === listing.images.length - 1) {
            setImageIndex(0);
            } else {
            setImageIndex(imageIndex + 1);
            }
        }
    }

    const onPreviousImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (listing) {
            if (imageIndex === 0) {
                setImageIndex(listing.images.length - 1);
            } else {
                setImageIndex(imageIndex - 1);
            }
        }
    }

    return (
        <div id="user-listing-info">
            <div className="info-card">
                <h1>{listing?.title}</h1>
                <div className="image-container">
                    <button onClick={onPreviousImage}>{"<"}</button>
                    <img src={listing?.images[imageIndex]} alt={listing?.title} />
                    <button onClick={onNextImage}>{">"}</button>
                </div>
                <div className="listing-info">
                    {listing?.isForTrade ? <p>Tradable</p> : null}
                    <p>Price: ${(Math.round(listing?.price * 100) / 100).toFixed(2)}</p>
                    <p>Quantity: {listing?.quantity}</p>
                    <p>Species: {listing?.species.commonName} ({listing?.species.scientificName[0]})</p>
                </div>
                <div className="description">
                    <p>{listing?.description}</p>
                </div>
                <button id="edit-listing-btn" onClick={() => navigate(`/market/my-listings/listing/${listing?.id}/edit`)}>Edit</button>
            </div>
            <ChatList chats={chats} isSeller={true} />
        </div>
    );
}

export default UserListingInfo;