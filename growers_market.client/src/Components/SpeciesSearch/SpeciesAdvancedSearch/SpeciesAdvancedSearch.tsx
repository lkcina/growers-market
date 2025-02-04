import React, { ChangeEvent } from "react";
import "./SpeciesAdvancedSearch.css";

interface Props {
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
}

const SpeciesAdvancedSearch: React.FC<Props> = ({ cycle, handleCycleChange, sunlight, handleSunlightChange, watering, handleWateringChange, hardiness, handleHardinessChange, indoor, handleIndoorChange, edible, handleEdibleChange, poisonous, handlePoisonousChange }: Props): JSX.Element => {
    return (
        <div id="species-advanced-search">
            <fieldset>
                <label htmlFor="cycle">Cycle</label>
                <select id="cycle" value={cycle ? cycle : "null"} onChange={handleCycleChange}>
                    <option value="null">Select</option>
                    <option value="annual">Annual</option>
                    <option value="biennial">Biennial</option>
                    <option value="perennial">Perennial</option>
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="sunlight">Sunlight</label>
                <select id="sunlight" value={sunlight ? sunlight : "null"} onChange={handleSunlightChange}>
                    <option value="null">Select</option>
                    <option value="full_shade">Full Shade</option>
                    <option value="part_shade">Part Shade</option>
                    <option value="sun_part_shade">Part Sun</option>
                    <option value="full_sun">Full Sun</option>
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="watering">Watering</label>
                <select id="watering" value={watering ? watering : "null"} onChange={handleWateringChange}>
                    <option value="null">Select</option>
                    <option value="frequent">Frequent</option>
                    <option value="average">Moderate</option>
                    <option value="minimal">Minimal</option>
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="hardiness">Hardiness</label>
                <select id="hardiness" value={hardiness ? hardiness : "null"} onChange={handleHardinessChange}>
                    <option value="null">Select</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                    <option value={6}>6</option>
                    <option value={7}>7</option>
                    <option value={8}>8</option>
                    <option value={9}>9</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="indoor">Indoor/Outdoor</label>
                <select id="indoor" value={indoor !== null ? indoor.toString() : "null"} onChange={handleIndoorChange}>
                    <option value="null">Select</option>
                    <option value="true">Indoor</option>
                    <option value="false">Outdoor</option>
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="edible">Edibility</label>
                <select id="edible" value={edible !== null ? edible.toString() : "null"} onChange={handleEdibleChange}>
                    <option value="null">Select</option>
                    <option value="true">Edible</option>
                    <option value="false">Inedible</option>
                </select>
            </fieldset>
            <fieldset>
                <label htmlFor="poisonous">Poisonous</label>
                <select id="poisonous" value={poisonous !== null ? poisonous.toString() : "null"} onChange={handlePoisonousChange}>
                    <option value="null">Select</option>
                    <option value="true">Poisonous</option>
                    <option value="false">Not Poisonous</option>
                </select>
            </fieldset>
        </div>
    );
}

export default SpeciesAdvancedSearch;