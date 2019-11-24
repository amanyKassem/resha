import axios from "axios";
import CONST from "../consts";


export const getResetPassword = (lang , user_id , password , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'reset-password',
            method: 'POST',
            data: {lang, user_id , password},
        }).then(response => {
            // dispatch({type: 'getResetPassword', payload: response.data})
            props.navigation.navigate('login')
        })

    }
};
