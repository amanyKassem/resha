import axios from "axios";
import CONST from "../consts";


export const getOwnerEventsDetails = (lang , event_id , token ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'owner-event-details',
            method: 'POST',
            data: {lang , event_id},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getOwnerEventsDetails', payload: response.data})
        })

    }
};
