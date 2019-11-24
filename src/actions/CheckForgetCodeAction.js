import axios from "axios";
import CONST from "../consts";


export const getCheckForgetCode = (lang , user_id , code , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'check-forget-code',
            method: 'POST',
            data: {lang, user_id , code},
        }).then(response => {
            dispatch({type: 'getCheckForgetCode', payload: response.data})
            props.navigation.navigate('confirmPass' , {user_id: user_id})
        })

    }
};
