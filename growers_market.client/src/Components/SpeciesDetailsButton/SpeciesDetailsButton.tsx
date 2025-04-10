import React, { FormEvent } from "react";
import "./SpeciesDetailsButton.css";

interface Props {
    speciesId: number;
    showDetails: (e: FormEvent<HTMLFormElement>) => void;
    speciesCommonName: string;    
}

const SpeciesDetailsButton: React.FC<Props> = ({ speciesId, showDetails, speciesCommonName }: Props, ) : JSX.Element => {
    return (
        <form className="species-details-form" onSubmit={showDetails}>
            <input type="hidden" name="speciesId" value={speciesId} />
            <button type="submit">{speciesCommonName}</button>
        </form>
    );
}

export default SpeciesDetailsButton;