import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    FlatList,
    ImageBackground,
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";


const height = Dimensions.get('window').height;


class TicketPayment extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            payType:'visa'
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    selectPay(type){
        this.setState({payType:type})
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
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('payment') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:25} ]}>

                            <View  style={[styles.ticketViewType , styles.mb15 , styles.w100 ]}>
                                <Image source={this.props.navigation.state.params.imgSrc} style={[styles.ticketType, styles.w100]} resizeMode={'contain'} />
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'30%'} ]}>{this.props.navigation.state.params.ticketName}</Text>
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'50%'} ]}>{ i18n.t('price') } {this.props.navigation.state.params.price * this.props.navigation.state.params.ticketsNo} { i18n.t('RS') }</Text>
                            </View>


                            <TouchableOpacity onPress={() => this.selectPay('visa')} style={[styles.directionRowAlignCenter , styles.payView , styles.mt15 , {borderColor:this.state.payType === 'visa' ?COLORS.blue : COLORS.gray}]}>
                                <Image source={ this.state.payType === 'visa' ? require('../../assets/images/credit_card.png') : require('../../assets/images/credit_card_gray.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                <Text style={[styles.grayText , styles.normalText , {fontSize:15 , color:this.state.payType === 'visa' ?COLORS.blue : COLORS.gray}]}>{ i18n.t('payByVisa') }</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.selectPay('sdad')} style={[styles.directionRowAlignCenter , styles.payView, {borderColor:this.state.payType === 'sdad' ?COLORS.blue : COLORS.gray}]}>
                                <Image source={ this.state.payType === 'sdad' ? require('../../assets/images/sadad_logo_blue.png') : require('../../assets/images/sadad_logo.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                <Text style={[styles.grayText , styles.normalText , {fontSize:15 , color:this.state.payType === 'sdad' ?COLORS.blue : COLORS.gray}]}>{ i18n.t('payBySadad') }</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.selectPay('mada')} style={[styles.directionRowAlignCenter , styles.payView, {borderColor:this.state.payType === 'mada' ?COLORS.blue : COLORS.gray}]}>
                                <Image source={ this.state.payType === 'mada' ? require('../../assets/images/mada_logo_blue.png') : require('../../assets/images/mada_logo.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                <Text style={[styles.grayText , styles.normalText , {fontSize:15 , color:this.state.payType === 'mada' ?COLORS.blue : COLORS.gray}]}>{ i18n.t('payByMada') }</Text>
                            </TouchableOpacity>



                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('confirmPayment', {
                                event_info : this.props.navigation.state.params.event_info,
                                event_id : this.props.navigation.state.params.event_id ,
                                price : this.props.navigation.state.params.price,
                                ticket_type : this.props.navigation.state.params.ticket_type,
                                imgSrc : this.props.navigation.state.params.imgSrc,
                                ticketName : this.props.navigation.state.params.ticketName,
                                ticketsNo : this.props.navigation.state.params.ticketsNo,
                            })} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
                            </TouchableOpacity>

                            {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('confirmPayment', {*/}
                                {/*event_info : this.props.navigation.state.params.event_info,*/}
                                {/*event_id : this.props.navigation.state.params.event_id ,*/}
                                {/*price : this.props.navigation.state.params.price,*/}
                                {/*ticket_type : this.props.navigation.state.params.ticket_type,*/}
                                {/*imgSrc : this.props.navigation.state.params.imgSrc,*/}
                                {/*ticketName : this.props.navigation.state.params.ticketName,*/}
                                {/*ticketsNo : this.props.navigation.state.params.ticketsNo,*/}
                            {/*})} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>*/}
                                {/*<Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>*/}
                            {/*</TouchableOpacity>*/}

                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default TicketPayment;