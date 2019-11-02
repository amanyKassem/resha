import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions,  ImageBackground} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;

class Language extends Component {
    constructor(props){
        super(props);

        this.state={
            lang:'ar'
        }
    }

    selectLang(type){
        this.setState({lang:type})
    }

    render() {


        return (
            <Container>
                <Content contentContainerStyle={styles.flexGrow} >
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.langView ]}>

                            <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                            <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>اختر اللغة المناسبة لك</Text>
                            <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>Choose the right language for you</Text>

                            <View style={[styles.directionRowSpace , styles.w100 , styles.mt50]}>

                                <TouchableOpacity onPress={() => this.selectLang('ar')} style={[styles.langBorder , {borderColor:this.state.lang === 'ar' ?COLORS.blue : 'transparent'}]}>
                                    <View style={styles.lang}>
                                        <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>عربي</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.selectLang('en')} style={[styles.langBorder , {borderColor:this.state.lang === 'en' ?COLORS.blue : 'transparent'}]}>
                                    <View style={styles.lang}>
                                        <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>English</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('login') } style={[styles.blueBtn , styles.mt70]}>
                                <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>{ i18n.t('next') }</Text>
                            </TouchableOpacity>

                        </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default Language;