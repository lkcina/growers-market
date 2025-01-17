import React, { SyntheticEvent } from "react";
import "./SpeciesCard.css";
import AddWishlist from "../Wishlist/AddWishlist/AddWishlist";
import { SpeciesInfo } from "../../types";

interface Props {
    id: string;
    species: SpeciesInfo;
    onWishlistCreate: (e: SyntheticEvent) => void;
}

const SpeciesCard: React.FC<Props> = ({ id, species, onWishlistCreate }: Props, ) : JSX.Element => {
    return (
        <div id={id} className="species">
            <img src={species.thumbnail} alt={species.commonName} />
            <h1>{species.commonName}</h1>
            <p>{species.scientificName[0]}</p>
            <AddWishlist onWishlistCreate={onWishlistCreate} speciesId={species.id} />
        </div>
    );
}

export default SpeciesCard;