import axios from "axios";
import CONST from "../consts";


export const getEventsPrices = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'events-prices',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getEventsPrices', payload: response.data})
        })

    }
};
