import React, { SyntheticEvent } from "react";
import "./SearchInfo.css";

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
        <div className="search-info">
            {total > 0 ? (
                <div>
                    <div></div>
                    <div className="page-nav">
                        {currentPage === 1 ? null : <button onClick={onPreviousPage}>{"<"}</button>}
                        <div><span>{currentPage}</span> of {lastPage}</div>
                        {currentPage === lastPage ? null : <button onClick={onNextPage}>{">"}</button>}
                    </div>
                    <div className="results-showing">Showing {from} - {to} of {total}</div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default SearchInfo;