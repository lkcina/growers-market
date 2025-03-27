import React from "react";
import "./SpeciesDetails.css";
import { SpeciesInfo } from "../../types";

interface Props {
    species: SpeciesInfo;
    columns: number;
    speciesColumn: number;
}

const SpeciesDetails: React.FC<Props> = ({ species, columns, speciesColumn }: Props,): JSX.Element => {
    return (
        <div id="species-details" style={{gridColumn: `${columns <= 3 ? "1 / -1" : columns === 5 && speciesColumn === 3 ? "2 / span 3" : speciesColumn <= 2 ? "1 / span 3" : "-4 / span 3"}`, marginLeft: `${columns === 1 ? "-50px" : "0"}`}} >
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