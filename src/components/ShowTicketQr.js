import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    ImageBackground,
    Platform, Linking
} from "react-native";
import {Container, Content, Header,Right, Left} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import AndroidQRCode from 'react-native-qrcode';
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getDeleteTicket} from "../actions";
import { QRCode } from 'react-native-custom-qr-codes-expo';
import ProgressImg from 'react-native-image-progress';


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ShowTicketQr extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _linkPressed (url){
        Linking.openURL(url);
    }
    _linkGoogleMap(lat, lng){
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';

        let url = Platform.select({
            ios : `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label}`
        });

        Linking.openURL(url);
    }
    renderSubmit(){
        if (this.state.isSubmitted) {
            return (
                <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.mt50, ]}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{alignSelf: 'center'}}/>
                </View>
            )
        }
        return (
            <TouchableOpacity  onPress={() => this.deleteTicket()} style={[styles.blueBtn , styles.mt50]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('deleteTicket') }</Text>
            </TouchableOpacity>

        );
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.deleteTicket) {
            this.setState({isSubmitted: false});
            // this.props.navigation.navigate('reservations')
        }
        console.log('nextProps.deleteTicket' , nextProps.deleteTicket)
    }

    deleteTicket(){
        this.setState({ isSubmitted: true });
        this.props.getDeleteTicket( this.props.lang ,
            this.props.navigation.state.params.ticketsInfo.ticket_id,
            this.props.user.token,
            this.props
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
					{
						IS_IPHONE_X ?
							<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
							:
							<View/>
					}
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('reservations')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('showTicket') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>

                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:25 , flex:0} ]}>
                            <View style={styles.QR}>
                                {
                                    Platform.OS == 'ios' ?
                                        <QRCode
                                            content={(this.props.navigation.state.params.ticketsInfo.ticket_id).toString()}
                                            backgroundColor={'#fff'}
                                            size={80}
                                        />
                                        :
                                        <AndroidQRCode
                                            value={(this.props.navigation.state.params.ticketsInfo.ticket_id).toString()}
                                            size={80}
                                            bgColor='#000'
                                            fgColor='white'/>
                                }


                            </View>
                            <View style={styles.directionRowCenter}>

                                <View style={styles.dateView}>
                                    <Text style={[styles.boldGrayText , styles.normalText , {height:45 , lineHeight:45}]}>{ this.props.navigation.state.params.ticketsInfo.day}</Text>
                                </View>
                                <View style={styles.remainingView}>
                                    <Text style={[styles.boldGrayText , styles.normalText , {height:45 , lineHeight:45}]}>{ i18n.t('remain') } { this.props.navigation.state.params.ticketsInfo.day_remaining}</Text>
                                </View>

                            </View>

                            <Swiper key={this.props.navigation.state.params.ticketsInfo.images} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                    containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                {
                                    this.props.navigation.state.params.ticketsInfo.images.map((img, i) =>{
                                        return (
                                            <ProgressImg key={i} source={{ uri: img.image  }}  style={styles.swiperImg} resizeMode={'cover'}/>
                                        )
                                    })
                                }
                            </Swiper>

                            <Text style={[styles.boldGrayText , styles.normalText , styles.asfs , styles.writing , styles.mb10]}>{ this.props.navigation.state.params.ticketsInfo.event_name}</Text>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <View style={[styles.directionRowAlignCenter , {marginRight:10} ]}>
                                    <Image source={require('../../assets/images/clock_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.blueText , styles.normalText]}>{ this.props.navigation.state.params.ticketsInfo.time}</Text>
                                </View>
                                <View style={[styles.directionRowAlignCenter ]}>
                                    <Image source={require('../../assets/images/calendar_icon_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.blueText , styles.normalText]}>{ this.props.navigation.state.params.ticketsInfo.date}</Text>
                                </View>
                            </View>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>{ this.props.navigation.state.params.ticketsInfo.tickets_total_price} { i18n.t('RS') }</Text>
                            </View>
                            <TouchableOpacity onPress={()=> this._linkGoogleMap( this.props.navigation.state.params.ticketsInfo.latitude , this.props.navigation.state.params.ticketsInfo.longitude)}
                                 style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>{ this.props.navigation.state.params.ticketsInfo.address}</Text>
                            </TouchableOpacity>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/receipt_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('onlineBook') }</Text>
                            </View>


                            <View style={styles.line}/>

                            <Text style={[styles.boldGrayText , styles.normalText , styles.asfs , styles.writing, styles.mb100]}>{ i18n.t('scanQr') }</Text>

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

const mapStateToProps = ({ lang , profile , deleteTicket }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        deleteTicket: deleteTicket.deleteTicket,
        key: deleteTicket.key
    };
};
export default connect(mapStateToProps, {getDeleteTicket})(ShowTicketQr);
