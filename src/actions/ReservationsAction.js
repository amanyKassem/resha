import axios from "axios";
import CONST from "../consts";


export const getReservations = (lang , token)=> {
    return (dispatch) => {

        axios({
            url: CONST.url + 'reservations',
            method: 'GET',
            data: {lang},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getReservations', payload: response.data})
        })

    }
};
