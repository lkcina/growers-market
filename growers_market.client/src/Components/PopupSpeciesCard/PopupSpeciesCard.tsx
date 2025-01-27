import React, { SyntheticEvent } from "react";
import "./PopupSpeciesCard.css";
import { SpeciesInfo } from "../../types";

interface Props {
    id: string;
    species: SpeciesInfo;
    onSelect: (e: SyntheticEvent) => void;
    
}

const PopupSpeciesCard: React.FC<Props> = ({ id, species, onSelect }: Props, ) : JSX.Element => {
    return (
        <div id={id} className="species">
            <img src={species.thumbnail} alt={species.commonName} />
            <h1>{species.commonName}</h1>
            <p>{species.scientificName[0]}</p>
            <form onSubmit={onSelect}>
                <input type="hidden" name="speciesId" value={species.id} />
                <button type="submit">Select</button>
            </form>
        </div>
    );
}

export default PopupSpeciesCard;