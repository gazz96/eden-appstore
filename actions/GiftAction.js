import { axiosRequest } from "../constant";

const GiftAction = {
  
    list: async(data={}) => {
        const response = await axiosRequest.get('/gifts', {
            params: data
        });
        return response.data;
    },
    row: async(id) => {
        const response = await axiosRequest.get('/gift/' + id);
        return response.data;
    },
    create: async(data) => {
        const response = await axiosRequest.post('gift', data);
        console.log('response', response.data)
        return response.data;
    },
    redeem: async(data) => {
        const response = await axiosRequest.post('redeem', data);
        return response.data;
    }
}

export default GiftAction;