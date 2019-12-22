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
    KeyboardAvoidingView, Linking
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getEventDetails, getTicketDetails, setSaveEvent} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;


class QrConfirmTicket extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _linkPressed (url){
        Linking.openURL(url);
    }

    componentWillMount() {
        // alert(this.props.navigation.state.params.id)
        this.setState({ loader: 1});
        this.props.getTicketDetails( this.props.lang ,this.props.navigation.state.params.id)
    }

    renderLoader(){
        if (this.state.loader == 1){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <Animatable.View animation="zoomIn" easing="ease-out" iterationCount="infinite">
                        <Image source={require('../../assets/images/icon.png')} style={[styles.logoImg]} resizeMode={'contain'} />
                    </Animatable.View>
                </View>
            );
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.key  });
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
                { this.renderLoader() }
                <Header style={[styles.header]} noShadow>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('confirmTicket') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        {
                            this.props.ticketDetails ?
                                <View style={[styles.homeSection, styles.whiteHome, {
                                    paddingHorizontal: 20,
                                    paddingVertical: 25
                                }]}>

                                    <View style={styles.directionRowCenter}>

                                        <View style={styles.dateView}>
                                            <Text style={[styles.boldGrayText, styles.normalText, {
                                                height: 45,
                                                lineHeight: 45
                                            }]}>{this.props.ticketDetails.day}</Text>
                                        </View>
                                        <View style={styles.remainingView}>
                                            <Text style={[styles.boldGrayText, styles.normalText, {
                                                height: 45,
                                                lineHeight: 45
                                            }]}>{i18n.t('remain')} {this.props.ticketDetails.day_remaining}</Text>
                                        </View>

                                    </View>

                                    <Swiper dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                            containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                        {
                                            this.props.ticketDetails.images.map((img, i) =>{
                                                return (
                                                    <Image key={i} source={{ uri: img.image }}  style={styles.swiperImg} resizeMode={'cover'}/>
                                                )
                                            })
                                        }

                                    </Swiper>

                                    <Text style={[styles.boldGrayText, styles.normalText, styles.mb10, styles.asfs, styles.writing]}>{this.props.ticketDetails.event_name}</Text>
                                    <View style={[styles.directionRowAlignCenter, styles.mb10]}>
                                        <View style={[styles.directionRowAlignCenter, {marginRight: 10}]}>
                                            <Image source={require('../../assets/images/clock_blue.png')}
                                                   style={[styles.notiImg]} resizeMode={'contain'}/>
                                            <Text style={[styles.blueText, styles.normalText]}>{this.props.ticketDetails.time}</Text>
                                        </View>
                                        <View style={[styles.directionRowAlignCenter]}>
                                            <Image source={require('../../assets/images/calendar_icon_small.png')}
                                                   style={[styles.notiImg]} resizeMode={'contain'}/>
                                            <Text style={[styles.blueText, styles.normalText]}>{this.props.ticketDetails.date}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.directionRowAlignCenter, styles.mb10]}>
                                        <Image source={require('../../assets/images/ticket.png')}
                                               style={[styles.notiImg]} resizeMode={'contain'}/>
                                        <Text style={[styles.blueText, styles.normalText]}>{this.props.ticketDetails.tickets_price * this.props.ticketDetails.tickets_count} { i18n.t('RS') } ( { i18n.t('ticketsNo') }</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => this._linkPressed('https://google.com/maps/?q=' + this.props.ticketDetails.latitude + ',' + this.props.ticketDetails.longitude + '')}
                                        style={[styles.directionRowAlignCenter, styles.mb10]}>
                                        <Image source={require('../../assets/images/placeholder_blue.png')}
                                               style={[styles.notiImg]} resizeMode={'contain'}/>
                                        <Text style={[styles.blueText, styles.normalText]}>{this.props.ticketDetails.address}</Text>
                                    </TouchableOpacity>
                                    <View style={[styles.directionRowAlignCenter, styles.mb10]}>
                                        <Image source={require('../../assets/images/receipt_blue.png')}
                                               style={[styles.notiImg]} resizeMode={'contain'}/>
                                        <Text style={[styles.blueText, styles.normalText]}>{ i18n.t('onlineBook') }</Text>
                                    </View>
                                    <View style={[styles.directionRowAlignCenter]}>
                                        <Image source={require('../../assets/images/Feather_blue.png')}
                                               style={[styles.notiImg]} resizeMode={'contain'}/>
                                        <Text style={[styles.blueText, styles.normalText]}>{this.props.ticketDetails.category}</Text>
                                    </View>

                                    <View style={styles.line}/>

                                    <View style={styles.directionRowSpace}>
                                        <View style={styles.directionRowAlignCenter}>
                                            <View style={styles.borderImg}>
                                                <Image source={{ uri: this.props.ticketDetails.user_avatar }}
                                                       style={[styles.footSearchImg]} resizeMode={'cover'}/>
                                            </View>
                                            <Text style={[styles.boldGrayText, styles.normalText]}>{this.props.ticketDetails.user}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('bookTicket', {
                                            event_id: this.props.ticketDetails.ticket_id,
                                            backRoute: 'qrConfirmTicket'
                                        })}>
                                            <Text
                                                style={[styles.blueText, styles.normalText]}>{i18n.t('details')}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View> :
                                <View/>
                        }
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , ticketDetails , profile }) => {
    return {
        lang: lang.lang,
        ticketDetails: ticketDetails.ticketDetails,
        user: profile.user,
        key: ticketDetails.key
    };
};
export default connect(mapStateToProps, {getTicketDetails})(QrConfirmTicket);
