import { axiosRequest } from "../constant";

const ReservationAction = {

    create: async(data) => {
        const response = await axiosRequest.post('reservation', data);
        console.log('ReservationAction.create', response);
        return response.data;
    }
}

export default ReservationAction;