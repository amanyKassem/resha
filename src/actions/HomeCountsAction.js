import axios from "axios";
import CONST from "../consts";


export const getHomeCounts = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'users-types-counts',
            method: 'GET',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getHomeCounts', payload: response.data})
        })

    }
};
