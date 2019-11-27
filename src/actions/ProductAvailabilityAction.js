import axios from "axios";
import CONST from "../consts";


export const getProductAvailability = (lang , product_id , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'product-availability',
            method: 'POST',
            data: {lang , product_id },
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getProductAvailability', payload: response.data})
        })

    }
};
