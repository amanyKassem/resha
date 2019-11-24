import axios from "axios";
import CONST from "../consts";


export const getCancelEvent = (lang , event_id , token ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'cancel-event',
            method: 'POST',
            data: {lang , event_id},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getCancelEvent', payload: response.data})
        })

    }
};
