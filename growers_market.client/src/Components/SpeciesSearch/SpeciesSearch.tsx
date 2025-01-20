import React, { ChangeEvent, useState, MouseEvent, SyntheticEvent } from "react";

interface Props {
    search: string | undefined;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSearchSubmit: (e: SyntheticEvent) => void;
};

const SpeciesSearchBar: React.FC<Props> = ({ onSearchSubmit, search, handleChange }: Props): JSX.Element => {
    return (
        <form onSubmit={onSearchSubmit}>
            <input type="text" value={search} onChange={(e) => handleChange(e)} />
            <button onClick={(e) => onSearchSubmit(e)}>Search</button>
        </form>
    );
}

export default SpeciesSearchBar;