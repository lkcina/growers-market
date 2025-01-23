import React, { FormEvent, SyntheticEvent } from "react";
import "./SpeciesCard.css";
import AddWishlist from "../Wishlist/AddWishlist/AddWishlist";
import { SpeciesInfo } from "../../types";
import RemoveWishlist from "../Wishlist/RemoveWishlist/RemoveWishlist";
import SpeciesDetailsButton from "../SpeciesDetailsButton/SpeciesDetailsButton";
import SpeciesDetails from "../SpeciesDetails/SpeciesDetails";

interface Props {
    id: string;
    species: SpeciesInfo;
    onWishlistCreate: (e: SyntheticEvent) => void;
    onWishlistRemove: (e: SyntheticEvent) => void;
    wishlistValues: SpeciesInfo[];
    showDetails: (e: FormEvent<HTMLFormElement>) => void;
    speciesDetails: number | null;
    
}

const SpeciesCard: React.FC<Props> = ({ id, species, onWishlistCreate, onWishlistRemove, wishlistValues, showDetails, speciesDetails }: Props, ) : JSX.Element => {
    return (
        <div id={id} className="species">
            <img src={species.thumbnail} alt={species.commonName} />
            <h1>{species.commonName}</h1>
            <p>{species.scientificName[0]}</p>
            <SpeciesDetailsButton showDetails={showDetails} speciesId={species.id} />
            {wishlistValues.find(s => s.id === species.id) ? <RemoveWishlist onWishlistRemove={onWishlistRemove} speciesId={species.id} />
                : <AddWishlist onWishlistCreate={onWishlistCreate} speciesId={species.id} />}
            {speciesDetails === species.id ? (
                <SpeciesDetails species={species} />
            ) : null}
        </div>
    );
}

export default SpeciesCard;