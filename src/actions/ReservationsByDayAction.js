import axios from "axios";
import CONST from "../consts";


export const getReservationsByDay = (lang , date , token)=> {
    return (dispatch) => {

        axios({
            url: CONST.url + 'reservations-by-day',
            method: 'POST',
            data: {lang , date},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getReservations', payload: response.data})
        })

    }
};
