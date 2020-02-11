import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
} from "react-native";
import {Container, Content, Form, Input, Item, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getSendForgetCode} from "../actions";

class ForgetPass extends Component {
    constructor(props){
        super(props);

        this.state={
            phone: '',
            isSubmitted: false,
        }
    }

    renderSubmit(){
        if (this.state.phone == '') {
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
            <TouchableOpacity onPress={() => this.checkPhone()} style={[styles.blueBtn, styles.mt50]}>
                <Text style={[styles.whiteText, styles.normalText]}>{i18n.t('sendButton')}</Text>
            </TouchableOpacity>

        );
    }


    checkPhone(){
        this.setState({isSubmitted:true})
        this.props.getSendForgetCode( this.props.lang ,
            this.state.phone,
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
                                                    { i18n.t('phoneNumber') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={styles.itemInput}  />
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
const mapStateToProps = ({ lang , sendForgetCode }) => {
    return {
        lang: lang.lang,
        sendForgetCode: sendForgetCode.sendForgetCode,
        key: sendForgetCode.key
    };
};
export default connect(mapStateToProps, {getSendForgetCode})(ForgetPass);
