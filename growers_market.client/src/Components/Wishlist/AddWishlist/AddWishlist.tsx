import React, { SyntheticEvent } from "react";
import { useAuth } from "../../../Context/UseAuth";
import "./AddWishlist.css";

interface Props {
    onWishlistCreate: (e: SyntheticEvent) => void;
    speciesId: number;
}

const AddWishlist: React.FC<Props> = ({ onWishlistCreate, speciesId }: Props): JSX.Element => {
    const { isLoggedIn } = useAuth();

    return (
        <form className="wishlist-form" onSubmit={onWishlistCreate}>
            <input className="add-wishlist-input" type="hidden" name="speciesId" value={speciesId} />
            <button className="add-wishlist-btn" type="submit" disabled={!isLoggedIn()}>Add to Wishlist</button>
        </form>
    );
}

export default AddWishlist;