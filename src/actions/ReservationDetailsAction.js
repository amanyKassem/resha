import axios from "axios";
import CONST from "../consts";


export const getReservationDetails = (lang , ticket_id , token , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'reservation-details',
            method: 'POST',
            headers: {Authorization: token},
            data: {lang ,ticket_id}
        }).then(response => {
            dispatch({type: 'getReservationDetails', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('showTicketQr', {
                    ticketsInfo : response.data.data,
                })
            }

        })

    }
};
