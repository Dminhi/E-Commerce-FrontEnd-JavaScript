import { formDataAxios, jsonAxios } from "..";

export const CHECKOUT = async(formCheckout) => {
    try {
        const response = await jsonAxios.post("/api.myservice.com/v1/user/cart/checkout", formCheckout)
        notify("success", response.data.message)
        return response;
    } catch (error) {
        notify("error", error.response.data.error.details)
    }
}