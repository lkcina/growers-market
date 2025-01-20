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

export const registerApi = async (username: string, email: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(`${api}account/register`, { username, email, password });
        return data;
    } catch (error) {
        handleError(error);
    }
}