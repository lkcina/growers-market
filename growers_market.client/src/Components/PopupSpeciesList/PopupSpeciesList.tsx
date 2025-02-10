import React, { SyntheticEvent, useEffect, useRef } from "react";
import "./PopupSpeciesList.css";
import { SpeciesInfo } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import PopupSpeciesCard from "../PopupSpeciesCard/PopupSpeciesCard";

interface Props {
    searchResult: SpeciesInfo[];
    onSelect: (e: SyntheticEvent) => void;
    onScroll: (e: SyntheticEvent) => void;
}

const PopupSpeciesList: React.FC<Props> = ({ searchResult, onSelect, onScroll }: Props): JSX.Element => {
    useEffect(() => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollLeft = document.documentElement.scrollLeft;

        window.onscroll = () => {
            window.scrollTo(scrollLeft, scrollTop);
        }

        return () => {
            window.onscroll = () => { };
        };
    }, [])

    return (
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