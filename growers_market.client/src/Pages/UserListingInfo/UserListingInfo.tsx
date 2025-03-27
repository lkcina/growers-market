import React, { useEffect, useState, MouseEvent } from "react";
import { useNavigate, useParams } from "react-router";
import { Chat, Listing } from "../../types";
import { deleteListing, getListing, getListingChats, getUserListings } from "../../api";
import ChatList from "../../Components/ChatList/ChatList";
import ListingImages from "../../Components/ListingImages/ListingImages";
import { SpeciesInfo } from "../../types";
import './UserListingInfo.css';

interface Props {

}

const UserListingInfo: React.FC<Props> = (): JSX.Element => {
    const { listingId } = useParams();
    const [listing, setListing] = useState<Listing>({
        title: "",
        isForTrade: false,
        price: 0,
        quantity: 0,
        species: {
            id: 0,
            commonName: "",
            scientificName: [""],
            cycle: "",
            watering: "",
            sunlight: [""],
            hardinessMin: 0,
            hardinessMax: 0,
            indoor: false,
            description: "",
            image: "",
            thumbnail: ""
        },
        images: [],
        description: "",
        appUserName: "",
        id: Number(listingId)
    });
    const [userChats, setUserChats] = useState<Chat[]>([]);
    const [imageIndex, setImageIndex] = useState<number>(0);
    const [serverError, setServerError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        getListing(Number(listingId)).then((result) => {
            if (typeof result === "string") {
                setServerError(result);
                navigate("/my-listings/all");
            } else {
                setListing(result.data);
                getListingChats(Number(listingId)).then((chatResult) => {
                    if (typeof chatResult === "string") {
                        setServerError(chatResult);
                    } else if (Array.isArray(chatResult)) {
                        console.log(chatResult);
                        setUserChats(chatResult);
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

    const removeListing = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (window.confirm("Are you sure you want to delete this listing?")) {
            const result = await deleteListing(Number(listingId));
            if (typeof result === "string") {
                setServerError(result);
            } else {
                navigate("/my-listings/all");
            }
        } else {
            return;
        }
    }

    return (
        <div id="user-listing-info">
            <div className="info-card">
                <div className="info-card-header">
                    <h2>{listing?.title}</h2>
                    <div className="info-card-btns">
                        <button id="edit-listing-btn" onClick={() => navigate(`/my-listings/listing/${listing?.id}/edit`)}>Edit</button>
                        <button id="delete-listing-btn" onClick={removeListing}>Delete</button>
                    </div>
                </div>
                <div className="info-card-container">
                    <ListingImages listingTitle={listing.title} images={listing?.images} imageIndex={imageIndex} onNextImage={onNextImage} onPreviousImage={onPreviousImage} />
                    <div className="listing-info">
                        {listing?.isForTrade ? <p>Tradable</p> : null}
                        <p>Price: ${(Math.round(listing?.price * 100) / 100).toFixed(2)}</p>
                        <p>Quantity: {listing?.quantity}</p>
                        <p>Species: {listing.species ? `${listing?.species.commonName} (${listing?.species.scientificName[0]})` : "Not Specified"}</p>
                    </div>
                    <div className="description">
                        <h4>Description</h4>
                        <p>{listing?.description}</p>
                    </div>
                </div>
                
            </div>
            <div className="chats-container">
                <h2>Chats</h2>
                <ChatList chats={userChats} setUserChats={setUserChats} />
            </div>
        </div>
    );
}

export default UserListingInfo;