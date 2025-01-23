import React, { FormEvent } from "react";
import "./SpeciesDetailsButton.css";

interface Props {
    speciesId: number;
    showDetails: (e: FormEvent<HTMLFormElement>) => void;
    
}

const SpeciesDetailsButton: React.FC<Props> = ({ speciesId, showDetails }: Props, ) : JSX.Element => {
    return (
        <form className="species-details-form" onSubmit={showDetails}>
            <input type="hidden" name="speciesId" value={speciesId} />
            <button type="submit">i</button>
        </form>
    );
}

export default SpeciesDetailsButton;