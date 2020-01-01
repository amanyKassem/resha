import React, { Component } from "react";
import {Dimensions, Image, Platform,} from "react-native";
import i18n from '../../locale/i18n'
import styles from "../../assets/styles";

const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class Logout extends Component {
    constructor(props){
        super(props);

        this.state={

        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('logout') ,
        drawerIcon: (<Image source={require('../../assets/images/logout_blue.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })

    render() {
        return false
    }
}

export default Logout;
