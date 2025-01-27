import React, { SyntheticEvent, useEffect, useRef } from "react";
import "./PopupSpeciesList.css";
import { SpeciesInfo } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import PopupSpeciesCard from "../PopupSpeciesCard/PopupSpeciesCard";

interface Props {
    searchResult: SpeciesInfo[];
    onSelect: (e: SyntheticEvent) => void;
    onScroll: () => void;
}

const PopupSpeciesList: React.FC<Props> = ({ searchResult, onSelect, onScroll }: Props): JSX.Element => {
    return(
        <div id="popup-species-list" onScroll={onScroll} >
            {searchResult.length > 0 ? (
                searchResult.map((s) => {
                    return (
                        <PopupSpeciesCard id={`species-${s.id}`} key={uuidv4()} species={s} onSelect={onSelect} />
                    )
                })
            ) : (
                <h2>No results found</h2>
            )
            }
        </div>
    );
}

export default PopupSpeciesList;