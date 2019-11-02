import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions,  ImageBackground} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;

class FoodPayMethod extends Component {
    constructor(props){
        super(props);

        this.state={
            payType:'visa'
        }
    }

    selectPay(type){
        this.setState({payType:type})
    }

    render() {


        return (
            <Container>
                <Content contentContainerStyle={styles.flexGrow} >
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.langView ]}>

                            <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                            <Text style={[styles.whiteText , styles.normalText , styles.tAC , styles.mb10]}>{ i18n.t('choosePayMethod') }</Text>



                                <TouchableOpacity onPress={() => this.selectPay('visa')} style={[styles.w100 , styles.directionRowAlignCenter , styles.payView , styles.mt15
                                    , {backgroundColor: '#ffffff20',borderColor:this.state.payType === 'visa' ?COLORS.blue : COLORS.gray}]}>
                                    <Image source={ this.state.payType === 'visa' ? require('../../assets/images/credit_card.png') : require('../../assets/images/credit_card_gray.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:15 , color:this.state.payType === 'visa' ?COLORS.blue : COLORS.gray}]}>{ i18n.t('payByVisa') }</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.selectPay('sdad')} style={[styles.w100 , styles.directionRowAlignCenter , styles.payView
                                    , {backgroundColor: '#ffffff20',borderColor:this.state.payType === 'sdad' ?COLORS.blue : COLORS.gray}]}>
                                    <Image source={ this.state.payType === 'sdad' ? require('../../assets/images/sadad_logo_blue.png') : require('../../assets/images/sadad_logo.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:15 , color:this.state.payType === 'sdad' ?COLORS.blue : COLORS.gray}]}>{ i18n.t('payBySadad') }</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.selectPay('mada')} style={[styles.w100 , styles.directionRowAlignCenter , styles.payView
                                    , {backgroundColor: '#ffffff20',borderColor:this.state.payType === 'mada' ?COLORS.blue : COLORS.gray}]}>
                                    <Image source={ this.state.payType === 'mada' ? require('../../assets/images/mada_logo_blue.png') : require('../../assets/images/mada_logo.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:15 , color:this.state.payType === 'mada' ?COLORS.blue : COLORS.gray}]}>{ i18n.t('payByMada') }</Text>
                                </TouchableOpacity>



                            <TouchableOpacity  style={[styles.blueBtn , styles.mt70]}>
                                <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>{ i18n.t('next') }</Text>
                            </TouchableOpacity>

                        </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default FoodPayMethod;