import { Listing, SpeciesInfo } from "./types";
import axios from 'axios';

interface SpeciesSearchResponse {
    data: SpeciesInfo[];
    from: number;
    to: number;
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
}

export const searchSpecies = async (page: number, query: string, cycle: string | null, watering: string | null, sunlight: string | null, hardiness: number | null, indoor: boolean | null, edible: boolean | null, poisonous: boolean | null) => {
    try {
        let url = `https://localhost:7234/api/species?Page=${page}&Q=${query}`;
        if (cycle) url += `&Cycle=${cycle}`;
        if (watering) url += `&Watering=${watering}`;
        if (sunlight) url += `&Sunlight=${sunlight}`;
        if (hardiness) url += `&Hardiness=${hardiness}`;
        if (indoor !== null) url += `&Indoor=${indoor}`;
        if (edible !== null) url += `&Edible=${edible}`;
        if (poisonous !== null) url += `&Poisonous=${poisonous}`;

        const data = await axios.get<SpeciesSearchResponse>(url);
        console.log(data);
        return data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {

            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error)
            return "An unexpected error has occurred"
        }
    }
}

export const getSpeciesDetails = async (id: number) => {
    try {
        const data = await axios.get<SpeciesInfo>(`https://localhost:7234/api/species/${id}`);
        return data.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {

            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error)
            return "An unexpected error has occurred"
        }
    }
}

export const getUsedSpecies = async () => {
    try {
        const data = await axios.get<SpeciesInfo[]>(`https://localhost:7234/api/species/used`);
        return data.data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {

            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error)
            return "An unexpected error has occurred"
        }
    }
}

interface GetWishlistResponse {
    data: SpeciesInfo[];
}

export const getWishlist = async () => {
    try {
        const data = await axios.get<GetWishlistResponse>('https://localhost:7234/api/wishlist');
        return data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {

            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error)
            return "An unexpected error has occurred"
        }
    }
}

export const postWishlist = async (id: number) => {
    try {
        const data = await axios.post(`https://localhost:7234/api/wishlist/${id}`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {

            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error)
            return "An unexpected error has occurred"
        }
    }
}

export const deleteWishlist = async (id: number) => {
    try {
        const data = await axios.delete(`https://localhost:7234/api/wishlist/${id}`);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {

            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error)
            return "An unexpected error has occurred"
        }
    }
}

export const createListing = async (form: FormData) => {
    try {
        const data = await axios.post<Listing>('https://localhost:7234/api/listing', form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error has occurred";
        }
    }
}

export const updateListing = async (id: number, form: FormData) => {
    try {
        const data = await axios.put<Listing>(`https://localhost:7234/api/listing/${id}`, form, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error has occurred";
        }
    }
}