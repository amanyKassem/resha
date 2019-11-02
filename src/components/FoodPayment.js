import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions,  ImageBackground} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


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

    render() {


        return (
            <Container>
                <Content contentContainerStyle={styles.flexGrow} >
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.langView ]}>

                            <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                            <Text style={[styles.whiteText , styles.normalText , styles.tAC , styles.mb10]}>{ i18n.t('choosePackage') }</Text>
                            <Text style={[styles.whiteText , styles.normalText , styles.tAC , {lineHeight:20}]}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى</Text>

                            <View style={[styles.directionRowSpace , styles.w100 , styles.mt50]}>

                                <TouchableOpacity onPress={() => this.selectLang('month')} style={[styles.langBorder , {borderColor:this.state.baqa === 'month' ?COLORS.blue : 'transparent' , height:160}]}>
                                    <View style={styles.lang}>
                                        <Image source={require('../../assets/images/calender_month.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                                        <Text style={[styles.whiteText , styles.normalText , styles.tAC , {marginVertical:15}]}>{ i18n.t('monthlyPackage') }</Text>
                                        <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>432 ريال</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.selectLang('year')} style={[styles.langBorder , {borderColor:this.state.baqa === 'year' ?COLORS.blue : 'transparent' , height:160}]}>
                                    <View style={styles.lang}>
                                        <Image source={require('../../assets/images/calender_year.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                                        <Text style={[styles.whiteText , styles.normalText , styles.tAC , {marginVertical:15}]}>{ i18n.t('yearlyPackage') }</Text>
                                        <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>479 ريال</Text>
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

export default FoodPayment;