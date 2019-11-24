import axios from "axios";
import CONST from "../consts";


export const getSendForgetCode = (lang , email_or_mobile , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'send-forget-code',
            method: 'POST',
            data: {lang, email_or_mobile},
        }).then(response => {
            dispatch({type: 'getSendForgetCode', payload: response.data})
            props.navigation.navigate('verifyCode' , {user_id: response.data.data.user_id ,code: response.data.data.code })
        })

    }
};
