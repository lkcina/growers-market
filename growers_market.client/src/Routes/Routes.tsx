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
import IsAuthenticatedRoute from "./IsAuthenticatedRoute";
import ListingForm from "../Pages/ListingForm/ListingForm";
import UserListing from "../Pages/UserListing/UserListing";
import AllUserListings from "../Pages/AllUserListings/AllUserListings";
import UserListingInfo from "../Pages/UserListingInfo/UserListingInfo";
import OwnedListingRoute from "./OwnedListingRoute";

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
                        index: true,
                        element: <BrowseMarketPage />
                    },
                    {
                        path: "saved",
                        element: <IsAuthenticatedRoute><ChatsPage /></IsAuthenticatedRoute>
                    }
                ]
            },
            {
                path: "my-listings",
                element: <IsAuthenticatedRoute><UserListingsPage /></IsAuthenticatedRoute>,
                children: [
                    {
                        index: true,
                        element: <AllUserListings />
                    },
                    {
                        path: "listing/:listingId",
                        element: <OwnedListingRoute><UserListing /></OwnedListingRoute>,
                        children: [
                            {
                                index: true,
                                element: <UserListingInfo />
                            },
                            {
                                path: "edit",
                                element: <ListingForm />
                            }
                        ]
                    },
                    {
                        path: "new",
                        element: <ListingForm />
                    }
                ]
            },
            {
                path: "my-wishlist",
                element: <IsAuthenticatedRoute><WishlistPage /></IsAuthenticatedRoute>
            },
            {
                path: "plant-search",
                element: <PlantSearchPage />
            }
        ]
    }
])