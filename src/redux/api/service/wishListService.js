import { jsonAxios } from "..";
import { notify } from "../../../utils/notification";

export const TOGGLE_WISHLIST = async(id) => {
    try {

        const user = JSON.parse(localStorage.getItem("userAccount"));
        const accessToken = user.accessToken;
        const wishListIndex = user.wishList.indexOf(id);
        const response = await jsonAxios.post(`/api.myservice.com/v1/user/wish-list`, { productId: id }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });


        if (wishListIndex !== -1) {
            user.wishList.splice(wishListIndex, 1);
            notify("success", "Item removed from wishlist");
        } else {
            user.wishList.push(id);
            notify("success", "Item added to wishlist");
        }

        localStorage.setItem("userAccount", JSON.stringify(user));

        return response;
    } catch (error) {
        notify("error", error.response ? error.response.data.error.details : "An error occurred");
    }

}

export const WISHLIST = async() => {
    try {
        const user = JSON.parse(localStorage.getItem("userAccount")) || {};
        const accessToken = user.accessToken;
        const response = await jsonAxios.get(`/api.myservice.com/v1/user/wish-list`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data.data.content
    } catch (error) {}
}