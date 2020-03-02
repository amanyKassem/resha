import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";
import {Toast} from "native-base";


export const getNotificationCount = (lang , token, props ) => {
    return (dispatch) => {

        axios({
            url: CONST.url + 'NotificationCount',
            method: 'POST',
            data: {lang},
            headers: {Authorization: token}
        }).then(response => {
            dispatch({type: 'getNotificationCount', payload: response.data})
            if(response.data.data.ban){
                // alert(response.data.data.ban)
                logout(token , props , dispatch)
                Toast.show({
                    text: i18n.t('notAllowed'),
                    type: "danger",
                    duration: 3000
                });
            }
        })

    }
};

 const logout = (token , props , dispatch) => {
    // return (dispatch) => {
        axios({
            url: CONST.url + 'logout',
            method: 'GET',
            headers: {Authorization: token },
        }).then(response => {
                AsyncStorage.multiRemove(['token', 'auth', 'profile'])
                dispatch({type: 'logout'})
                props.navigation.navigate('login')
            }
        )
    // }
}

