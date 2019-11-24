import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions,  ImageBackground} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getSubscriptions} from "../actions";


const height = Dimensions.get('window').height;

class FoodPayment extends Component {
    constructor(props){
        super(props);

        this.state={
            baqa:'month'
        }
    }

    selectLang(type){
        this.setState({baqa:type})
    }


    componentWillMount() {
        this.props.getSubscriptions( this.props.lang )
    }

    renderLoader(){
        if (this.props.loader == 0){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <DoubleBounce size={20} color={COLORS.mov} />
                </View>
            );
        }
    }

    render() {


        return (
            <Container>
                <Content contentContainerStyle={styles.flexGrow} >
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.langView ]}>

                            <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                            <Text style={[styles.whiteText , styles.normalText , styles.tAC , styles.mb10]}>{ i18n.t('choosePackage') }</Text>
                            <Text style={[styles.whiteText , styles.normalText , styles.tAC , {lineHeight:20}]}>{this.props.desc}</Text>

                            <View style={[styles.directionRowSpace , styles.w100 , styles.mt50]}>

                                <TouchableOpacity onPress={() => this.selectLang('month')} style={[styles.langBorder , {borderColor:this.state.baqa === 'month' ?COLORS.blue : 'transparent' , height:160}]}>
                                    <View style={styles.lang}>
                                        <Image source={require('../../assets/images/calender_month.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                                        <Text style={[styles.whiteText , styles.normalText , styles.tAC , {marginVertical:15}]}>{ this.props.subscriptions[0].name }</Text>
                                        <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>{ this.props.subscriptions[0].price } { i18n.t('RS') }</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.selectLang('year')} style={[styles.langBorder , {borderColor:this.state.baqa === 'year' ?COLORS.blue : 'transparent' , height:160}]}>
                                    <View style={styles.lang}>
                                        <Image source={require('../../assets/images/calender_year.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                                        <Text style={[styles.whiteText , styles.normalText , styles.tAC , {marginVertical:15}]}>{ this.props.subscriptions[1].name }</Text>
                                        <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>{ this.props.subscriptions[1].price } { i18n.t('RS') }</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('foodPayMethod') } style={[styles.blueBtn , styles.mt70]}>
                                <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>{ i18n.t('next') }</Text>
                            </TouchableOpacity>

                        </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , subscriptions }) => {
    return {
        lang: lang.lang,
        subscriptions: subscriptions.subscriptions,
        desc: subscriptions.desc,
        loader: subscriptions.key
    };
};
export default connect(mapStateToProps, {getSubscriptions})(FoodPayment);