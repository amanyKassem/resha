import axios from "axios";
import CONST from "../consts";


export const getProductPrices = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'products-prices',
            method: 'GET',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getProductPrices', payload: response.data})
        })

    }
};
