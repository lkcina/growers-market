import React, { SyntheticEvent, useEffect, useState } from "react";
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
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return (
        <div className="search-info">
            {total > 0 ? (
                <div>
                    {windowWidth > 784 ? <div></div> : null}
                    <div className="page-nav">
                        {currentPage === 1 ? null : <button onClick={onPreviousPage}>◄</button>}
                        <div><span>{currentPage}</span> of {lastPage}</div>
                        {currentPage === lastPage ? null : <button onClick={onNextPage}>►</button>}
                    </div>
                    {windowWidth > 550 ? <div className="results-showing">Showing {from} - {to} of {total}</div> : null}
                </div>
            ) : (
                <div></div>
            )}
        </div>
    )
}

export default SearchInfo;