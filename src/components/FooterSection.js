import React, { Component } from "react";
import {Image, View} from "react-native";
import {  Button, Footer, FooterTab } from 'native-base'
import styles from '../../assets/styles'
import {connect} from "react-redux";

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

        if((tabName == 'reservations' || tabName == 'saves' || tabName == 'profile') && !this.props.user ){
            return(

                <Button transparent onPress={() => this.props.navigation.navigate('login')} >
                    <Image style={styles.footImg} resizeMode={'contain'} source={path}/>
                </Button>
            );
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

const mapStateToProps = ({ lang , profile }) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};
export default connect(mapStateToProps)(FooterSection);
