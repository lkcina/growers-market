import React, { ChangeEvent, SyntheticEvent } from "react";
import SpeciesAdvancedSearch from "../SpeciesAdvancedSearch/SpeciesAdvancedSearch";
import "./SpeciesSearchBar.css";

interface Props {
    query: string | undefined;
    handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
    cycle: string | null;
    handleCycleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    sunlight: string | null;
    handleSunlightChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    watering: string | null;
    handleWateringChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    hardiness: number | null;
    handleHardinessChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    indoor: boolean | null;
    handleIndoorChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    edible: boolean | null;
    handleEdibleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    poisonous: boolean | null;
    handlePoisonousChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    onSearchSubmit: (e: SyntheticEvent) => void;
};

const SpeciesSearchBar: React.FC<Props> = ({ onSearchSubmit, query, handleQueryChange, cycle, handleCycleChange, sunlight, handleSunlightChange, watering, handleWateringChange, hardiness, handleHardinessChange, indoor, handleIndoorChange, edible, handleEdibleChange, poisonous, handlePoisonousChange }: Props): JSX.Element => {
    return (
        <form id="species-search-bar" onSubmit={onSearchSubmit}>
            <input type="text" value={query} onChange={handleQueryChange} placeholder="Search for a plant" />
            
            <button onClick={(e) => onSearchSubmit(e)}>Search</button>
            <details >
                <summary>Advanced Search</summary>
                <SpeciesAdvancedSearch cycle={cycle} handleCycleChange={handleCycleChange} sunlight={sunlight} handleSunlightChange={handleSunlightChange} watering={watering} handleWateringChange={handleWateringChange} hardiness={hardiness} handleHardinessChange={handleHardinessChange} indoor={indoor} handleIndoorChange={handleIndoorChange} edible={edible} handleEdibleChange={handleEdibleChange} poisonous={poisonous} handlePoisonousChange={handlePoisonousChange} />
            </details>

        </form>
    );
}

export default SpeciesSearchBar;