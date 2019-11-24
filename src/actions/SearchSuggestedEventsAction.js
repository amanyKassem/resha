import axios from "axios";
import CONST from "../consts";


export const getSearchSuggestedEvents = (lang , token ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'search-suggested-events',
            method: 'POST',
            data: {lang},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getSearchSuggestedEvents', payload: response.data})
        })

    }
};
