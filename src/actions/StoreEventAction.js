import axios from "axios";
import CONST from "../consts";


export const getStoreEvent = (lang , ar_name , en_name , date , time , event_hours , address , latitude , longitude , ar_description , en_description ,
                              organization_id , category_id , tickets , images , token) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'store-event',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang , ar_name , en_name , date , time , event_hours , address , latitude:latitude.toString() , longitude:longitude.toString() , ar_description , en_description ,
                organization_id , category_id , tickets , images}
        }).then(response => {
            dispatch({type: 'getStoreEvent', payload: response.data})
        })

    }
};
