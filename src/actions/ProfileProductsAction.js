import axios from "axios";
import CONST from "../consts";


export const getProfileProducts = (lang , user_id ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'profile-products',
            method: 'POST',
            data: {lang , user_id}
        }).then(response => {
            dispatch({type: 'getProfileProducts', payload: response.data})
        })

    }
};
