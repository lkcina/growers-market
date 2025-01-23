import React, { SyntheticEvent } from "react";
import "./SpeciesList.css";
import SpeciesCard from "../SpeciesCard/SpeciesCard";
import { SpeciesInfo } from "../../types";
import { v4 as uuidv4 } from 'uuid';

interface Props {
    searchResult: SpeciesInfo[];
    onWishlistCreate: (e: SyntheticEvent) => void;
    onWishlistRemove: (e: SyntheticEvent) => void;
    wishlistValues: SpeciesInfo[];
    speciesDetails: number | null;
    showDetails: (e: SyntheticEvent) => void;
}

const SpeciesList: React.FC<Props> = ({searchResult, onWishlistCreate, onWishlistRemove, wishlistValues, showDetails, speciesDetails }: Props): JSX.Element => {
    return(
        <div className = "speciesList" >
            {searchResult.length > 0 ? (
                searchResult.map((s) => {
                    return (
                        <SpeciesCard id={`species-${s.id}`} key={uuidv4()} species={s} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistValues={wishlistValues} showDetails={showDetails} speciesDetails={speciesDetails} />
                    )
                })
            ) : (
                <h2>No results found</h2>
            )
            }
        </div>
    );
}

export default SpeciesList;