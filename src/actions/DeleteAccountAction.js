import axios from "axios";
import CONST from "../consts";


export const getDeleteAccount = (lang , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'delete-account',
            method: 'GET',
            data: {lang},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getDeleteAccount', payload: response.data})
        })

    }
};
