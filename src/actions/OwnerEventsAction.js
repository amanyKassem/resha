import axios from "axios";
import CONST from "../consts";


export const getOwnerEvent = (lang , eventType , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'owner-events',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang ,eventType}
        }).then(response => {
            dispatch({type: 'getOwnerEvent', payload: response.data})
        })

    }
};
