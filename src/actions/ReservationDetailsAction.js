import axios from "axios";
import CONST from "../consts";


export const getReservationDetails = (lang , ticket_id , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'reservation-details',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang ,ticket_id}
        }).then(response => {
            dispatch({type: 'getReservationDetails', payload: response.data})
        })

    }
};
