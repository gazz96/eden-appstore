import { axiosRequest } from "../constant";

const CartAction = {
    list: async(options={}) => {
        const response = await axiosRequest.get('carts', {
            params: options
        })
        return response.data;
    },
    add: async(data) => {
        const response = await axiosRequest.post('carts', data);
        return response.data;
    },
    remove: async(data) => {
        const response = await axiosRequest.post('carts/delete', data);
        return response.data;
    },
    clear: async(data) => {
        const response = await axiosRequest.post('carts/clear', data);
        return response.data;
    },
    removeItem: async() => {
        const response = await axiosRequest.post('carts/delete-item', data);
        return response.data;
    }
}

export default CartAction;