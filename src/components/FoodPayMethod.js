import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, ImageBackground, Animated} from "react-native";
import {Container, Content, Header, Left, Right} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {getConfirmSub} from "../actions";
import {connect} from "react-redux";
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";


class FoodPayMethod extends Component {
    constructor(props){
        super(props);

        this.state={
            payType: 'master',
            isSubmitted: false
        }
    }

    selectPay(type){
        this.setState({payType:type})
    }

    componentWillMount() {
        // alert(this.props.navigation.state.params.subscription_id + " aaa "  +this.props.navigation.state.params.user_id)
        console.log('damn ....', this.props.navigation.state.params.price)
        this.setState({sSubmitted: false})
    }

    renderSubmit(){
        if (this.state.isSubmitted) {
            return (
                <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.mt70]}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{alignSelf: 'center'}}/>
                </View>
            )
        }
        return (
            <TouchableOpacity  onPress={() => this.submitData()} style={[styles.blueBtn , styles.mt70]}>
                <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>{ i18n.t('next') }</Text>
            </TouchableOpacity>

        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.key == 1) {
            this.setState({isSubmitted: false});
        }
        console.log('nextProps.updateProduct' , nextProps.updateProduct)
    }

    submitData(){

        this.props.navigation.navigate('visaPay', {
            user_id             : this.props.user.id ,
            subscription_id     : this.props.navigation.state.params.subscription_id ,
            total               : this.props.navigation.state.params.price ,
            payType             : this.state.payType,
            pathName            : 'foodPayMethod'
        })

        // this.props.getConfirmSub( this.props.lang , this.props.navigation.state.params.user_id , this.props.navigation.state.params.subscription_id , this.props)
    }

    onFocus(payload){
        this.componentWillMount()
    }

    render() {

        return (
            <Container>
                <Header style={[styles.header]} noShadow>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('foodPayment', {user_id:this.props.navigation.state.params.user_id})} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('addProduct') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>
                <Content   contentContainerStyle={styles.flexGrow} >
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.langView ]}>

                            <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                            <Text style={[styles.whiteText , styles.normalText , styles.tAC , styles.mb10]}>{ i18n.t('choosePayMethod') }</Text>

                                <TouchableOpacity onPress={() => this.selectPay('master')} style={[styles.w100 , styles.directionRowAlignCenter , styles.payView , styles.mt15
                                    , {backgroundColor: '#ffffff20',borderColor:this.state.payType === 'master' ?COLORS.blue : COLORS.gray}]}>
                                    <Image source={ this.state.payType === 'master' ? require('../../assets/images/credit_card.png') : require('../../assets/images/credit_card_gray.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:15 , color:this.state.payType === 'master' ?COLORS.blue : COLORS.gray}]}>{ i18n.t('payByVisa') }</Text>
                                </TouchableOpacity>

                                {/*<TouchableOpacity onPress={() => this.selectPay('sdad')} style={[styles.w100 , styles.directionRowAlignCenter , styles.payView*/}
                                {/*    , {backgroundColor: '#ffffff20',borderColor:this.state.payType === 'sdad' ?COLORS.blue : COLORS.gray}]}>*/}
                                {/*    <Image source={ this.state.payType === 'sdad' ? require('../../assets/images/sadad_logo_blue.png') : require('../../assets/images/sadad_logo.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />*/}
                                {/*    <Text style={[styles.grayText , styles.normalText , {fontSize:15 , color:this.state.payType === 'sdad' ?COLORS.blue : COLORS.gray}]}>{ i18n.t('payBySadad') }</Text>*/}
                                {/*</TouchableOpacity>*/}

                                <TouchableOpacity onPress={() => this.selectPay('mada')} style={[styles.w100 , styles.directionRowAlignCenter , styles.payView
                                    , {backgroundColor: '#ffffff20',borderColor:this.state.payType === 'mada' ?COLORS.blue : COLORS.gray}]}>
                                    <Image source={ this.state.payType === 'mada' ? require('../../assets/images/mada_logo_blue.png') : require('../../assets/images/mada_logo.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:15 , color:this.state.payType === 'mada' ?COLORS.blue : COLORS.gray}]}>{ i18n.t('payByMada') }</Text>
                                </TouchableOpacity>

                                {/*<TouchableOpacity onPress={() => this.selectPay('apple')} style={[styles.w100 , styles.directionRowAlignCenter , styles.payView*/}
                                {/*    , {backgroundColor: '#ffffff20',borderColor:this.state.payType === 'apple' ?COLORS.blue : COLORS.gray}]}>*/}
                                {/*    <Image source={ this.state.payType === 'apple' ? require('../../assets/images/apple_active.png') : require('../../assets/images/apple_non_active.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />*/}
                                {/*    <Text style={[styles.grayText , styles.normalText , {fontSize:15 , color:this.state.payType === 'apple' ?COLORS.blue : COLORS.gray}]}>{ i18n.t('payByApple') }</Text>*/}
                                {/*</TouchableOpacity>*/}



                            {
                                this.renderSubmit()
                            }

                        </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang  , profile }) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};
export default connect(mapStateToProps, {getConfirmSub})(FoodPayMethod);
