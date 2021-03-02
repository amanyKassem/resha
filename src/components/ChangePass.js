import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    Platform,
    ImageBackground, KeyboardAvoidingView
} from "react-native";
import {
    Container,
    Content,
    Header,
    Item,
    Input,
    Right,
    Left,
    Form,
    Label,
    Toast
} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getChangePassword} from "../actions";


const height = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


class ChangePass extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            oldPass: '',
            newPass: '',
            verifyNewPass: '',
            isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });



    renderSubmit(){
        if (this.state.oldPass == '' || this.state.newPass == '' || this.state.verifyNewPass == '') {
            return (
                <TouchableOpacity style={[styles.blueBtn, styles.mt50 , styles.mb15, {backgroundColor: '#999'}]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('save') }</Text>
                </TouchableOpacity>
            );
        }
        if (this.state.isSubmitted) {
            return (
                <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.mt50, styles.mb15]}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{alignSelf: 'center'}}/>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => this.changePass()} style={[styles.blueBtn, styles.mt50, styles.mb15]}>
                <Text style={[styles.whiteText, styles.normalText]}>{i18n.t('save')}</Text>
            </TouchableOpacity>

        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.changePassword) {
            this.setState({isSubmitted: false});
            this.props.navigation.navigate('changePassCode', {new_password : nextProps.changePassword.new_password , code : nextProps.changePassword.code})
        }
        console.log('confirmnextProps' , nextProps)
    }

    changePass(){
        if (this.state.newPass.length < 8){
            Toast.show({
                text: i18n.t('passwordLength'),
                type: "danger",
                duration: 3000
            });
            return false
        }
        if(this.state.newPass != this.state.verifyNewPass){
            Toast.show({
                text: i18n.t('verifyPassword'),
                type: "danger",
                duration: 3000
            });
            return false
        }

        this.setState({ isSubmitted: true });
        this.props.getChangePassword( this.props.lang ,
            this.state.oldPass,
            this.state.newPass,
            this.props.user.token
        )
    }


    setAnimate(availabel){
        if (availabel === 0){
            Animated.timing(
                this.state.backgroundColor,
                {
                    toValue: 1,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 1 });
        }else {
            Animated.timing(
                this.state.backgroundColor,
                {
                    toValue: 0,
                    duration: 1000,
                },
            ).start();
            this.setState({ availabel: 0 });
        }

        console.log(availabel);
    }

    headerScrollingAnimation(e){
        if (e.nativeEvent.contentOffset.y > 30){
            console.log(e.nativeEvent.contentOffset.y);
            this.setAnimate(0)
        } else{
            this.setAnimate(1)
        }
    }

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        return (
            <Container>

                <Header style={[styles.header]} noShadow>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-45 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('settings')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('changePass') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <Image source={require('../../assets/images/undraw_pass.png')} style={[styles.faqImg]} resizeMode={'contain'} />
                        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?'absolute' : 'padding'} style={styles.keyboardAvoid}>
                            <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20 , marginTop:15}]}>
                                <ImageBackground source={require('../../assets/images/bg_feather.png')} resizeMode={'cover'} style={styles.imageBackground}>
                                    <Form style={{padding:20}}>
                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                    { i18n.t('oldPass') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input autoCapitalize='none' secureTextEntry value={this.state.oldPass} onChangeText={(oldPass) => this.setState({oldPass})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                            </Item>
                                        </View>
                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                    { i18n.t('newPass') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input autoCapitalize='none' secureTextEntry value={this.state.newPass} onChangeText={(newPass) => this.setState({newPass})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                            </Item>
                                        </View>
                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                    { i18n.t('verifyNewPass') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input autoCapitalize='none' secureTextEntry value={this.state.verifyNewPass} onChangeText={(verifyNewPass) => this.setState({verifyNewPass})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                            </Item>
                                        </View>
                                    </Form>
                                    {
                                        this.renderSubmit()
                                    }
                                </ImageBackground>
                            </View>
                        </KeyboardAvoidingView>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}
const mapStateToProps = ({ lang , profile , changePassword }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        changePassword: changePassword.changePassword,
        key: changePassword.key
    };
};
export default connect(mapStateToProps, {getChangePassword})(ChangePass);
