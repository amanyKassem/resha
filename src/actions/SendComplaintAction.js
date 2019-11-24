import axios from "axios";
import CONST from "../consts";


export const getSendComplaint = (lang , subject , complaint , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'send-complaint',
            method: 'POST',
            data: {lang, subject , complaint},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getSendComplaint', payload: response.data})
        })

    }
};
