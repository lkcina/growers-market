import React, { SyntheticEvent } from "react";

interface Props {
    onWishlistCreate: (e: SyntheticEvent) => void;
    speciesId: number;
}

const AddWishlist: React.FC<Props> = ({ onWishlistCreate, speciesId }: Props): JSX.Element => {
    return (
        <form onSubmit={onWishlistCreate}>
            <input className="add-wishlist-input" type="hidden" name="speciesId" value={speciesId} />
            <button className="add-wishlist-btn" type="submit">Add to Wishlist</button>
        </form>
    );
}

export default AddWishlist;