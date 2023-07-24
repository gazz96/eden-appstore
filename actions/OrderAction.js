import { axiosRequest } from "../constant";

const OrderAction = {
    getItem: async(options={}) => {
        const response = await axiosRequest.get('user/order', {
            params: options
        })
        return response.data;
    },
    getTimeline: async(order_id) => {
        try {
            const response = await axiosRequest.get('user/order/timelines', {
                params: {
                    order_id: order_id
                }
            })
            return response.data;
        }
        catch(error)
        {
            return false;
        }
    },
    addReview: async(data) => {
        const response = await axiosRequest.post('property/review', data);
        return response.data;
    },
    timelines: async(data={}) => {
        const response = await axiosRequest.get('order/timeline', {
            params: data
        });
        return response.data;
    },
    timelineAttachments: async(data={}) => {
        const response = await axiosRequest.get('order/timeline/files', {
            params: data
        });
        return response.data;
    },
    addTimelineAttachment: async(data={}) => {
        const response = await axiosRequest.post('order/timeline/files', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },
    deleteTimelineAttachment: async(data={}) => {
        const response = await axiosRequest.post('order/timeline/files/delete', data);
        return response.data;
    }
}

export default OrderAction;