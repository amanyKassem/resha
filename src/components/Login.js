import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions,  ImageBackground , KeyboardAvoidingView} from "react-native";
import {Container, Content, Form, Input, Item, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;

class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            phone: '',
            password: '',
        }
    }


    render() {


        return (
            <Container>
                <Content contentContainerStyle={styles.flexGrow} >
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.langView ]}>

                            <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={{}}>
                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={styles.labelItem}>
                                                { i18n.t('phoneNumber') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={styles.itemInput}  />
                                        </Item>
                                    </View>
                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={styles.labelItem}>
                                                { i18n.t('password') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input autoCapitalize='none' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry  style={styles.itemInput}  />
                                        </Item>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('forgetPass')} style={styles.mt15}>
                                        <Text style={[styles.whiteText , styles.BoldText , {fontSize:13}]}>{ i18n.t('forgetPass') }</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('drawerNavigator')} style={[styles.blueBtn, styles.mt30]}>
                                         <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('loginButton') }</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity  onPress={() => this.props.navigation.navigate('drawerNavigator')} style={[styles.asc, styles.mt25]}>
                                        <Text style={[styles.blueText, styles.normalText ]}>{ i18n.t('visitor') }</Text>
                                    </TouchableOpacity>
                                </Form>
                            </KeyboardAvoidingView>

                        </View>

                        <View style={[styles.accParent]}>
                            <View style={styles.createAccText}>
                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , {top:5}]}/>
                                <Text style={[styles.blueText, styles.normalText ]}>{ i18n.t('registerButton') }</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('register')} style={styles.noAcc} >
                                <Text style={[styles.whiteText, styles.normalText ]}>{ i18n.t('noAcc') }</Text>
                            </TouchableOpacity>
                        </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default Login;