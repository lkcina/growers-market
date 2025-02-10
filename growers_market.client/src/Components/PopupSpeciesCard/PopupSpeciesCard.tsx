import React, { SyntheticEvent } from "react";
import "./PopupSpeciesCard.css";
import { SpeciesInfo } from "../../types";

interface Props {
    id: string;
    species: SpeciesInfo;
    onSelect: (e: SyntheticEvent) => void;
    
}

const PopupSpeciesCard: React.FC<Props> = ({ id, species, onSelect }: Props, ) : JSX.Element => {
    const onImageError = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLImageElement;
        target.classList.add("image-error");
    }

    return (
        <div id={id} className="popup-species-card">
            <img src={species.thumbnail} alt={species.commonName} onError={onImageError} />
            <h3>{species.commonName}</h3>
            <p>{species.scientificName[0]}</p>
            <form onSubmit={onSelect}>
                <input type="hidden" name="speciesId" value={species.id} />
                <button type="submit">Select</button>
            </form>
        </div>
    );
}

export default PopupSpeciesCard;