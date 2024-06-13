import { jsonAxios } from ".."
import { notify } from "../../../utils/notification";
import { useNavigate } from "react-router-dom";

export const AUTH_LOGIN = async(formLogin) => {
    try {
        const response = await jsonAxios.post("/api.example.com/v1/auth/sign-in", formLogin)
        notify("success", response.data.message)
        return response;
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}

export const AUTH_REGISTER = async(formRegister) => {
    try {
        const response = await jsonAxios.post("http://localhost:8080/api.example.com/v1/auth/sign-up", formRegister)
        notify("success", response.data.message)
        return response;
    } catch (error) {
        notify("error", error.response.data.error.details)
    }

}