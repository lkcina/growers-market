import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "https://localhost:7234/api/";


export const loginApi = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(`${api}account/login`, { username: username, password: password });
        return data;
    } catch (error) {
        console.log(error);
        handleError(error);
    }
}

export const registerApi = async (email: string, username: string, password: string, streetAddressLine1: string, streetAddressLine2: string, city: string, state: string, postalCode: string) => {
    console.log("registerApi");
    console.log(email, username, password, streetAddressLine1, streetAddressLine2, city, state, postalCode);
    try {
        const data = await axios.post<UserProfileToken>(`${api}account/register`, { username: username, email: email, password: password, streetAddressLine1: streetAddressLine1, streetAddressLine2: streetAddressLine2, city: city, state: state, postalCode: postalCode });
        return data;
    } catch (error) {
        handleError(error);
    }
}