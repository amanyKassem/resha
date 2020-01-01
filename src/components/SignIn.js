import React, { Component } from "react";
import {Dimensions, I18nManager, Image, Platform } from "react-native";
import i18n from '../../locale/i18n'
import styles from "../../assets/styles";

const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

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
