import { axiosRequest } from "../constant";

const ProductAction = {
  
    list: async(data={}) => {
        const response = await axiosRequest.get('/products', {
            params: data
        });
        return response.data;
    },
    row: async(id) => {
        const response = await axiosRequest.get('/product/' + id);
        return response.data;
    },
    create: async(data) => {
        const response = await axiosRequest.post('product', data);
        console.log('response', response.data)
        return response.data;
    },
    order: async(data) => {
        const response = await axiosRequest.post('order', data);
        return response.data;
    },
    addToFavorite: async(data) => {
        const response = await axiosRequest.post('favorite', data);
        return response.data;
    },
    favorites: async(data) => {
        const response = await axiosRequest.get('favorites', {
            params: data
        })
        return response.data;
    },
    removeFavorite: async(data) => {
        const response = await axiosRequest.post('favorite/delete', data);
        return response.data;
    },
    addWaitingToFavorite: async(data) => {
        const response = await axiosRequest.post('favorite-waiting', data);
        return response.data;
    },

}

export default ProductAction;