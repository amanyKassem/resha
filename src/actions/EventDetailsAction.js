import axios from "axios";
import CONST from "../consts";


export const getEventDetails = (lang , event_id , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'event-details',
            method: 'POST',
            data: {lang , event_id},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getEventDetails', payload: response.data})
        })

    }
};
