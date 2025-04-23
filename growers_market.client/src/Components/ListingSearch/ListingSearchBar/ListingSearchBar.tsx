import React, { ChangeEvent, SyntheticEvent, useEffect } from "react";
import { SpeciesInfo } from "../../../types";
import ListingAdvancedSearch from "../ListingAdvancedSearch/ListingAdvancedSearch";
import './ListingSearchBar.css';
import { useAuth } from "../../../Context/UseAuth";

interface Props {
    query: string | undefined;
    handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isForTrade: boolean | null;
    handleIsForTradeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    priceMax: number;
    handlePriceMaxChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    species: SpeciesInfo | null;
    handleSpeciesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    sort: string | null;
    handleSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;

    speciesSelectOptions: SpeciesInfo[];
    
    onSearchSubmit: (e: SyntheticEvent) => void;

    searchRadius: number;
    searchRadiusIncrement: (e: SyntheticEvent<HTMLButtonElement>) => void;
    searchRadiusDecrement: (e: SyntheticEvent<HTMLButtonElement>) => void;
    searchUnit: string;
    handleSearchUnitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    searchLocation: string;
    handleSearchLocationChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleLocationOptionSelect: (e: SyntheticEvent) => void;
};

const ListingSearchBar: React.FC<Props> = ({ onSearchSubmit, query, handleQueryChange, isForTrade, handleIsForTradeChange, priceMax, handlePriceMaxChange, species, handleSpeciesChange, sort, handleSortChange, speciesSelectOptions, searchRadius, searchRadiusIncrement, searchRadiusDecrement, searchUnit, handleSearchUnitChange, searchLocation, handleSearchLocationChange, handleLocationOptionSelect }: Props): JSX.Element => {
    const { isLoggedIn } = useAuth();


    const locationMouseOver = (e: SyntheticEvent) => {
        const target = e.target as HTMLButtonElement;
        target.focus();
    }

    const handleRadiusKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case "Tab":
            case "ArrowUp":
            case "ArrowDown":
                break
            default:
                e.preventDefault();
                break;
        }
    }

    return (
        <form id="listing-search-bar" onSubmit={onSearchSubmit}>
            <div id="search-area">
                <div className="radius">
                    <label htmlFor="search-radius">Search Area</label>
                    <div>
                        <div className="radius-container">
                            <input id="search-radius" type="number" readOnly min="10" max="500" step="10" value={searchRadius} onKeyDown={handleRadiusKeyDown} />
                            <button type="button" onMouseDown={searchRadiusIncrement} onTouchStart={searchRadiusIncrement}>▲</button>
                            <button type="button" onMouseDown={searchRadiusDecrement} onTouchStart={searchRadiusDecrement}>▼</button>
                        </div>
                        
                        <select id="search-unit" value={searchUnit} onChange={handleSearchUnitChange}>
                            <option value="mi">Miles</option>
                            <option value="km">Kilometers</option>
                        </select>
                    </div>
                    
                </div>
                <div className="location">
                    <label htmlFor="search-location">Search Location</label>
                    <input id="search-location" name="searchLocation" type="text" value={searchLocation} onChange={handleSearchLocationChange} />
                    <div id="location-options">
                        {isLoggedIn() ? <button type="button" onClick={handleLocationOptionSelect} value="Home Address" onMouseOver={locationMouseOver}>Home Address</button> : null}
                        <button type="button" onClick={handleLocationOptionSelect} value="Current Location" onMouseOver={locationMouseOver}>Current Location</button>
                    </div>
                </div>
            </div>
            <input type="text" value={query} onChange={handleQueryChange} placeholder="Search for a listing" />
            <button type="submit">Search</button>
            <details >
                <summary>Advanced Search</summary>
                <ListingAdvancedSearch isForTrade={isForTrade} handleIsForTradeChange={handleIsForTradeChange} priceMax={priceMax} handlePriceMaxChange={handlePriceMaxChange} species={species} handleSpeciesChange={handleSpeciesChange} sort={sort} handleSortChange={handleSortChange} speciesSelectOptions={speciesSelectOptions} />
            </details>

        </form>
    );
}

export default ListingSearchBar;