import axios from "axios";
import CONST from "../consts";


export const getShowProduct = (lang , product_id , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'show-product',
            method: 'POST',
            data: {lang , product_id},
            headers: token ? {Authorization: token} : null
        }).then(response => {
            dispatch({type: 'getShowProduct', payload: response.data})
        })

    }
};
