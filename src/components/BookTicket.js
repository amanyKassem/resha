import React, { Component } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions,
	Animated,
	Share,
	ImageBackground,
	Linking,
	Platform
} from "react-native";
import {Container, Content, Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import Swiper from 'react-native-swiper';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import StarRating from 'react-native-star-rating';
import {connect} from "react-redux";
import {getEventDetails , setSaveEvent} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import ProgressImg from 'react-native-image-progress';
import COLORS from "../consts/colors";


const {height, width} = Dimensions.get('window');

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


class BookTicket extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            starCount:3,
            savedEvent: false,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _linkPressed (lat, lng){
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        let url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`
        });

        console.log('damn location', url)

        Linking.openURL(url);
    }


    componentWillMount() {
        this.setState({ loader: 1});
        const token = this.props.user ? this.props.user.token : null;
        this.props.getEventDetails( this.props.lang , this.props.navigation.state.params.event_id , token)
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
        // if(nextProps.navigation.state.params && nextProps.navigation.state.params.isLoader)
            this.setState({loader:0})
        console.log('nextProps.eventDet.is_save' , nextProps.eventDet.is_save)
        this.setState({ loader: nextProps.key , savedEvent: nextProps.eventDet.is_save });
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    Platform.OS === 'ios'? 'https://apps.apple.com/us/app/reesh-ريش/id1490248883?ls=1' : 'https://play.google.com/store/apps/details?id=com.app.reesh',
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
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

    savedEvent() {
        this.setState({savedEvent: !this.state.savedEvent})
        this.props.setSaveEvent( this.props.lang , this.props.navigation.state.params.event_id , this.props.user.token)
    }

    renderImage() {
        let source = '';
        if (this.state.savedEvent) {
            source = require('../../assets/images/bookmark_bink.png')
        } else {
            source = require('../../assets/images/bookmark_white.png')
        }
        return source;
    }

    onFocus(payload){
        this.componentWillMount()
    }

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        let whatsNum = '';

        if(this.props.eventDet && this.props.eventDet.user.mobile && Platform.OS == 'ios')
            whatsNum = (this.props.eventDet.user.mobile).substr(1);
        else if(this.props.eventDet && this.props.eventDet.user.mobile)
            whatsNum = this.props.eventDet.user.mobile;

        return (
            <Container>

                { this.renderLoader() }
                <Header style={[styles.header]} noShadow>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.backRoute)} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>


                        <View style={styles.directionRowAlignCenter}>
                            <TouchableOpacity onPress={() => this.props.user ? this.savedEvent() : this.props.navigation.navigate('login')} style={styles.headerBtn}>
                                <Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onShare} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/share_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>

                    </Animated.View>
                </Header>



                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />

                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        {
                            this.props.eventDet ?
                                <View style={[ styles.whiteHome , { paddingVertical:20} ]}>

                                    <View style={[styles.directionRowSpace, { paddingHorizontal:20 }]}>
                                        <View style={styles.directionRowAlignCenter}>
                                            <View style={styles.borderImg}>
                                                <Image source={{ uri: this.props.eventDet.user.avatar }} style={[styles.footSearchImg]} resizeMode={'cover'} />
                                            </View>
                                            <View style={styles.directionColumn}>
                                                <Text style={[styles.boldGrayText , styles.normalText , styles.mb10, styles.asfs]}>{this.props.eventDet.user.user_name}</Text>
                                                <StarRating
                                                    disabled={true}
                                                    maxStars={5}
                                                    rating={this.props.eventDet.user.rates}
                                                    fullStarColor={'#f0aa0b'}
                                                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                    starSize={18}
                                                    starStyle={styles.starStyle}
                                                />
                                            </View>
                                        </View>

                                        <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone='+whatsNum)}>
                                            <Image source={require('../../assets/images/whatsapp_icon.png')} style={[styles.overImg]} resizeMode={'cover'} />
                                        </TouchableOpacity>

                                    </View>

                                    <Swiper key={this.props.eventDet.images.length} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot} containerStyle={styles.eventswiper} showsButtons={false} >
                                        {
                                            this.props.eventDet.images.map((img, i) =>{
                                                return (
                                                    <ProgressImg key={i} source={{ uri: img.image  }}  style={styles.swiperImg} resizeMode={'cover'}/>
                                                )
                                            })
                                        }
                                    </Swiper>

                                    <View style={{ paddingHorizontal:20 }}>
                                        <Text style={[styles.boldGrayText , styles.normalText , styles.asfs , styles.writing , styles.mb10]}>{this.props.eventDet.name}</Text>
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
                                            <Text style={[styles.blueText , styles.normalText]}>{this.props.eventDet.normal_price} { i18n.t('RS') }</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => this._linkPressed(this.props.eventDet.latitude , this.props.eventDet.longitude )} style={[styles.blueBtn, { marginVertical: 10, width: '90%' }]}>
                                            <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('location') }</Text>
                                        </TouchableOpacity>

                                        {/*<TouchableOpacity onPress={()=> this._linkPressed('https://google.com/maps/?q=' + this.props.eventDet.latitude +','+ this.props.eventDet.longitude +'')} style={[styles.directionRowAlignCenter , styles.mb10]}>*/}
                                        {/*    <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />*/}
                                        {/*    <Text style={[styles.blueText , styles.normalText, {paddingLeft:20}]}>{this.props.eventDet.address}</Text>*/}
                                        {/*</TouchableOpacity>*/}

                                        <Text style={[styles.grayText , styles.normalText , styles.asfs , styles.writing , {fontSize:13}]}>{this.props.eventDet.details}</Text>

                                        {
                                            this.props.eventDet.is_booking === 1 ?
                                                <TouchableOpacity onPress={ () =>  this.props.user ? this.props.navigation.navigate('bookType' , { event_id: this.props.eventDet.id }) : this.props.navigation.navigate('login') } style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('book') }</Text>
                                                </TouchableOpacity>
                                                :
                                                <View/>
                                        }
                                    </View>

                                </View>
                                :
                                <View/>
                        }

                    </ImageBackground>

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
export default connect(mapStateToProps, {getEventDetails , setSaveEvent})(BookTicket);
