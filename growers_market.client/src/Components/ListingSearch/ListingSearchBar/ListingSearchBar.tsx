import React, { ChangeEvent, SyntheticEvent } from "react";
import { SpeciesInfo } from "../../../types";
import ListingAdvancedSearch from "../ListingAdvancedSearch/ListingAdvancedSearch";
import './ListingSearchBar.css';

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
    handleSearchRadiusChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchUnit: string;
    handleSearchUnitChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    searchLocation: string;
    handleSearchLocationChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ListingSearchBar: React.FC<Props> = ({ onSearchSubmit, query, handleQueryChange, isForTrade, handleIsForTradeChange, priceMax, handlePriceMaxChange, species, handleSpeciesChange, sort, handleSortChange, speciesSelectOptions, searchRadius, handleSearchRadiusChange, searchUnit, handleSearchUnitChange, searchLocation, handleSearchLocationChange }: Props): JSX.Element => {
    return (
        <form id="listing-search-bar" onSubmit={onSearchSubmit}>
            <div id="search-area">
                <div>
                    <label htmlFor="search-radius">Search Radius</label>
                    <input id="search-radius" type="number" min="10" max="500" step="10" value={searchRadius} onChange={handleSearchRadiusChange} onKeyDown={(e) => e.preventDefault()} />
                    <select id="search-unit" value={searchUnit} onChange={handleSearchUnitChange}>
                        <option value="mi">Miles</option>
                        <option value="km">Kilometers</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="search-location">Search Location</label>
                    <input id="search-location" list="location" type="text" value={searchLocation} onChange={handleSearchLocationChange} />
                    <datalist id="location">
                        <option>Home Address</option>
                        <option>Current Location</option>
                    </datalist>
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