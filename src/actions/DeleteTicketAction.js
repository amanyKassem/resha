import axios from "axios";
import CONST from "../consts";


export const getDeleteTicket = (lang , ticket_id , token , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'delete-ticket',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang ,ticket_id}
        }).then(response => {
            dispatch({type: 'getDeleteTicket', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('reservations')
            }
        })

    }
};
