import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    ImageBackground,
    Linking, Platform,
} from "react-native";
import {Container, Content, Header, Right, Left} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";
import {connect} from "react-redux";
import {getEventDetails , getAcceptEvent , getRejectEvent , deleteOrganizerEvent} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import ProgressImg from 'react-native-image-progress';


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class OrderDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            deleteProduct: false,
            loader: 1
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

    componentWillMount() {
        this.setState({ loader: 1});
        this.props.getEventDetails( this.props.lang , this.props.navigation.state.params.event_id , this.props.user.token)
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
        this.setState({ loader: nextProps.key });
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

    acceptEvent(){
        this.props.getAcceptEvent( this.props.lang , this.props.navigation.state.params.event_id , this.props.user.token , this.props)
    }

    rejectEvent(){
        this.props.getRejectEvent( this.props.lang , this.props.navigation.state.params.event_id , this.props.user.token , this.props)
    }



    _deleteProduct = () => this.setState({ deleteProduct: !this.state.deleteProduct });

    _deleteConfirmation() {
        this.setState({ deleteProduct: !this.state.deleteProduct });
        this.props.deleteOrganizerEvent( this.props.lang , this.props.navigation.state.params.event_id , this.props.user.token , this.props)
    }


    renderBtn(){
        if(this.props.navigation.state.params.orderType === 1){
            return(
                <View>
                    <TouchableOpacity onPress={() => this.acceptEvent()} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                        <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.rejectEvent()} style={[styles.disabledBtn, styles.mb15 , {backgroundColor:'transparent'}]}>
                        <Text style={[styles.blueText , styles.normalText ]}>{ i18n.t('refuse') }</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else if(this.props.navigation.state.params.orderType === 2){
            return(
                <TouchableOpacity onPress={() => this.props.navigation.navigate('contactUs')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('contactManege') }</Text>
                </TouchableOpacity>
            )
        }
        else if(this.props.navigation.state.params.orderType === 3 || this.props.navigation.state.params.orderType === 4){
            return(
                <TouchableOpacity onPress={this._deleteProduct} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('delete') }</Text>
                </TouchableOpacity>
            )
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
					{
						IS_IPHONE_X ?
							<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
							:
							<View/>
					}
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('myOrders')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('orderDet') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        {
                            this.props.eventDet?
                                <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>

                                    <Text style={[styles.boldGrayText , styles.normalText , styles.mb10, styles.asfs, styles.writing]}>{this.props.eventDet.name}</Text>

                                    <Swiper key={this.props.eventDet.images} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                            containerStyle={[styles.eventswiper , styles.mb15]} showsButtons={false} autoplay={true}>
                                        {
                                            this.props.eventDet.images.map((img, i) =>{
                                                return (
                                                    <ProgressImg key={i} source={{ uri: img.image  }}  style={styles.swiperImg} resizeMode={'cover'}/>
                                                )
                                            })
                                        }
                                    </Swiper>


                                    <View style={[styles.directionRowCenter ,  styles.mb15]}>
                                        <View style={[styles.directionRowAlignCenter , {paddingHorizontal:15}  ]}>
                                            <Image source={require('../../assets/images/feather_gray.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                            <Text style={[styles.grayText , styles.normalText , {fontSize:13}]}>{this.props.eventDet.organization}</Text>
                                        </View>
                                        <View style={[styles.directionRowAlignCenter , { paddingHorizontal:15 ,borderLeftWidth:1 , borderLeftColor:COLORS.lightGray}]}>
                                            <Image source={require('../../assets/images/feather_gray.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                            <Text style={[styles.grayText , styles.normalText , {fontSize:13}]}>{this.props.eventDet.category}</Text>
                                        </View>
                                    </View>


                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <View style={[styles.directionRowAlignCenter , {marginRight:10} ]}>
                                            <Image source={require('../../assets/images/clock_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                            <Text style={[styles.blueText , styles.normalText]}>{this.props.eventDet.time}</Text>
                                        </View>
                                        <View style={[styles.directionRowAlignCenter ]}>
                                            <Image source={require('../../assets/images/calendar_icon_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                            <Text style={[styles.blueText , styles.normalText]}>{this.props.eventDet.date}</Text>
                                        </View>
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('normalPrice') } {this.props.eventDet.tickets.normal_price} { i18n.t('RS') }</Text>
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/ticket_yellow.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.orangeText , styles.normalText]}>{ i18n.t('goldPrice') } {this.props.eventDet.tickets.golden_price} { i18n.t('RS') }</Text>
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('vipPrice') } {this.props.eventDet.tickets.vip_price} { i18n.t('RS') }</Text>
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/chair_yellow.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.orangeText , styles.normalText]}>{ i18n.t('normalChairs') } {this.props.eventDet.tickets.normal_count}</Text>
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/chair_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('goldChairs') } {this.props.eventDet.tickets.golden_count}</Text>
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/chair_yellow.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.orangeText , styles.normalText]}>{ i18n.t('vipChairs') } {this.props.eventDet.tickets.vip_count}</Text>
                                    </View>

                                    <TouchableOpacity onPress={()=> this._linkGoogleMap(  this.props.eventDet.latitude , this.props.eventDet.longitude)} style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.eventDet.address}</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.grayText , styles.normalText, styles.asfs, styles.writing , {fontSize:13}]}>{this.props.eventDet.details}</Text>

                                    {
                                        this.renderBtn()
                                    }




                                </View>
                                :
                                <View/>
                        }

                    </ImageBackground>
                    <Modal onBackdropPress={()=> this.setState({ deleteProduct : false })} isVisible={this.state.deleteProduct}>
                        <View style={styles.modalEvent}>

                            <Text style={[styles.headerText , styles.mt15 , {color:'#272727'}]}>{ i18n.t('confirmDelete') }</Text>
                            <Text style={[styles.grayText , styles.mb15 , styles.normalText]}>{ i18n.t('deleteQues') }</Text>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this._deleteConfirmation()} style={[styles.centerBlock ,{width:'50%' , borderRightWidth:.5 , borderColor:COLORS.lightGray }]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._deleteProduct()} style={[styles.centerBlock ,{width:'50%'}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('cancel') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , eventDetails , profile }) => {
    return {
        lang: lang.lang,
        eventDet: eventDetails.eventDet,
        user: profile.user,
        key: eventDetails.key
    };
};
export default connect(mapStateToProps, {getEventDetails , getAcceptEvent , getRejectEvent , deleteOrganizerEvent})(OrderDetails);
