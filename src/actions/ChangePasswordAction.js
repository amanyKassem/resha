import axios from "axios";
import CONST from "../consts";


export const getChangePassword = (lang , old_password , new_password , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'change-password',
            method: 'POST',
            data: {lang, old_password , new_password},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getChangePassword', payload: response.data})
        })

    }
};
