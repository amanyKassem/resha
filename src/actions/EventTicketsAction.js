import axios from "axios";
import CONST from "../consts";


export const getEventTickets = (lang , event_id ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'event-tickets',
            method: 'POST',
            data: {lang , event_id}
        }).then(response => {
            dispatch({type: 'getEventTickets', payload: response.data})
        })

    }
};

export const getTicketsImgs = (lang) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'tickets',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getTicketsImgs', payload: response.data})
        })

    }
};
