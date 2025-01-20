import React, { SyntheticEvent } from "react";
import "./SpeciesCard.css";
import AddWishlist from "../Wishlist/AddWishlist/AddWishlist";
import { SpeciesInfo } from "../../types";
import RemoveWishlist from "../Wishlist/RemoveWishlist/RemoveWishlist";

interface Props {
    id: string;
    species: SpeciesInfo;
    onWishlistCreate: (e: SyntheticEvent) => void;
    onWishlistRemove: (e: SyntheticEvent) => void;
    wishlistValues: SpeciesInfo[];
}

const SpeciesCard: React.FC<Props> = ({ id, species, onWishlistCreate, onWishlistRemove, wishlistValues }: Props, ) : JSX.Element => {
    return (
        <div id={id} className="species">
            <img src={species.thumbnail} alt={species.commonName} />
            <h1>{species.commonName}</h1>
            <p>{species.scientificName[0]}</p>
            {wishlistValues.find(s => s.id === species.id) ? <RemoveWishlist onWishlistRemove={onWishlistRemove} speciesId={species.id} />
                : <AddWishlist onWishlistCreate={onWishlistCreate} speciesId={species.id} />}
        </div>
    );
}

export default SpeciesCard;