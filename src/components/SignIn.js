import React, { Component } from "react";
import {I18nManager, Image} from "react-native";
import i18n from '../../locale/i18n'
import styles from "../../assets/styles";


class SignIn extends Component {
    constructor(props){
        super(props);

        this.state={

        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('login') ,
        drawerIcon: (<Image source={require('../../assets/images/logout_blue.png')} style={[styles.drawerImg, {transform: I18nManager.isRTL ? [{rotateY : '-180deg'}] : [{rotateY : '0deg'}]} ]} resizeMode={'contain'} /> )
    })

    render() {
        return false
    }
}

export default SignIn;