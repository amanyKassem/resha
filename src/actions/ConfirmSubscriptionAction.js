import axios from "axios";
import CONST from "../consts";


export const getConfirmSub = (lang , user_id , subscription_id , props) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'confirm-subscription',
            method: 'POST',
            data: {lang ,user_id , subscription_id },
            // headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getConfirmSub', payload: response.data})
            if (response.data.key == 1){
                props.navigation.navigate('drawerNavigator');
            }
        })

    }
};
