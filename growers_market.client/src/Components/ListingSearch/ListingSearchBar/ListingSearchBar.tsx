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
};

const ListingSearchBar: React.FC<Props> = ({ onSearchSubmit, query, handleQueryChange, isForTrade, handleIsForTradeChange, priceMax, handlePriceMaxChange, species, handleSpeciesChange, sort, handleSortChange, speciesSelectOptions }: Props): JSX.Element => {
    return (
        <form id="listing-search-bar" onSubmit={onSearchSubmit}>
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