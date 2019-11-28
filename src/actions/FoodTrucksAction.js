import axios from "axios";
import CONST from "../consts";


export const getFoodTrucks = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'food-trucks',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getFoodTrucks', payload: response.data})
        })

    }
};
