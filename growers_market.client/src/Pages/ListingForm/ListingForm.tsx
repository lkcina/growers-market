import React, { ChangeEvent, FormEvent, MouseEvent, SyntheticEvent, useEffect, useState } from "react";
import { Listing, SpeciesInfo } from "../../types";
import { v4 as uuidv4 } from 'uuid';
import ListingFormImages from "../../Components/ListingFormImages/ListingFormImages";
import { toast } from "react-toastify";
import { getUsedSpecies, createListing, updateListing, getListing, searchSpecies } from "../../api";
import { useBlocker, useNavigate, useParams } from "react-router-dom";
import SearchBar from "../../Components/SearchBar/SearchBar";
import PopupSpeciesList from "../../Components/PopupSpeciesList/PopupSpeciesList";
import FormSpeciesSelect from "../../Components/FormSpeciesSelect/FormSpeciesSelect";
import './ListingForm.css';

interface Props {
}

const ListingForm: React.FC<Props> = (): JSX.Element => {
    const { listingId } = useParams();
    const [listingTitle, setListingTitle] = useState<string>("");
    const [listingIsForTrade, setListingIsForTrade] = useState<boolean>(false);
    const [listingPrice, setListingPrice] = useState<number>(0.00);
    const [listingQuantity, setListingQuantity] = useState<number>(1);
    const [listingSpecies, setListingSpecies] = useState<SpeciesInfo | null>(null);
    const [listingDescription, setListingDescription] = useState<string>("");
    const [listingInputImages, setListingInputImages] = useState<File[]>([]);
    const [listingImageValues, setListingImageValues] = useState<(File | string)[]>([]);
    const [fileInputCount, setFileInputCount] = useState<number>(0);
    const [speciesSelectOptions, setSpeciesSelectOptions] = useState<SpeciesInfo[]>([]);

    const [speciesSearchQuery, setSpeciesSearchQuery] = useState<string>("");
    const [speciesSearchPage, setSpeciesSearchPage] = useState<number>(1);
    const [speciesSearchLastPage, setSpeciesSearchLastPage] = useState<number>(1);
    const [speciesSearchResult, setSpeciesSearchResult] = useState<SpeciesInfo[]>([]);
    const [isSpeciesSearchOpen, setIsSpeciesSearchOpen] = useState<boolean>(false);

    const navigate = useNavigate();
    const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        console.log(listingId);
        getUsedSpecies().then((result) => {
            if (typeof result === "string") {
                setServerError(result);
                return;
            } else if (Array.isArray(result)) {
                console.log(result);
                setSpeciesSelectOptions(result);
            }

            if (listingId !== undefined) {
                getListing(Number(listingId)).then((result) => {
                    if (typeof result === "string") {
                        setServerError(result);
                        return;
                    } else {
                        console.log(result);
                        setListingTitle(result.data.title);
                        setListingIsForTrade(result.data.isForTrade);
                        setListingPrice(result.data.price);
                        setListingQuantity(result.data.quantity);
                        setListingSpecies(result.data.species);
                        setListingDescription(result.data.description);
                        setListingImageValues(result.data.images);
                    }
                })
            }
        })

    }, [listingId])

    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = '';
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        const titleElement = document.getElementById("listing-title") as HTMLTextAreaElement;
        resizeTitleElement(titleElement);
    }, [windowWidth])
    
    const resizeTitleElement = (target: HTMLTextAreaElement) => {
        target.rows = 1;
        const { scrollHeight, clientHeight } = target;
        const lineHeight = windowWidth > 764 ? 50 : windowWidth > 550 ? 40 : 35;
        if (scrollHeight > clientHeight) {
            target.rows += Math.floor((scrollHeight - clientHeight) / lineHeight);
            target.style.overflowY = "hidden";
            if (target.rows > 4) {
                target.rows = 4;
                target.style.overflowY = "auto";
            }
        }
    }

    const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        resizeTitleElement(e.target);
        setListingTitle(e.target.value);
    }

    const handleIsForTradeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setListingIsForTrade(e.target.checked);
    }

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        setListingPrice(Number(e.target.value));
    }

    const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
        setListingQuantity(Number(e.target.value));
    }

    const handleSpeciesChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const speciesId = Number(e.target.value);
        const species = speciesSelectOptions.find(s => s.id === speciesId) || null;
        setListingSpecies(species);
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setListingDescription(e.target.value);
    }

    const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        const updatedInputImages = listingInputImages.concat(Array.from(e.target.files || []));
        setListingInputImages(updatedInputImages);
        const updatedImageValues: (File | string)[] = [...listingImageValues, ...Array.from(e.target.files || [])];
        console.log(updatedImageValues);
        setListingImageValues(updatedImageValues);
    }

    const onListingFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const imagePaths = listingImageValues.filter(image => typeof image === "string")
        const imageUploads = listingImageValues.filter(image => typeof image !== "string");
        if (listingTitle === "") {
            toast.warning("Title is required");
            return;
        } else if (listingImageValues.length > 5) {
            toast.warning("Exceeded maximum of 5 images");
            return;
        } else if (imageUploads.some(file => file.size > 1 * 1024 * 1024)) {
            toast.warning("Image size must be less than 1MB");
            return;
        }

        const form = e.target as HTMLFormElement;
        const data = new FormData(form);
        data.set('IsForTrade', listingIsForTrade.toString());

        const uploadedImages = Array.from(listingInputImages || []).filter(image => listingImageValues.includes(image));
        console.log(uploadedImages);
        data.delete('UploadedImages');

        for (let i = 0; i < uploadedImages.length; i++) {
            data.append('UploadedImages', uploadedImages[i]);
        }

        if (imagePaths.length === 0) {
            data.set('ImagePaths', JSON.stringify([]));
        }

        if (listingSpecies == null) {
            data.delete('SpeciesId');
        }

        console.log(Object.fromEntries(data.entries()));
        if (listingId === undefined) {

            const listingResult = await createListing(data);

            if (typeof listingResult === "string") {
                setServerError(listingResult);
                return;
            } else if (listingResult.status === 201) {
                navigate(`/my-listings/listing/${listingResult.data.id}/info`);
            }
        } else {
            const listingResult = await updateListing(Number(listingId), data);
            if (typeof listingResult === "string") {
                setServerError(listingResult);
                return;
            } else if (listingResult.status === 200) {
                navigate(`/my-listings/listing/${listingId}/info`);
            }
        }
    }

    const onRemoveImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        const button = e.target as HTMLButtonElement;
        const imageIndex = Number(button.parentElement?.id);
        const updatedImageValues = [...listingImageValues];
        updatedImageValues.splice(imageIndex, 1);
        console.log(updatedImageValues);
        setListingImageValues(updatedImageValues);
    }

    const onAddImage = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setFileInputCount(fileInputCount + 1);
    }

    const handleSpeciesSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSpeciesSearchQuery(e.target.value);
    }

    const onSpeciesSearchSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const result = await searchSpecies(1, speciesSearchQuery, null, null, null, null, null, null, null);
        console.log(result);
        if (typeof result === "string") {
            setServerError(result);
            return;
        } else if (Array.isArray(result.data.data)) {
            setSpeciesSearchResult(result.data.data);
            setSpeciesSearchPage(result.data.currentPage);
            setSpeciesSearchLastPage(result.data.lastPage);
        }
    }

    const onSpeciesSearchScroll = async (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLDivElement;
        if (target.scrollHeight - target.scrollTop >= target.clientHeight + 20) {
            return;
        }
        if (speciesSearchPage >= speciesSearchLastPage) {
            return;
        }

        const result = await searchSpecies(speciesSearchPage + 1, speciesSearchQuery, null, null, null, null, null, null, null);
        if (typeof result === "string") {
            setServerError(result);
            return;
        } else if (Array.isArray(result.data.data)) {
            const updatedResult = speciesSearchResult.concat(result.data.data);
            setSpeciesSearchResult(updatedResult);
            setSpeciesSearchPage(speciesSearchPage + 1);
        }
    }

    const onSpeciesSearchSelect = (e: SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.elements.namedItem("speciesId") as HTMLInputElement;
        const speciesId = Number(input.value);
        const updatedSelectOptions = speciesSelectOptions.concat(speciesSearchResult.filter(s => s.id === speciesId));
        setSpeciesSelectOptions(updatedSelectOptions);
        const species = updatedSelectOptions.find(s => s.id === speciesId) || null;
        setListingSpecies(species);
        closeSpeciesSearch();
    }

    const openSpeciesSearch = () => {
        setIsSpeciesSearchOpen(true);
    }

    const closeSpeciesSearch = () => {
        setIsSpeciesSearchOpen(false);
    }


    const onCancel = () => {
        if (window.confirm("Are you sure? All changes will be lost.")) {
            if (listingId !== undefined) {
                navigate(`/my-listings/listing/${listingId}/info`);
            } else {
                navigate("/my-listings");
            }
        }
    }

    return (
        <div id="listing-form-page">
            <form className="listing-form" onSubmit={onListingFormSubmit}>
                <fieldset className="form-header">
                    <textarea id="listing-title" name="Title" required value={listingTitle} onChange={handleTitleChange} placeholder="Enter Title" rows={1} />
                </fieldset>
                <ListingFormImages inputImages={listingInputImages} handleImagesChange={handleImagesChange} imageValues={listingImageValues} onRemoveImage={onRemoveImage} onAddImage={onAddImage} fileInputCount={fileInputCount} />
                <div className="form-container">
                    <div className="form-details">
                        <fieldset>
                            <label htmlFor="listing-is-for-trade">For Trade: </label>
                            <input type="checkbox" id="listing-is-for-trade" name="IsForTrade" checked={listingIsForTrade} onChange={handleIsForTradeChange} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="listing-price">Price: $</label>
                            <input type="number" id="listing-price" name="Price" min="0.00" max="9999.99" value={listingPrice} step="0.01" onChange={handlePriceChange} />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="listing-quantity">Quantity: </label>
                            <input type="number" id="listing-quantity" name="Quantity" min="0" max="999" value={listingQuantity} onChange={handleQuantityChange} />
                        </fieldset>
                        <FormSpeciesSelect speciesValue={listingSpecies} handleSpeciesChange={handleSpeciesChange} speciesSelectOptions={speciesSelectOptions} openSpeciesSearch={openSpeciesSearch} />
                    </div>
                    <fieldset className="description">
                        <label htmlFor="listing-description">Description</label>
                        <textarea id="listing-description" name="Description" value={listingDescription} onChange={handleDescriptionChange} />
                    </fieldset>
                </div>
                
                <fieldset className="submit-cancel">
                    <button className="submit-btn" type="submit">Submit</button>
                    <button className="cancel-btn" type="button" onClick={onCancel} >Cancel</button>
                </fieldset>
            </form>
            {isSpeciesSearchOpen ? (
                <div className="species-search">
                    <div className="species-search-container" onScroll={onSpeciesSearchScroll}>
                        <button className="popup-close-btn" onClick={closeSpeciesSearch}>Close</button>
                        <SearchBar query={speciesSearchQuery} handleQueryChange={handleSpeciesSearchQueryChange} onSearchSubmit={onSpeciesSearchSubmit} />
                        <PopupSpeciesList searchResult={speciesSearchResult} onSelect={onSpeciesSearchSelect} />
                        
                    </div>
                </div>
            ) : (null)}
        </div>
    )
}

export default ListingForm;