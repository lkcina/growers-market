import React, { SyntheticEvent } from "react";

interface Props {
    currentPage: number;
    lastPage: number;
    from: number;
    to: number;
    total: number;
    onNextPage: (e: SyntheticEvent) => void;
    onPreviousPage: (e: SyntheticEvent) => void;
}

const SearchInfo: React.FC<Props> = ({ currentPage, lastPage, from, to, total, onNextPage, onPreviousPage }: Props): JSX.Element => {
    return (
        <>
            {total > 0 ? (
                <div>
                    <div>
                        <button disabled={currentPage === 1} onClick={onPreviousPage}>Previous</button>
                        <span>{currentPage} of {lastPage}</span>
                        <button disabled={currentPage === lastPage} onClick={onNextPage}>Next</button>
                    </div>
                    <div>Showing {from} - {to} of {total}</div>
                </div>
            ) : (
                <div></div>
            )}
        </>
    )
}

export default SearchInfo;