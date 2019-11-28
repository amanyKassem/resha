import axios from "axios";
import CONST from "../consts";


export const getEventCategories = lang => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'event-categories',
            method: 'POST',
            data: {lang}
        }).then(response => {
            dispatch({type: 'getEventCategories', payload: response.data})
        })

    }
};
