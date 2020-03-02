import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground , AsyncStorage , KeyboardAvoidingView} from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {DoubleBounce} from "react-native-loader";
import {NavigationEvents} from "react-navigation";
import { connect } from 'react-redux';
import { userLogin, profile } from '../actions'
import * as Permissions from 'expo-permissions';
import { Notifications } from 'expo';



class Login extends Component {
    constructor(props){
        super(props);

        this.state={
            phone: '',
            password: '',
            deviceId: '',
            userId: null,
            type:0,
            isSubmitted: false
        }
    }
    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.phone.length <= 0 ) {
            isError = true;
            msg = i18n.t('phoneValidation');
        }else if (this.state.password.length <= 0) {
            isError = true;
            msg = i18n.t('passwordRequired');
        }
        if (msg != ''){
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000
            });
        }
        return isError;
    };

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <View style={{ justifyContent: 'center', alignItems: 'center' , marginTop:30 }}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => this.onLoginPressed()} style={[styles.blueBtn, styles.mt30]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('loginButton') }</Text>
            </TouchableOpacity>

    );
    }

    onLoginPressed() {
        const err = this.validate();
        if (!err){
            this.setState({ isSubmitted: true });
            const {phone, password, deviceId , type} = this.state;
            setTimeout(() => this.props.userLogin({ phone, password, deviceId, type }, this.props.lang, this.props), 0);
        }
    }


    async componentWillMount() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        const deviceId = await Notifications.getExpoPushTokenAsync();
        console.log('deviceId', deviceId);
        this.setState({ deviceId, userId: null });
        AsyncStorage.setItem('deviceID', deviceId);

    }

    componentWillReceiveProps(newProps){
        console.log('props auth ...', newProps);
        this.setState({ isSubmitted: false })

        if (newProps.auth !== null && newProps.auth.key == 1){

            console.log('this is user id...', this.state.userId);

            if (this.state.userId === null){
                this.setState({ userId: newProps.auth.data.id });
                this.props.profile(newProps.auth.data.token);
            }

            this.props.navigation.navigate('home');
        }

        if (newProps.auth !== null && newProps.auth.key == 3){

            console.log('this is user id...', this.state.userId);

            if (this.state.userId === null){
                this.setState({ userId: newProps.auth.data.id });
                this.props.profile(newProps.auth.data.token);

            }
            this.props.navigation.navigate('foodPayment' , {user_id :newProps.auth.data.id});

        }

        if (newProps.auth !== null) {
            Toast.show({
                text: newProps.auth.msg,
                type: newProps.auth.key == 1 || newProps.auth.key == 3? "success" : "danger",
                duration: 3000
            });
        }

    }

    onFocus(){
        this.setState({ userId: null });
        this.componentWillMount()
    }

    render() {

        return (
            <Container>
                <NavigationEvents onWillFocus={() => this.onFocus()} />
				<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                    <Content contentContainerStyle={styles.flexGrow} >
                            <View style={[styles.langView ]}>

                                <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                                <TouchableOpacity  onPress={() => this.props.navigation.navigate('drawerNavigator')} style={[styles.blueBtn, styles.mt30 , styles.mb15 , styles.w100]}>
                                    <Text style={[styles.whiteText, styles.normalText , {fontSize:18}]}>{ i18n.t('visitor') }</Text>
                                </TouchableOpacity>

                                <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                    <Form style={{}}>
                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={styles.labelItem}>
                                                    { i18n.t('phoneNumber') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={styles.itemInput}  />
                                            </Item>
                                        </View>
                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={styles.labelItem}>
                                                    { i18n.t('password') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input autoCapitalize='none' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry  style={styles.itemInput}  />
                                            </Item>
                                        </View>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('forgetPass')} style={styles.mt15}>
                                            <Text style={[styles.whiteText , styles.BoldText , {fontSize:13}]}>{ i18n.t('forgetPass') }</Text>
                                        </TouchableOpacity>


                                        { this.renderSubmit() }
                                    </Form>
                                </KeyboardAvoidingView>

                            </View>

                            <View style={[styles.accParent]}>
                                <View style={styles.createAccText}>
                                    <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform , {top:5}]}/>
                                    <Text style={[styles.blueText, styles.normalText ]}>{ i18n.t('registerButton') }</Text>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('register')} style={styles.noAcc} >
                                    <Text style={[styles.whiteText, styles.normalText ]}>{ i18n.t('noAcc') }</Text>
                                </TouchableOpacity>
                            </View>

                    </Content>
                </ImageBackground>
            </Container>

        );
    }
}


const mapStateToProps = ({ auth, profile, lang }) => {
    return {
        loader: auth.key,
        auth: auth.user,
        user: profile.user,
        lang: lang.lang
    };
};
export default connect(mapStateToProps, { userLogin, profile })(Login);
