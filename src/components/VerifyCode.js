import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    AsyncStorage
} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getCheckForgetCode} from "../actions";


const height = Dimensions.get('window').height;

class VerifyCode extends Component {
    constructor(props){
        super(props);

        this.state={
            code: '',
            isSubmitted: false,
        }
    }

    componentWillMount() {
        alert(this.props.navigation.state.params.code)
        console.log(this.props.navigation.state.params.user_id , this.props.navigation.state.params.code)
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

    checkCode(){


        if (this.props.navigation.state.params.code == this.state.code){
            this.setState({isSubmitted:true})
            this.props.getCheckForgetCode( this.props.lang ,
                this.props.navigation.state.params.user_id ,
                this.props.navigation.state.params.code ,
                this.props
            )
        }else{
            Toast.show({
                text: i18n.t('codeNotCorrect'),
                type: "danger",
                duration: 3000
            });
        }


    }
    componentWillReceiveProps(nextProps) {
        this.setState({isSubmitted:false})
    }

    render() {


        return (
            <Container>
                <Content contentContainerStyle={styles.flexGrow} >
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
                                                { i18n.t('verifyCode') }
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

const mapStateToProps = ({ lang , checkForgetCode }) => {
    return {
        lang: lang.lang,
        checkForgetCode: checkForgetCode.checkForgetCode,
        key: checkForgetCode.key
    };
};
export default connect(mapStateToProps, {getCheckForgetCode})(VerifyCode);