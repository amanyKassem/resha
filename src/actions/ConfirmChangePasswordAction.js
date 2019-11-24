import axios from "axios";
import CONST from "../consts";


export const getConfirmChangePassword = (lang , new_password , code , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'confirm-change-password',
            method: 'POST',
            data: {lang, new_password , code},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getConfirmChangePassword', payload: response.data})
        })

    }
};
