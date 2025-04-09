import { Chat, Listing, Message, SpeciesInfo } from "./types";
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

export const getRandomSpecies = async () => {
    try {
        const data = await axios.get<SpeciesSearchResponse>(`https://localhost:7234/api/species/random`);
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

export const getUserListings = async () => {
    try {
        const data = await axios.get<Listing[]>('https://localhost:7234/api/listing/user');
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

export const getListing = async (id: number) => {
    try {
        const data = await axios.get<Listing>(`https://localhost:7234/api/listing/${id}`);
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
    console.log(form);
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

export const deleteListing = async (id: number) => {
    try {
        const data = await axios.delete(`https://localhost:7234/api/listing/${id}`);
        return data;
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            console.log("error message: ", error.message);
            return error.message;
        } else {
            console.log("unexpected error: ", error);
            return "An unexpected error has occurred";
        }
    }
}


export const getListingChats = async (listingId: number) => {
    try {
        const data = await axios.get<ChatResponse[]>(`https://localhost:7234/api/chat/listing/${listingId}`);
        console.log(data);
        if (typeof data === "string") {
            return data;
        }

        const chatsFormatted = data.data.map((chat) => {
            return formatChat(chat);
        });
        console.log(chatsFormatted);
        return chatsFormatted;
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

interface ListingSearchResponse {
    data: Listing[];
    from: number;
    to: number;
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
}

export const searchListings = async (page: number, query: string, isForTrade: boolean | null, priceMax: number, speciesId: number | null, username: string | null, sort: string | null, radius: number, unit: string, location: string, lat: number | null, lng: number | null) => {
    try {
        console.log(location);
        console.log(lat);
        console.log(lng);
        let url = `https://localhost:7234/api/listing?Radius=${radius}&Unit=${unit}&Location=${location}&Page=${page}&Q=${query}&PriceMax=${priceMax}`;
        if (location === "Current Location") url += `&Latitude=${lat}&Longitude=${lng}`;
        if (isForTrade) url += `&IsForTrade=${isForTrade}`;
        if (speciesId) url += `&SpeciesId=${speciesId}`;
        if (username) url += `&AppUserName=${username}`;
        if (sort) url += `&SortBy=${sort}`;

        const data = await axios.get<ListingSearchResponse>(url);
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

interface ChatResponse {
    id: number;
    listing: Listing;
    appUserName: string;
    messages: MessageResponse[];
}

interface MessageResponse {
    id: number;
    chatId: number;
    appUserName: string;
    content: string;
    createdAt: string;
}

const formatChat = (chat: ChatResponse): Chat => {
    const messages = chat.messages.map((message) => {
        return {
            id: message.id,
            chatId: message.chatId,
            appUsername: message.appUserName,
            content: message.content,
            createdAt: new Date(Date.parse(message.createdAt))
        } as Message;
    });
    return {
        id: chat.id,
        listing: chat.listing,
        appUsername: chat.appUserName,
        messages: messages
    }
}

export const getUserChats = async () => {
    try {
        const data = await axios.get<ChatResponse[]>(`https://localhost:7234/api/chat/user`);
        if (typeof data === "string") {
            return data;
        }

        const chatsFormatted = data.data.map((chat) => {
            return formatChat(chat);
        });
        return chatsFormatted;
        
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

export const createChat = async (listingId: number) => {
    try {
        const data = await axios.post<Chat>(`https://localhost:7234/api/chat/new/${listingId}`);
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

export const deleteChat = async (chatId: number) => {
    try {
        const data = await axios.delete(`https://localhost:7234/api/chat/${chatId}`);
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

export const sendMessage = async (chatId: number, content: string) => {
    try {
        const data = await axios.post(`https://localhost:7234/api/message`, { content, chatId });
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