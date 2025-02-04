import React, { ChangeEvent } from 'react';
import { SpeciesInfo } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import './FormSpeciesSelect.css';

interface Props {
    speciesValue: SpeciesInfo | null;
    handleSpeciesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    speciesSelectOptions: SpeciesInfo[];
    isSpeciesSearch: boolean;
    openSpeciesSearch: (() => void) | null;
}

const FormSpeciesSelect: React.FC<Props> = ({ speciesValue, handleSpeciesChange, speciesSelectOptions, isSpeciesSearch, openSpeciesSearch }: Props): JSX.Element => {
    return (
        <fieldset>
            <label htmlFor="listing-species">Species</label>
            <select id="listing-species" name="SpeciesId" value={speciesValue ? speciesValue.id : "0"} onChange={handleSpeciesChange} >
                <option value="">Select a species</option>
                {
                    speciesSelectOptions.map(s => {
                        return <option key={uuidv4()} id={String(s.id)} value={s.id}>{s.commonName} ({s.scientificName[0]})</option>
                    })
                }
            </select>
            {isSpeciesSearch ? <button type="button" onClick={openSpeciesSearch}>Search</button> : null}
        </fieldset>
    );
};

export default FormSpeciesSelect;