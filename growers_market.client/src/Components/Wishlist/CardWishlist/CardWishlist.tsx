import React, { SyntheticEvent } from "react";
import "./CardWishlist.css";
import { SpeciesInfo } from "../../../types";
import RemoveWishlist from "../RemoveWishlist/RemoveWishlist";

interface Props {
    id: string;
    species: SpeciesInfo;
    onWishlistRemove: (e: SyntheticEvent) => void;
}

const CardWishlist: React.FC<Props> = ({ id, species, onWishlistRemove }: Props, ) : JSX.Element => {
    return (
        <div id={id} className="species">
            <img src={species.thumbnail} alt={species.commonName} />
            <h1>{species.commonName}</h1>
            <p>{species.scientificName[0]}</p>
            <RemoveWishlist onWishlistRemove={onWishlistRemove} speciesId={species.id} />
        </div>
    );
}

export default CardWishlist;