import { axiosRequest } from "../constant";

const BranchAction = {
  
    list: async(data={}) => {
        const response = await axiosRequest.get('/branch', {
            params: data
        });
        return response.data;
    },
}

export default BranchAction;