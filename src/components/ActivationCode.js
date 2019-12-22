import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions,  ImageBackground , KeyboardAvoidingView, AsyncStorage} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getSendActivationCode, profile, userLogin} from "../actions";
import axios from "axios";
import CONST from "../consts";


const height = Dimensions.get('window').height;

class ActivationCode extends Component {
    constructor(props){
        super(props);

        this.state={
            code: '',
            isSubmitted: false,
            userId: null
        }
    }

    componentWillMount() {
        this.props.getSendActivationCode( this.props.lang ,
            this.props.navigation.state.params.mobile,
        )

    }

    renderSubmit(){
        if (this.state.code == '') {
            return (
                <TouchableOpacity style={[styles.blueBtn, styles.mt50 ,  {backgroundColor: '#999'}]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('sendButton') }</Text>
                </TouchableOpacity>
            );
        }
        if (this.state.isSubmitted) {
            return (
                <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.mt50, ]}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{alignSelf: 'center'}}/>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => this.checkCode()} style={[styles.blueBtn, styles.mt50]}>
                <Text style={[styles.whiteText, styles.normalText]}>{i18n.t('sendButton')}</Text>
            </TouchableOpacity>

        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isSubmitted: false});


        if (nextProps.sendActivationCode) {
            alert(nextProps.sendActivationCode.code)
        }

        if (nextProps.auth !== null && nextProps.auth.key == 1){

            console.log('this is user id...', this.state.userId);

            if (this.state.userId === null){
                this.setState({ userId: nextProps.auth.data.id });
                this.props.profile(nextProps.auth.data.token);
            }

            this.props.navigation.navigate('home');
        }

        // if (nextProps.auth !== null) {
        //     Toast.show({
        //         text: nextProps.auth.msg,
        //         type: nextProps.auth.key == 1 ? "success" : "danger",
        //         duration: 3000
        //     });
        // }
        console.log('sendActivationCode' , nextProps)
    }

    checkCode(){
        if (this.props.sendActivationCode.code == this.state.code){
            this.setState({ isSubmitted: true });


            axios({
                url: CONST.url + 'activate-account',
                method: 'POST',
                data: {lang: this.props.lang ,mobile :this.props.navigation.state.params.mobile , code :this.props.sendActivationCode.code}
            }).then(response => {
                AsyncStorage.getItem('deviceID').then(deviceID => {
                    const phone    = this.props.navigation.state.params.mobile;
                    const password = this.props.navigation.state.params.password;
                    const deviceId = deviceID;
                    const type     = this.props.navigation.state.params.type;

                    this.props.userLogin({phone, password, deviceId , type}, this.props.lang)
                })
            })



        }else{
            Toast.show({
                text: i18n.t('codeNotCorrect'),
                type: "danger",
                duration: 3000
            });
        }

    }


    render() {


        return (
            <Container>
                <Content   contentContainerStyle={styles.flexGrow} >
                    <TouchableOpacity style={styles.authBack} onPress={() => this.props.navigation.goBack()}>
                        <Image source={require('../../assets/images/back_white.png')} resizeMode={'contain'}  style={[styles.authImg , styles.transform]}/>
                    </TouchableOpacity>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.langView ]}>

                            <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={{}}>
                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={styles.labelItem}>
                                                { i18n.t('activationCode') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Input value={this.state.code} onChangeText={(code) => this.setState({code})} keyboardType={'number-pad'} style={styles.itemInput}  />
                                        </Item>
                                    </View>

                                    {
                                        this.renderSubmit()
                                    }
                                </Form>
                            </KeyboardAvoidingView>

                        </View>


                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}
const mapStateToProps = ({ lang , auth, profile , sendActivationCode }) => {
    return {
        lang: lang.lang,
        auth: auth.user,
        user: profile.user,
        sendActivationCode: sendActivationCode.sendActivationCode,
        key: sendActivationCode.key
    };
};
export default connect(mapStateToProps, {getSendActivationCode, userLogin, profile})(ActivationCode);
