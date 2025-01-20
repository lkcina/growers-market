import { SpeciesInfo } from "../../../types";
import { v4 as uuidv4 } from 'uuid';
import CardWishlist from "../CardWishlist/CardWishlist";
import { SyntheticEvent } from "react";
import SpeciesCard from "../../SpeciesCard/SpeciesCard";


interface Props {
    wishlistValues: SpeciesInfo[];
    onWishlistRemove: (e: SyntheticEvent) => void;
    onWishlistCreate: (e: SyntheticEvent) => void;
}

const ListWishlist: React.FC<Props> = ({ wishlistValues, onWishlistRemove, onWishlistCreate }: Props): JSX.Element => {
    return (
        <div>
            {wishlistValues.length > 0 ? (wishlistValues.map(s => {
                return <SpeciesCard id={`species-${s.id}`} key={uuidv4()} species={s} onWishlistRemove={onWishlistRemove} onWishlistCreate={onWishlistCreate} wishlistValues={wishlistValues} />
            })
            ) : (
                <h2>No items in wishlist</h2>
            )
            }
        </div>
    );
}

export default ListWishlist;