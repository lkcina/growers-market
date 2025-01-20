import axios from "axios";
import { toast } from "react-toastify";

export const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
        const err = error.response;
        if (Array.isArray(err?.data.errors)) {
            for (const val of err.data.errors) {
                toast.warning(val.description);
            }
        } else if (typeof err?.data.errors === "object") {
            for (const e in err?.data.errors) {
                toast.warning(err.data.errors[e][0]);
            }
        } else if (err?.data) {
            toast.warning(err.data);
        } else if (err?.status === 401) {
            toast.warning("Login to continue");
            window.history.pushState({}, "LoginPage", "/login");
        } else if (err) {
            toast.warning(err?.data);
        }
    }
}