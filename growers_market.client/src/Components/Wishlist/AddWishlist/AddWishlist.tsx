import React, { SyntheticEvent } from "react";
import { useAuth } from "../../../Context/UseAuth";

interface Props {
    onWishlistCreate: (e: SyntheticEvent) => void;
    speciesId: number;
}

const AddWishlist: React.FC<Props> = ({ onWishlistCreate, speciesId }: Props): JSX.Element => {
    const { isLoggedIn } = useAuth();

    return (
        <form onSubmit={onWishlistCreate}>
            <input className="add-wishlist-input" type="hidden" name="speciesId" value={speciesId} />
            <button className="add-wishlist-btn" type="submit" disabled={!isLoggedIn()}>{isLoggedIn() ? "Add to Wishlist" : "Login to Edit Wishlist"}</button>
        </form>
    );
}

export default AddWishlist;