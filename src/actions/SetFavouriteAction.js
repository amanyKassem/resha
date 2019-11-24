import axios from "axios";
import CONST from "../consts";


export const SetFavouriteEvent = (lang , product_id , token ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'favourite',
            method: 'POST',
            data: {lang , product_id},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'SetFavouriteEvent', payload: response.data})
        })

    }
};
