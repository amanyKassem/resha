import axios from "axios";
import CONST from "../consts";


export const getTicketDetails = (lang , ticket_id ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'ticket-details',
            method: 'POST',
            data: {lang , ticket_id},
            // headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getTicketDetails', payload: response.data})
        })

    }
};
