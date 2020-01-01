import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions,  ImageBackground , Platform, KeyboardAvoidingView} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getCheckForgetCode, getResetPassword} from "../actions";


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ConfirmPass extends Component {
    constructor(props){
        super(props);

        this.state={
            password: '',
            rePassword: '',
            isSubmitted: false,
        }
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
            <TouchableOpacity onPress={() => this.resetPass()} style={[styles.blueBtn, styles.mt50]}>
                <Text style={[styles.whiteText, styles.normalText]}>{i18n.t('sendButton')}</Text>
            </TouchableOpacity>

        );
    }

    resetPass(){
        this.setState({isSubmitted:true})
        this.props.getResetPassword( this.props.lang ,
            this.props.navigation.state.params.user_id ,
            this.state.rePassword ,
            this.props
        )
    }

    componentWillReceiveProps(nextProps) {
        this.setState({isSubmitted:false})
    }

    render() {


        return (
            <Container>
				<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                    <Content   contentContainerStyle={styles.flexGrow} >
                        <TouchableOpacity style={styles.authBack} onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/back_white.png')} resizeMode={'contain'}  style={[styles.authImg , styles.transform]}/>
                        </TouchableOpacity>

                            <View style={[styles.langView ]}>

                                <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                                <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                    <Form style={{}}>
                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={styles.labelItem}>
                                                    { i18n.t('password') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input autoCapitalize='none' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry  style={styles.itemInput}  />
                                            </Item>
                                        </View>

                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={styles.labelItem}>
                                                    { i18n.t('rePassword') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input autoCapitalize='none' value={this.state.rePassword} onChangeText={(rePassword) => this.setState({rePassword})} secureTextEntry  style={styles.itemInput}  />
                                            </Item>
                                        </View>

                                        {
                                            this.renderSubmit()
                                        }
                                    </Form>
                                </KeyboardAvoidingView>

                            </View>

                    </Content>
                </ImageBackground>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang  }) => {
    return {
        lang: lang.lang,
    };
};
export default connect(mapStateToProps, {getResetPassword})(ConfirmPass);
