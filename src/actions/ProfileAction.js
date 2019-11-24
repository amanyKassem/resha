import axios from 'axios';
import CONST from '../consts'
import {Toast} from "native-base";
import {AsyncStorage} from "react-native";


export const profile = (token) => {
    return (dispatch) => {
        axios({
            method: 'POST',
            url: CONST.url + 'user-data',
            headers: {Authorization: token}
        }).then(response => {
            const data = response.data.data;
            dispatch({type: 'profile_data', data})
        })
    }
}


export const updateProfile = (data) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'update-user',
            method: 'POST',
            headers: {Authorization: data.token },
            data: {
                name: data.name,
                mobile: data.phone,
                avatar: data.image,
                email: data.email,
                lang: data.lang,
            }}).then(response => {
            if (response.data.key == 1) {
                const data = response.data.data;
                dispatch({type: 'update_profile', data})
            }
            Toast.show({
                text: response.data.msg,
                type: response.data.key == 1 ? "success" : "danger",
                duration: 3000
            });
        }).catch(() => {
            Toast.show({
                text: 'لم يتم التعديل بعد , الرجاء المحاوله مره اخري',
                type: "danger",
                duration: 3000
            });
        })
    }
}

export const logout = (data) => {
    return (dispatch) => {
        axios({
            url: CONST.url + 'logout',
            method: 'GET',
            headers: {Authorization: data.token },
        }).then(response => {
                AsyncStorage.multiRemove(['token', 'auth', 'profile'])
                dispatch({type: 'logout'})
            }
        )
    }
}

