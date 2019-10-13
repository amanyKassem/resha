import React, { Component } from "react";
import { Image} from "react-native";
import i18n from '../../locale/i18n'
import styles from "../../assets/styles";


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