import axios from "axios";
import CONST from "../consts";


export const getRestaurants = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'restaurants',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getRestaurants', payload: response.data})
        })

    }
};
