import { SpeciesInfo } from "../../../types";
import { v4 as uuidv4 } from 'uuid';
import CardWishlist from "../CardWishlist/CardWishlist";
import { SyntheticEvent } from "react";


interface Props {
    wishlistValues: SpeciesInfo[];
    onWishlistRemove: (e: SyntheticEvent) => void;
}

const ListWishlist: React.FC<Props> = ({ wishlistValues, onWishlistRemove }: Props): JSX.Element => {
    return (
        <div>
            {wishlistValues.length > 0 ? (wishlistValues.map(s => {
                return <CardWishlist id={`species-${s.id}`} key={uuidv4()} species={s} onWishlistRemove={onWishlistRemove} />
            })
            ) : (
                <h2>No items in wishlist</h2>
            )
            }
        </div>
    );
}

export default ListWishlist;