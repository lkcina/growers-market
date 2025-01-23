import { SpeciesInfo } from "../../../types";
import { v4 as uuidv4 } from 'uuid';
import { FormEvent, SyntheticEvent } from "react";
import SpeciesCard from "../../SpeciesCard/SpeciesCard";


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
        <div>
            {wishlistValues.length > 0 ? (
                wishlistSearchResult.length > 0 ? (wishlistSearchResult.map(s => {
                    return <SpeciesCard id={`species-${s.id}`} key={uuidv4()} species={s} onWishlistRemove={onWishlistRemove} onWishlistCreate={onWishlistCreate} wishlistValues={wishlistValues} showDetails={showDetails} speciesDetails={speciesDetails} />
                })
                ) : (
                        <h2>No results found</h2>
                )
            ) : (
                <h2>No items in wishlist</h2>
            )
            }
        </div>
    );
}

export default ListWishlist;