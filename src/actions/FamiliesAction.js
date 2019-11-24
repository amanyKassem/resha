import axios from "axios";
import CONST from "../consts";


export const getFamilies = (lang , category_id ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'families',
            method: 'POST',
            data: {lang , category_id}
        }).then(response => {
            dispatch({type: 'getFamilies', payload: response.data})
        })

    }
};
