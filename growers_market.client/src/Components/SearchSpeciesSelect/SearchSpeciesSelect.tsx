import React, { ChangeEvent } from 'react';
import { SpeciesInfo } from '../../types';
import { v4 as uuidv4 } from 'uuid';
import './SearchSpeciesSelect.css';

interface Props {
    speciesValue: SpeciesInfo | null;
    handleSpeciesChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    speciesSelectOptions: SpeciesInfo[];
}

const SearchSpeciesSelect: React.FC<Props> = ({ speciesValue, handleSpeciesChange, speciesSelectOptions }: Props): JSX.Element => {
    return (
        <fieldset id="search-species-select">
            <label htmlFor="listing-species">Species</label>
            <div>
                <select id="listing-species" name="SpeciesId" value={speciesValue ? speciesValue.id : "0"} onChange={handleSpeciesChange} >
                    <option value="">Select a species</option>
                    {
                        speciesSelectOptions.map(s => {
                            return <option key={uuidv4()} id={String(s.id)} value={s.id}>{s.commonName} ({s.scientificName[0]})</option>
                        })
                    }
                </select>
            </div>
        </fieldset>
    );
};

export default SearchSpeciesSelect;