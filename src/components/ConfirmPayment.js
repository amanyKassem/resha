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
	Platform,
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Modal from "react-native-modal";
import {connect} from "react-redux";
import {getSaveTicket} from "../actions";
import {DoubleBounce} from "react-native-loader";
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ConfirmPayment extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            modalEvent: false,
            isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        console.log('1')
        this.setState({isSubmitted: false , modalEvent: false})
    }

    _modalEvent = () =>{
        // this.setState({ modalEvent: !this.state.modalEvent })
        this.setState({ isSubmitted: true });
        this.props.getSaveTicket( this.props.lang ,
            this.props.navigation.state.params.event_id,
            this.props.navigation.state.params.ticket_type,
            this.props.navigation.state.params.ticketsNo,
            this.props.user.token
        )
    }

    renderSubmit(){
        if (this.state.isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.mt50 , styles.mb15]}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={this._modalEvent} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>

        );
    }

    componentWillReceiveProps(nextProps) {
        console.log('2')
        if (nextProps.saveTicket){
            this.setState({ modalEvent: !this.state.modalEvent , isSubmitted: false});
            console.log('3')
        }

        // console.log('confirmnextProps' , nextProps)
    }
    backHome() {
        this.setState({ modalEvent: !this.state.modalEvent });
        this.props.navigation.navigate('drawerNavigator')
    };
    showTicket() {
        this.setState({ modalEvent: !this.state.modalEvent });
        this.props.navigation.navigate('showTicketQr', {
            ticketsInfo : this.props.saveTicket,
        })
    };

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

    onFocus(payload){
        this.componentWillMount()
    }

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        return (
            <Container>

                <Header style={[styles.header]} noShadow>
					{
						IS_IPHONE_X ?
							<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
							:
							<View/>
					}
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('ticketPayment')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('confirmPayment') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <Image source={require('../../assets/images/payment_logo_undraw.png')} style={[styles.faqImg]} resizeMode={'contain'} />
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:25 , paddingVertical:20 , marginTop:15}]}>

                            <Text style={[styles.headerText , styles.asc  , styles.tac , styles.mt30 , {color:'#272727' , width:'70%' , lineHeight:30}]}>{ i18n.t('confirmPay') }</Text>

                            { this.renderSubmit()}

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('confirmTicket')} style={[styles.blueBtn,  styles.mb15 , {backgroundColor:'transparent'}]}>
                                <Text style={[styles.blueText , styles.normalText ]}>{ i18n.t('backToTicket') }</Text>
                            </TouchableOpacity>

                        </View>
                    </ImageBackground>
                    <Modal onBackdropPress={()=> this.setState({ modalEvent : false })} isVisible={this.state.modalEvent}>
                        <View style={styles.modalEvent}>

                            <Image source={require('../../assets/images/calendar_blue.png')} resizeMode={'contain'} style={styles.sideImg}/>

                            <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('payDone') }</Text>
                            <Text style={[styles.grayText , styles.normalText]}>{ i18n.t('bookChair') }</Text>
                            <Text style={[styles.grayText , styles.normalText]}>{ i18n.t('noRefund') }</Text>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this.showTicket()} style={[styles.centerBlock ,{width:'50%' , borderRightWidth:.5 , borderColor:COLORS.lightGray ,}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('seeTicket') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.backHome()} style={[styles.centerBlock ,{width:'50%'}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('home') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , profile , saveTicket }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        saveTicket: saveTicket.saveTicket,
        key: saveTicket.key
    };
};
export default connect(mapStateToProps, {getSaveTicket})(ConfirmPayment);
