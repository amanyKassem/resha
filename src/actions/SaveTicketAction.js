import axios from "axios";
import CONST from "../consts";


export const getSaveTicket = (lang , event_id , tickets_type , tickets_count, token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'confirm-ticket',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang ,event_id , tickets_type , tickets_count}
        }).then(response => {
            dispatch({type: 'getSaveTicket', payload: response.data})
        })

    }
};
