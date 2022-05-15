import { useAppDispatch } from "../../hooks";
import { setIsLogin } from "../../store/slices/userSlice";
export const Logout = () => {
    const dispatch = useAppDispatch();

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    dispatch(setIsLogin(false));
}