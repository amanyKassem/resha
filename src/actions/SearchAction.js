import axios from "axios";
import CONST from "../consts";


export const getSearchResult = (lang , keyword ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'search-events',
            method: 'POST',
            data: {lang , keyword}
        }).then(response => {
            dispatch({type: 'getSearchResult', payload: response.data})
        })

    }
};
