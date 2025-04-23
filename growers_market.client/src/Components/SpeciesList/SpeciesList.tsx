import React, { FormEvent, SyntheticEvent, useEffect, useRef, useState } from "react";
import "./SpeciesList.css";
import SpeciesCard from "../SpeciesCard/SpeciesCard";
import { SpeciesInfo } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import SpeciesDetails from "../SpeciesDetails/SpeciesDetails";

interface Props {
    searchResult: SpeciesInfo[];
    onWishlistCreate: (e: SyntheticEvent) => void;
    onWishlistRemove: (e: SyntheticEvent) => void;
    wishlistValues: SpeciesInfo[];
    speciesDetails: number | null;
    showDetails: (e: FormEvent<HTMLFormElement>) => void;
}

const SpeciesList: React.FC<Props> = ({ searchResult, onWishlistCreate, onWishlistRemove, wishlistValues, showDetails, speciesDetails }: Props): JSX.Element => {
    const listRef = useRef<HTMLDivElement>(null);
    const [listColumns, setListColumns] = useState<number>(0);
    const [speciesColumn, setSpeciesColumn] = useState<number>(0);
    const [searchResultDetails, setSearchResultDetails] = useState<SpeciesInfo[]>([]);

    

    useEffect(() => {
        const handleSpeciesList = () => {
            if (listRef.current) {
                if (speciesDetails !== null) {
                    const columns = Math.floor((listRef.current.offsetWidth + 15) / 235);
                    setListColumns(columns);
                    const detailsSpecies: SpeciesInfo = { ...searchResult.filter((s) => s.id === speciesDetails)[0] }
                    const rowOfSpecies = Math.floor(searchResult.indexOf(searchResult.find((s) => s.id === speciesDetails)!) / columns) + 1;
                    const columnOfSpecies = (searchResult.indexOf(searchResult.find((s) => s.id === speciesDetails)!) % columns) + 1;
                    setSpeciesColumn(columnOfSpecies);
                    detailsSpecies.id = 0;
                    const detailsIndex = (rowOfSpecies * columns);
                    const newSearchResultDetails: SpeciesInfo[] = [...searchResult];
                    newSearchResultDetails.splice(detailsIndex, 0, detailsSpecies);
                    setSearchResultDetails(newSearchResultDetails);
                }
            }
        }

        handleSpeciesList()

        if (speciesDetails !== null) {

            window.addEventListener('resize', handleSpeciesList)
        } else {
            window.removeEventListener('resize', handleSpeciesList);
        }

        return () => {
            window.removeEventListener('resize', handleSpeciesList);
        }

    }, [speciesDetails, searchResult]);

    

    

    return(
        <div className="species-list" ref={listRef} style={{ maxWidth: `${searchResult.length < 5 ? `${(235 * searchResult.length) - 15}px` : "1160px"}` }}>
            {searchResult.length > 0 ? (
                speciesDetails === null ? (
                    searchResult.map((s) => {
                        return (
                            <SpeciesCard id={`species-${s.id}`} key={uuidv4()} species={s} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistValues={wishlistValues} showDetails={showDetails} speciesDetails={speciesDetails} isAfterDetails={false} />
                        )
                    })
                ) : (
                    searchResultDetails.map((s, index) => {
                        const detailsIndex = searchResultDetails.indexOf(searchResultDetails.find((s) => s.id === 0)!);
                        return (
                            s.id !== 0 ? index !== detailsIndex + 1 ? <SpeciesCard id={`species-${s.id}`} key={uuidv4()} species={s} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistValues={wishlistValues} showDetails={showDetails} speciesDetails={speciesDetails} isAfterDetails={false} />
                                : <SpeciesCard id={`species-${s.id}`} key={uuidv4()} species={s} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistValues={wishlistValues} showDetails={showDetails} speciesDetails={speciesDetails} isAfterDetails={true} />
                                : <SpeciesDetails key={uuidv4()} species={s} columns={listColumns} speciesColumn={speciesColumn} />
                        )
                    })
                )
            ) : (
                <h2>No results found</h2>
            )
            }
        </div>
    );
}

export default SpeciesList;