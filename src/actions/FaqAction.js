import axios from "axios";
import CONST from "../consts";


export const getFaq = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'faq',
            method: 'GET',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getFaq', payload: response.data})
        })

    }
};
