import axios from "axios";
import CONST from "../consts";


export const getStopNotification = (lang , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'notification-status',
            method: 'POST',
            data: {lang },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getStopNotification', payload: response.data})
        })

    }
};
