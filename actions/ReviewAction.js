import { axiosRequest } from "../constant";

const ReviewAction = {
  
    timelines: async(data={}) => {
        const response = await axiosRequest.get('order/timeline', {
            params: data
        });
        return response.data;
    },

    create: async(data) => {
        const response = await axiosRequest.post('review', data);
        console.log('response', response.data)
        return response.data;
    }
}

export default ReviewAction;