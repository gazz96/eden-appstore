import { axiosRequest } from "../constant";

const TimelineAction = {
  
    list: async(data={}) => {
        const response = await axiosRequest.get('/timelines', {
            params: data
        });
        return response.data;
    }
}

export default TimelineAction;