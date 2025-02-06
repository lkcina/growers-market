import React, { ChangeEvent } from "react";
import { SpeciesInfo } from "../../../types";
import FormSpeciesSelect from "../../FormSpeciesSelect/FormSpeciesSelect";
import './ListingAdvancedSearch.css';

interface Props {
    isForTrade: boolean | null;
    handleIsForTradeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    priceMax: number;
    handlePriceMaxChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    species: SpeciesInfo | null;
    handleSpeciesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    sort: string | null;
    handleSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;

    speciesSelectOptions: SpeciesInfo[];
}

const ListingAdvancedSearch: React.FC<Props> = ({ isForTrade, handleIsForTradeChange, priceMax, handlePriceMaxChange, species, handleSpeciesChange, sort, handleSortChange, speciesSelectOptions }: Props): JSX.Element => {
    return (
        <div id="listing-advanced-search">
            <FormSpeciesSelect speciesValue={species} handleSpeciesChange={handleSpeciesChange} speciesSelectOptions={speciesSelectOptions} isSpeciesSearch={false} openSpeciesSearch={null} />
            <fieldset>
                <label htmlFor="tradable">Tradability</label>
                <select id="tradable" value={isForTrade !== null ? isForTrade.toString() : "null"} onChange={handleIsForTradeChange}>
                    <option value="null">Select</option>
                    <option value="true">Tradable</option>
                    <option value="false">Purchase Only</option>
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="price-max">Maximum Price</label>
                <select id="price-max" value={priceMax} onChange={handlePriceMaxChange}>
                    <option value="10000">Select</option>
                    <option value="5">$5</option>
                    <option value="10">$10</option>
                    <option value="20">$20</option>
                    <option value="50">$50</option>
                    <option value="100">$100</option>
                    <option value="250">$250</option>
                    <option value="500">$500</option>
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="sort">SortBy</label>
                <select id="sort" value={sort ? sort : "null"} onChange={handleSortChange}>
                    <option value="null">Newest</option>
                    <option value="dateAsc">Oldest</option>
                    <option value="price">Lowest Price</option>
                    <option value="priceDesc">Highest Price</option>
                </select>
            </fieldset>
        </div>
    );
}

export default ListingAdvancedSearch;