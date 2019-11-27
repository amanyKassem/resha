import axios from "axios";
import CONST from "../consts";


export const getTypeCategories = (lang , type) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'type-categories',
            method: 'POST',
            data: {lang , type}
        }).then(response => {
            dispatch({type: 'getTypeCategories', payload: response.data})
        })

    }
};
