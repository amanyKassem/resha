import axios from "axios";
import CONST from "../consts";


export const getSendActivationCode = (lang , mobile) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'send-activation-code',
            method: 'POST',
            data: {lang, mobile},
        }).then(response => {
            dispatch({type: 'getSendActivationCode', payload: response.data})
        })

    }
};
