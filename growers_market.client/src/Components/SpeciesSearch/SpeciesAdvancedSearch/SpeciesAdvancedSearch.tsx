import React, { ChangeEvent } from "react";

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
    handleIndoorChange: (e: ChangeEvent<HTMLInputElement>) => void;
    edible: boolean | null;
    handleEdibleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    poisonous: boolean | null;
    handlePoisonousChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SpeciesAdvancedSearch: React.FC<Props> = ({ cycle, handleCycleChange, sunlight, handleSunlightChange, watering, handleWateringChange, hardiness, handleHardinessChange, indoor, handleIndoorChange, edible, handleEdibleChange, poisonous, handlePoisonousChange }: Props): JSX.Element => {
    return (
        <div id="species-advanced-search">
            <fieldset>
                <label htmlFor="cycle">Cycle</label>"
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
                <label>Indoor or Outdoor</label>
                <input id="indoor" type="radio" name="indoor" value="true" checked={indoor === true} onChange={handleIndoorChange} />
                <label htmlFor="indoor">Indoor</label>
                <input id="outdoor" type="radio" name="indoor" value="false" checked={indoor === false} onChange={handleIndoorChange} />
                <label htmlFor="outdoor">Outdoor</label>
                <input id="indoor-outdoor" type="radio" name="indoor" value="null" checked={indoor === null} onChange={handleIndoorChange} />
                <label htmlFor="indoor-outdoor">All</label>
            </fieldset>
            <fieldset>
                <label>Edibility</label>
                <input id="edible" type="radio" name="edible" value="true" checked={edible === true} onChange={handleEdibleChange} />
                <label htmlFor="edible">Edible</label>
                <input id="inedible" type="radio" name="edible" value="false" checked={edible === false} onChange={handleEdibleChange} />
                <label htmlFor="inedible">Inedible</label>
                <input id="edible-inedible" type="radio" name="edible" value="null" checked={edible === null} onChange={handleEdibleChange} />
                <label htmlFor="edible-inedible">All</label>
            </fieldset>
            <fieldset>
                <label>Poisonous</label>
                <input id="poisonous" type="radio" name="poisonous" value="true" checked={poisonous === true} onChange={handlePoisonousChange} />
                <label htmlFor="poisonous">Poisonous</label>
                <input id="not-poisonous" type="radio" name="poisonous" value="false" checked={poisonous === false} onChange={handlePoisonousChange} />
                <label htmlFor="not-poisonous">Not Poisonous</label>
                <input id="poisonous-not-poisonous" type="radio" name="poisonous" value="null" checked={poisonous === null} onChange={handlePoisonousChange} />
                <label htmlFor="poisonous-not-poisonous">All</label>
            </fieldset>
        </div>
    );
}

export default SpeciesAdvancedSearch;