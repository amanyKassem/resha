import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Share, ImageBackground, Linking} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getEventDetails , setSaveEvent} from "../actions";
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;


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

    _linkPressed (url){
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
                    <DoubleBounce size={20} color={COLORS.mov} />
                </View>
            );
        }
    }
    componentWillReceiveProps(nextProps) {
        console.log('nextProps.eventDet.is_save' , nextProps.eventDet.is_save)
        this.setState({ loader: nextProps.key , savedEvent: nextProps.eventDet.is_save });
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
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

        return (
            <Container>

                { this.renderLoader() }
                <Header style={[styles.header]} noShadow>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.backRoute)} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>


                        <View style={styles.directionRowAlignCenter}>
                            <TouchableOpacity onPress={() => this.savedEvent()} style={styles.headerBtn}>
                                <Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onShare} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/share_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>

                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        {
                            this.props.eventDet ?
                                <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>
                                    <View style={styles.directionRowSpace}>
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

                                        <TouchableOpacity onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone='+this.props.eventDet.user.mobile)}>
                                            <Image source={require('../../assets/images/whatsapp_icon.png')} style={[styles.overImg]} resizeMode={'cover'} />
                                        </TouchableOpacity>

                                    </View>

                                    <Swiper dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                            containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                        {
                                            this.props.eventDet.images.map((img, i) =>{
                                                return (
                                                    <Image key={i} source={{ uri: img.image }}  style={styles.swiperImg} resizeMode={'cover'}/>
                                                )
                                            })
                                        }
                                    </Swiper>

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
                                    <TouchableOpacity onPress={()=> this._linkPressed('https://google.com/maps/?q=' + this.props.eventDet.latitude +','+ this.props.eventDet.longitude +'')} style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.eventDet.address}</Text>
                                    </TouchableOpacity>
                                    <Text style={[styles.grayText , styles.normalText , styles.asfs , styles.writing , {fontSize:13}]}>{this.props.eventDet.details}</Text>


                                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('bookType' , { event_id: this.props.eventDet.id })} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                        <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('book') }</Text>
                                    </TouchableOpacity>




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