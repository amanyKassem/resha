import axios from "axios";
import CONST from "../consts";



export const getNotifications = (lang , token) => {
    return (dispatch) => {
        notifications(lang, token, dispatch)
    }
};

export const getDeleteNotification = (lang , notification_id, token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'delete-notification',
            method: 'POST',
            data: {lang , notification_id},
            headers: {Authorization: token}
        }).then(response => {
            notifications(lang , token , dispatch)
        })

    }
};

const notifications = (lang , token , dispatch ) => {
    axios({
        url: CONST.url + 'notifications',
        method: 'POST',
        data: {lang},
        headers: {Authorization: token}
    }).then(response => {
        dispatch({type: 'getNotifications', payload: response.data})
    })
};
