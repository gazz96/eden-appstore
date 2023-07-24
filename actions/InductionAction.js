import { API_URL, axiosRequest } from "../constant"


const InductionAction = {
    get: async(params={}) => {
        
        let paramsFormat = new URLSearchParams(params);
        let url = API_URL + '/inductions';
        if(paramsFormat) {
            url += '?' + paramsFormat.toString();
        }
        const response = await fetch(url);
        const json = await response.json();
        return json;
    },
    item: async(id) => {
        let paramsFormat = new URLSearchParams({
            id: id
        });
        let url = API_URL + '/induction-item';
        if(paramsFormat) {
            url += '?' + paramsFormat.toString();
        }
        const response = await fetch(url);
        const json = await response.json();
        return json;
    },
    items: async(induction_id) => {
        let paramsFormat = new URLSearchParams({
            induction_id: induction_id
        });
        let url = API_URL + '/induction-items';
        if(paramsFormat) {
            url += '?' + paramsFormat.toString();
        }
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }

}

export default InductionAction;