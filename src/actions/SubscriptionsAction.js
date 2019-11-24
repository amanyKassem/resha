import axios from "axios";
import CONST from "../consts";


export const getSubscriptions = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'subscriptions',
            method: 'GET',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getSubscriptions', payload: response.data})
        })

    }
};
