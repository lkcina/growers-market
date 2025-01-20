import { SpeciesInfo } from "./types";
import axios from 'axios';

interface SpeciesSearchResponse {
    data: SpeciesInfo[];
}

export const searchSpecies = async (query: string) => {
    try {

        const data = await axios.get<SpeciesSearchResponse>(`https://localhost:7234/api/species?Q=${query}`);
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