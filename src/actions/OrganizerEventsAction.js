import axios from "axios";
import CONST from "../consts";


export const getOrganizerEvents = (lang , status, date , token)=> {
    return (dispatch) => {

        axios({
            url: CONST.url + 'organizer-events',
            method: 'POST',
            data: {lang , status, date},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getOrganizerEvents', payload: response.data})
        })

    }
};

export const getOrganizerRejectedEvents = (lang , date , token)=> {
    return (dispatch) => {

        axios({
            url: CONST.url + 'rejected-events',
            method: 'GET',
            data: {lang , date},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getOrganizerEvents', payload: response.data})
        })

    }
};
