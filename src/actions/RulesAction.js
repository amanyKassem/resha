import axios from "axios";
import CONST from "../consts";


export const getRules = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'rules',
            method: 'GET',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getRules', payload: response.data})
        })

    }
};
