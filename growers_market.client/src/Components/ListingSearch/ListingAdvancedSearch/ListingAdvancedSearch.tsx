import React, { ChangeEvent } from "react";
import { SpeciesInfo } from "../../../types";
import FormSpeciesSelect from "../../FormSpeciesSelect/FormSpeciesSelect";

interface Props {
    isForTrade: boolean | null;
    handleIsForTradeChange: (e: ChangeEvent<HTMLInputElement>) => void;
    priceMax: number;
    handlePriceMaxChange: (e: ChangeEvent<HTMLInputElement>) => void;
    species: SpeciesInfo | null;
    handleSpeciesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    sort: string | null;
    handleSortChange: (e: ChangeEvent<HTMLSelectElement>) => void;

    speciesSelectOptions: SpeciesInfo[];
}

const ListingAdvancedSearch: React.FC<Props> = ({ isForTrade, handleIsForTradeChange, priceMax, handlePriceMaxChange, species, handleSpeciesChange, sort, handleSortChange, speciesSelectOptions }: Props): JSX.Element => {
    return (
        <div id="listing-advanced-search">
            <fieldset>
                <label>Tradability</label>
                <input id="tradable" type="radio" name="tradable" value="true" checked={isForTrade === true} onChange={handleIsForTradeChange} />
                <label htmlFor="tradable">Tradable</label>
                <input id="tradable" type="radio" name="tradable" value="false" checked={isForTrade === false} onChange={handleIsForTradeChange} />
                <label htmlFor="not-tradable">Purchase Only</label>
                <input id="tradable-not-tradable" type="radio" name="tradable" value="null" checked={isForTrade === null} onChange={handleIsForTradeChange} />
                <label htmlFor="tradable-not-tradable">All</label>
            </fieldset>
            <fieldset>
                <label htmlFor="price-max">Maximum Price</label>
                <input id="price-max" type="number" min="0" max="9999.99" step="0.01" value={priceMax} onChange={handlePriceMaxChange} />
            </fieldset>
            <FormSpeciesSelect speciesValue={species} handleSpeciesChange={handleSpeciesChange} speciesSelectOptions={speciesSelectOptions} isSpeciesSearch={false} openSpeciesSearch={null} />
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