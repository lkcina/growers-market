import React, { ChangeEvent, SyntheticEvent } from "react";

interface Props {
    query: string | undefined;
    handleQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (e: SyntheticEvent) => void;
};

const SpeciesSearchBar: React.FC<Props> = ({ onSearchSubmit, query, handleQueryChange }: Props): JSX.Element => {
    return (
        <form onSubmit={onSearchSubmit}>
            <input type="text" value={query} onChange={(e) => handleQueryChange(e)} />
            
            <button onClick={(e) => onSearchSubmit(e)}>Search</button>
        </form>
    );
}

export default SpeciesSearchBar;