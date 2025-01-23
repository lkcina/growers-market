import React, { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginApi, registerApi } from "../Services/AuthService";
import axios from "axios";
import { getWishlist } from "../api";
import { SpeciesInfo } from "../types";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logoutUser: () => void;
    isLoggedIn: () => boolean;
};

type Props = {
    children: React.ReactNode
}

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const user = sessionStorage.getItem("user");
        const token = sessionStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            setUser(null);
            setToken(null);
        }
        setIsReady(true);
    }, [])

    const registerUser = async (email: string, username: string, password: string) => {
        await registerApi(username, email, password).then((response) => {
            if (response) {
                sessionStorage.setItem("token", response?.data.token);
                const userObj = { userName: response?.data.userName, email: response?.data.email };
                sessionStorage.setItem("user", JSON.stringify(userObj));
                setUser(response?.data);
                setToken(response?.data.token);
                toast.success("Registration successful");
                navigate("/");
            }
        }).catch((error) => toast.warning("Server error occured"));
    }

    const loginUser = async (username: string, password: string) => {
        await loginApi(username, password).then((response) => {
            if (response) {
                sessionStorage.setItem("token", response?.data.token);
                const userObj = { userName: response?.data.userName, email: response?.data.email };
                sessionStorage.setItem("user", JSON.stringify(userObj));
                setUser(response?.data);
                setToken(response?.data.token);
                navigate("/");
                window.location.reload();
                toast.success("Login successful");
            }
        }).catch((error) => toast.warning("Server error occured"));
    };

    const isLoggedIn = () => {
        return !!user;
    };

    const logoutUser = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("user");
        setUser(null);
        setToken(null);
        navigate("/");
    };

    return (
        <UserContext.Provider value={{ user, token, registerUser, loginUser, logoutUser, isLoggedIn }}>
            {isReady ? children : null}
        </UserContext.Provider>
    );
};

export const useAuth = () => React.useContext(UserContext);

