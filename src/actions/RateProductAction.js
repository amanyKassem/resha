import axios from "axios";
import CONST from "../consts";


export const getRateProduct = (lang , product_id , rate , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'rate-product',
            method: 'POST',
            data: {lang , product_id , rate},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getRateProduct', payload: response.data})
        })

    }
};
