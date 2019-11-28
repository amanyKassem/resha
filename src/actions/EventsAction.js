import axios from "axios";
import CONST from "../consts";


export const getEvents = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'events',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getEvents', payload: response.data})
        })

    }
};
