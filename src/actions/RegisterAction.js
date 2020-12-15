import axios from "axios";
import CONST from "../consts";
import {AsyncStorage} from "react-native";
import {Toast} from "native-base";


export const register = (data, props) => {
    return (dispatch) => {

            axios({
                url: CONST.url + 'register',
                method: 'POST',
                data: {
                    lang        : data.lang,
                    user_type   : data.userType,
                    latitude    : data.mapRegion ?  data.mapRegion.latitude : null,
                    longitude   : data.mapRegion ? data.mapRegion.longitude : null,
                    name        : data.username,
                    mobile      : data.phone,
                    email       : data.mail,
                    password    : data.password,
                    address     : data.city,
                }
            }).then(response => {
                dispatch({type: 'register', payload: response.data});
                if (response.data.key == 1){
                    props.navigation.navigate('activationCode', {mobile: data.phone , password: data.password, type: data.userType})
                }

                Toast.show({
                    text: response.data.msg,
                    type: response.data.key == 1 ? "success" : "danger",
                    duration: 3000
                });
            })

    }
};
