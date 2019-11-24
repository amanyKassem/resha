import axios from "axios";
import CONST from "../consts";


export const getPopularEvents = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'popular-events',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getPopularEvents', payload: response.data})
        })

    }
};
