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

const SpeciesCard: React.FC<Props> = ({ id, species, onWishlistCreate, onWishlistRemove, wishlistValues, showDetails, speciesDetails }: Props,): JSX.Element => {
    const onImageError = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLImageElement;
        target.classList.add("image-error");
    }

    return (
        <div id={id} className={speciesDetails === species.id ? "species-card show-details" : "species-card"}>
            <div>
                <img src={species.thumbnail} alt={species.commonName} onError={onImageError} />
                <SpeciesDetailsButton showDetails={showDetails} speciesId={species.id} speciesCommonName={species.commonName} />
                <p>{species.scientificName[0]}</p>
                {wishlistValues.find(s => s.id === species.id) ? <RemoveWishlist onWishlistRemove={onWishlistRemove} speciesId={species.id} />
                    : <AddWishlist onWishlistCreate={onWishlistCreate} speciesId={species.id} />}
            </div>
            {speciesDetails === species.id ? (
                <SpeciesDetails species={species} />
            ) : null}
        </div>
    );
}

export default SpeciesCard;