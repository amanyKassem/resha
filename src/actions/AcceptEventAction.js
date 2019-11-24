import axios from "axios";
import CONST from "../consts";


export const getAcceptEvent = (lang , event_id , token , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'accept-event',
            method: 'POST',
            data: {lang , event_id},
            headers: {Authorization: token}
        }).then(response => {
            props.navigation.navigate('myOrders')
        })

    }
};


export const getRejectEvent = (lang , event_id , token , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'reject-event',
            method: 'POST',
            data: {lang , event_id},
            headers: {Authorization: token}
        }).then(response => {
            props.navigation.navigate('myOrders')
        })

    }
};

export const deleteOrganizerEvent = (lang , event_id , token , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'delete-organizer-event',
            method: 'POST',
            data: {lang , event_id},
            headers: {Authorization: token}
        }).then(response => {
            props.navigation.navigate('myOrders')
        })

    }
};
