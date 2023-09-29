import { axiosRequest } from "../constant";

const SettingAction = {
  
    getSetting: async(keyName) => {
        const response = await axiosRequest.get('/settings', {
            params: {
                key_name: keyName
            }
        });
        return response.data;
    }
}

export default SettingAction;