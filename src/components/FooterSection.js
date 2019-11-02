import React, { Component } from "react";
import {Image, View, Dimensions, Platform, Text} from "react-native";
import {  Button, Footer, Icon, FooterTab } from 'native-base'
import styles from '../../assets/styles'
import COLORS from "../consts/colors";
import i18n from '../../locale/i18n'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const isIphoneX = Platform.OS === 'ios' && height == 812 || height == 896;

class FooterSection extends Component {
    constructor(props){
        super(props);
    }


    renderFooterTabs(tabName){
        // is Active
        if (this.props.routeName === tabName){
            let activePath = '';
            let activeText = '';

            switch (tabName) {
                case 'home':
                    activePath = require('../../assets/images/home_active_home.png');
                    break;
                case 'reservations':
                    activePath = require('../../assets/images/ticket_active.png');
                    break;
                case 'saves':
                    activePath = require('../../assets/images/notebook_active.png');
                    break;
                case 'profile':
                    activePath = require('../../assets/images/user_active.png');
                    break;
            }

            return(
                <Button transparent>
                    <Image style={styles.footImg} resizeMode={'contain'} source={activePath}/>
                    <View style={styles.activeFoot}/>
                </Button>
            );
        }


        let path = '';
        switch (tabName) {
            case 'home': path = require('../../assets/images/home_icon_white.png');
                break;
            case 'reservations': path = require('../../assets/images/ticket_white.png');
                break;
            case 'saves': path = require('../../assets/images/notebook_wite.png');
                break;
            case 'profile': path = require('../../assets/images/user_non_active.png');
                break;
        }
        return(

            <Button transparent onPress={() => this.props.navigation.navigate(tabName)} >
                <Image style={styles.footImg} resizeMode={'contain'} source={path}/>
            </Button>
        );
    }


    render() {

        return (
            <Footer style={styles.footer}>
                <FooterTab style={styles.footerTab}>

                    {  this.renderFooterTabs('home') }


                    {  this.renderFooterTabs('reservations') }

                    <Button style={styles.footSearch}  onPress={() => this.props.navigation.navigate('search')} >
                        <Image style={[styles.footSearchImg , styles.transform]} resizeMode={'contain'} source={ require('../../assets/images/search_floting.png')}/>
                    </Button>

                    {  this.renderFooterTabs('saves') }


                    {  this.renderFooterTabs('profile') }

                </FooterTab>
            </Footer>
        );
    }
}


export default FooterSection;