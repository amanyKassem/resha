import axios from "axios";
import CONST from "../consts";


export const getProfileDetails = (lang , user_id , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'profile-details',
            method: 'POST',
            data: {lang , user_id},
            headers: token ? {Authorization: token} : null,
        }).then(response => {
            dispatch({type: 'getProfileDetails', payload: response.data})
        })

    }
};