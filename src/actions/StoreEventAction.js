import axios from "axios";
import CONST from "../consts";


export const getStoreEvent = (lang , ar_name , en_name , date , time , event_hours , address , latitude , longitude , ar_description , en_description ,
                              organization_id , category_id , tickets , images , token, props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'store-event',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang , ar_name , en_name , date , time , event_hours , address , latitude:latitude ? latitude.toString() : null , longitude:longitude ? longitude.toString() : null , ar_description , en_description ,
                organization_id , category_id , tickets , images}
        }).then(response => {
            dispatch({type: 'getStoreEvent', payload: response.data})

            if (response.data.key){
                props.navigation.navigate('showTicket', {eventType: response.data.data.eventType , event_id : response.data.data.event_id})
            }
        })

    }
};
