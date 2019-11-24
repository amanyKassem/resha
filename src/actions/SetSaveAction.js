import axios from "axios";
import CONST from "../consts";


export const setSaveEvent = (lang , event_id , token ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'favourite-event',
            method: 'POST',
            data: {lang , event_id},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'setSaveEvent', payload: response.data})
        })

    }
};
