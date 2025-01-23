import React from "react";
import "./SpeciesDetails.css";
import { SpeciesInfo } from "../../types";

interface Props {
    species: SpeciesInfo;
    
}

const SpeciesDetails: React.FC<Props> = ({ species }: Props, ) : JSX.Element => {
    return (
        <div className="species-details">
            <div className="species-details-properties">
                <p>Cycle: {species.cycle}</p>
                <p>Sunlight: {species.sunlight}</p>
                <p>Watering: {species.watering}</p>
                <p>Hardiness: {species.hardinessMin === species.hardinessMax ? species.hardinessMin : species.hardinessMin + " - " + species.hardinessMax}</p>
                <p>{species.indoor ? "Indoor" : null}</p>
            </div>
            <div className="species-details-description">
                {species.description}
            </div>
        </div>
    );
}

export default SpeciesDetails;