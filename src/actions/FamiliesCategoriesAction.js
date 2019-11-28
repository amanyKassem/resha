import axios from "axios";
import CONST from "../consts";


export const getFamiliesCategories = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'families-categories',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getFamiliesCategories', payload: response.data})
        })

    }
};
