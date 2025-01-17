import React, { SyntheticEvent } from "react";


interface Props {
    onWishlistRemove: (e: SyntheticEvent) => void;
    speciesId: number;
}

const RemoveWishlist: React.FC<Props> = ({ onWishlistRemove, speciesId }: Props): JSX.Element => {
    return (
        <form onSubmit={onWishlistRemove}>
            <input className="rem-wishlist-input" type="hidden" name="speciesId" value={speciesId} />
            <button className="rem-wishlist-btn" type="submit" value={speciesId}>Remove from Wishlist</button>
        </form>
    );
}

export default RemoveWishlist;