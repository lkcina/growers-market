import React, { ChangeEvent, SyntheticEvent } from "react";
import './SearchBar.css';

interface Props {
    query: string | undefined;
    handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (e: SyntheticEvent) => void;
};

const SpeciesSearchBar: React.FC<Props> = ({ onSearchSubmit, query, handleQueryChange }: Props): JSX.Element => {
    return (
        <form className="search-bar" onSubmit={onSearchSubmit}>
            <input type="text" value={query} onChange={(e) => handleQueryChange(e)} />
            
            <button type="submit">Search</button>
        </form>
    );
}

export default SpeciesSearchBar;