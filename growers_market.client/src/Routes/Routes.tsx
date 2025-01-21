import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import MarketPage from "../Pages/MarketPage/MarketPage";
import PlantSearchPage from "../Pages/PlantSearchPage/PlantSearchPage";
import BrowseMarketPage from "../Pages/BrowseMarketPage/BrowseMarketPage";
import ChatsPage from "../Pages/ChatsPage/ChatsPage";
import UserListingsPage from "../Pages/UserListingsPage/UserListingsPage";
import WishlistPage from "../Pages/WishlistPage/WishlistPage";
import UserListingChatsList from "../Components/UserListing/UserListingChatsList/UserListingChatsList";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {
                path: "login",
                element: <LoginPage />
            },
            {
                path: "register",
                element: <RegisterPage />
            },
            {
                path: "market",
                element: <MarketPage />,
                children: [
                    {
                        path: "browse",
                        element: <BrowseMarketPage />
                    },
                    {
                        path: "chats",
                        element: <ProtectedRoute><ChatsPage /></ProtectedRoute>
                    },
                    {
                        path: "my-listings",
                        element: <ProtectedRoute><UserListingsPage /></ProtectedRoute>,
                        children: [
                            {
                                path: "listing/:id",
                                element: <UserListingChatsList />
                            }
                        ]
                    },
                    {
                        path: "my-wishlist",
                        element: <ProtectedRoute><WishlistPage /></ProtectedRoute>
                    }
                ]
            },
            {
                path: "plant-search",
                element: <PlantSearchPage />
            }
        ]
    }
])