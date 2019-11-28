import axios from "axios";
import CONST from "../consts";


export const getShowProfile = (lang , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'show-profile',
            method: 'POST',
            data: {lang},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getShowProfile', payload: response.data})
        })

    }
};
