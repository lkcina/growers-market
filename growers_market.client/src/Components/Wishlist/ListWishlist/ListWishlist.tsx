import { SpeciesInfo } from "../../../types";
import { v4 as uuidv4 } from 'uuid';
import { FormEvent, SyntheticEvent } from "react";
import SpeciesCard from "../../SpeciesCard/SpeciesCard";
import './ListWishlist.css';


interface Props {
    wishlistSearchResult: SpeciesInfo[];
    wishlistValues: SpeciesInfo[];
    onWishlistRemove: (e: SyntheticEvent) => void;
    onWishlistCreate: (e: SyntheticEvent) => void;
    showDetails: (e: FormEvent<HTMLFormElement>) => void;
    speciesDetails: number | null;
}

const ListWishlist: React.FC<Props> = ({ wishlistValues, onWishlistRemove, onWishlistCreate, wishlistSearchResult, showDetails, speciesDetails }: Props): JSX.Element => {
    return (
        <div className="wishlist-list" ref={listRef} style={{ maxWidth: `${searchResult.length < 5 ? `${(235 * searchResult.length) - 15}px` : "1160px"}` }}>
            {wishlistSearchResult.length > 0 ? (
                speciesDetails === null ? (
                    searchResult.map((s) => {
                        return (
                            <SpeciesCard id={`species-${s.id}`} key={uuidv4()} species={s} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistValues={wishlistValues} showDetails={showDetails} speciesDetails={speciesDetails} isAfterDetails={false} />
                        )
                    })
                ) : (
                    searchResultDetails.map((s, index) => {
                        const detailsIndex = searchResultDetails.indexOf(searchResultDetails.find((s) => s.id === 0));
                        return (
                            s.id !== 0 ? index !== detailsIndex + 1 ? <SpeciesCard id={`species-${s.id}`} key={uuidv4()} species={s} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistValues={wishlistValues} showDetails={showDetails} speciesDetails={speciesDetails} isAfterDetails={false} />
                                : <SpeciesCard id={`species-${s.id}`} key={uuidv4()} species={s} onWishlistCreate={onWishlistCreate} onWishlistRemove={onWishlistRemove} wishlistValues={wishlistValues} showDetails={showDetails} speciesDetails={speciesDetails} isAfterDetails={true} />
                                : <SpeciesDetails key={uuidv4()} species={s} columns={listColumns} speciesColumn={speciesColumn} />
                        )
                    })
                )
            ) : (
                <h2>No results found</h2>
            )
            }
        </div>
    );
}

export default ListWishlist;