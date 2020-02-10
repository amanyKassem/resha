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
    Linking, Platform
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import {NavigationEvents} from "react-navigation";
import {connect} from "react-redux";
import {getOwnerEventsDetails , getCancelEvent} from "../actions";
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ShowTicket extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            starCount:3,
            cancelEvent: false,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _cancelEvent = () => this.setState({ cancelEvent: !this.state.cancelEvent });


    componentWillMount(){
        this.setState({ loader: 1});
        this.props.getOwnerEventsDetails( this.props.lang , this.props.navigation.state.params.event_id , this.props.user.token)
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
    myEvents() {
        this.setState({ cancelEvent: !this.state.cancelEvent });
        this.props.getCancelEvent( this.props.lang , this.props.navigation.state.params.event_id , this.props.user.token , this.props)
    };

    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }

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
					{
						IS_IPHONE_X ?
							<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
							:
							<View/>
					}
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('myEvents')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('showTicket') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        {
                            this.props.ownerEventsDetails?
                                <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>
                                    <View style={styles.directionRowSpace}>
                                        <View style={styles.directionRowAlignCenter}>
                                            <View style={styles.borderImg}>
                                                <Image source={{ uri: this.props.ownerEventsDetails.user.avatar }} style={[styles.footSearchImg]} resizeMode={'cover'} />
                                            </View>
                                            <View style={styles.directionColumn}>
                                                <Text style={[styles.boldGrayText , styles.normalText , styles.mb10]}>{this.props.ownerEventsDetails.user.user_name}</Text>
                                                <StarRating
                                                    disabled={false}
                                                    maxStars={5}
                                                    rating={this.props.ownerEventsDetails.user.rates}
                                                    fullStarColor={'#f0aa0b'}
                                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                    starSize={18}
                                                    starStyle={styles.starStyle}
                                                />
                                            </View>
                                        </View>

                                        <TouchableOpacity onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone='+this.props.ownerEventsDetails.user.mobile)}>
                                            <Image source={require('../../assets/images/whatsapp_icon.png')} style={[styles.overImg]} resizeMode={'cover'} />
                                        </TouchableOpacity>
                                    </View>

                                    <Swiper dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                            containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}
                                            removeClippedSubviews={false}>
                                        {
                                            this.props.ownerEventsDetails.images.map((img, i) =>{
                                                return (
                                                    <Image key={i} source={{ uri: img.image }}  style={styles.swiperImg} resizeMode={'cover'}/>
                                                )
                                            })
                                        }
                                    </Swiper>

                                    <Text style={[styles.boldGrayText , styles.normalText , styles.asfs , styles.writing, styles.mb10]}>{this.props.ownerEventsDetails.name}</Text>
                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <View style={[styles.directionRowAlignCenter , {marginRight:10} ]}>
                                            <Image source={require('../../assets/images/clock_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                            <Text style={[styles.blueText , styles.normalText]}>{this.props.ownerEventsDetails.time}</Text>
                                        </View>
                                        <View style={[styles.directionRowAlignCenter ]}>
                                            <Image source={require('../../assets/images/calendar_icon_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                            <Text style={[styles.blueText , styles.normalText]}>{this.props.ownerEventsDetails.date}</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.ownerEventsDetails.normal_price} { i18n.t('RS') }</Text>
                                    </View>
                                    <TouchableOpacity onPress={()=> this._linkGoogleMap( this.props.ownerEventsDetails.latitude , his.props.ownerEventsDetails.longitude)} style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.ownerEventsDetails.address}</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.grayText , styles.normalText, styles.asfs , styles.writing , {fontSize:13}]}>{this.props.ownerEventsDetails.details}</Text>


                                    { this.props.navigation.state.params.eventType === 0 ?
                                        <TouchableOpacity onPress={this._cancelEvent} style={[styles.disabledBtn, styles.mt50 , styles.mb15]}>
                                            <Text style={[styles.boldGrayText , styles.normalText ]}>{ i18n.t('cancel') }</Text>
                                        </TouchableOpacity>
                                        :
                                        <View/>
                                    }



                                </View>
                                :
                                <View/>
                        }

                    </ImageBackground>
                    <Modal onBackdropPress={()=> this.setState({ cancelEvent : false })} isVisible={this.state.cancelEvent}>
                        <View style={styles.modalEvent}>

                            <Text style={[styles.headerText , styles.mt15 , {color:'#272727'}]}>{ i18n.t('confirmCancelEvent') }</Text>
                            <Text style={[styles.grayText , styles.mb15 , styles.normalText]}>{ i18n.t('communicateWithManage') }</Text>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this.myEvents()} style={[styles.centerBlock ,{width:'50%' , borderRightWidth:.5 , borderColor:COLORS.lightGray ,}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._cancelEvent()} style={[styles.centerBlock ,{width:'50%'}]}>
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

const mapStateToProps = ({ lang , ownerEventsDetails , profile}) => {
    return {
        lang: lang.lang,
        user: profile.user,
        ownerEventsDetails: ownerEventsDetails.ownerEventsDetails,
        key: ownerEventsDetails.key
    };
};
export default connect(mapStateToProps, {getOwnerEventsDetails , getCancelEvent})(ShowTicket);
