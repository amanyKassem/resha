import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Share, ImageBackground, Linking} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Communications from 'react-native-communications';
import {connect} from "react-redux";
import {SetFavouriteEvent, getShowProduct , getRateProduct} from "../actions";
import {NavigationEvents} from "react-navigation";
import {DoubleBounce} from "react-native-loader";


const height = Dimensions.get('window').height;


class ProductDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            starsCount:0,
            userRate:0,
            savedEvent: false,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        this.setState({ loader: 1});
        this.props.getShowProduct( this.props.lang , this.props.navigation.state.params.product_id , this.props.user.token)
    }
    _linkPressed (url){
        Linking.openURL(url);
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
        console.log('nextProps.showProduct.is_save' , nextProps)


        this.setState({ loader: nextProps.key , savedEvent: nextProps.showProduct.is_save  , starsCount : nextProps.showProduct.rates , userRate : nextProps.showProduct.user.rates});
        if(nextProps.ratekey == 1)
            this.setState({userRate : nextProps.rateProduct.user_rates ,  starsCount : nextProps.rateProduct.product_rates })
    }

    onStarRatingPress(rating) {

        this.props.getRateProduct( this.props.lang , this.props.navigation.state.params.product_id , rating , this.props.user.token)
        this.setState({
            starsCount: rating
        });
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

    savedEvent() {
        this.setState({savedEvent: !this.state.savedEvent})
        this.props.SetFavouriteEvent( this.props.lang , this.props.navigation.state.params.product_id , this.props.user.token)
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

                        <Text style={[styles.headerText]}>{ i18n.t('productInfo') }</Text>

                        <TouchableOpacity onPress={() => this.savedEvent()} style={styles.headerBtn}>
                            <Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>

                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        {
                            this.props.showProduct ?
                                <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>
                                    <View style={styles.directionRowSpace}>
                                        <View style={styles.directionRowAlignCenter}>
                                            <View style={styles.borderImg}>
                                                <Image source={require('../../assets/images/profile_pic.png')} style={[styles.footSearchImg]} resizeMode={'cover'} />
                                            </View>
                                            <View style={styles.directionColumn}>
                                                <Text style={[styles.boldGrayText , styles.normalText , styles.mb10]}>{this.props.showProduct.user.user_name}</Text>
                                                <StarRating
                                                    disabled={true}
                                                    maxStars={5}
                                                    rating={this.state.userRate}
                                                    fullStarColor={'#f0aa0b'}
                                                    // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                    starSize={18}
                                                    starStyle={styles.starStyle}
                                                />
                                            </View>
                                        </View>

                                        <TouchableOpacity onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone='+this.props.showProduct.user.mobile)}>
                                            <Image source={require('../../assets/images/whatsapp_icon.png')} style={[styles.overImg]} resizeMode={'cover'} />
                                        </TouchableOpacity>
                                    </View>

                                    <Swiper dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                            containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                        {
                                            this.props.showProduct.images.map((img, i) =>{
                                                return (
                                                    <Image key={i} source={{ uri: img.image }}  style={styles.swiperImg} resizeMode={'cover'}/>
                                                )
                                            })
                                        }
                                    </Swiper>

                                    <Text style={[styles.boldGrayText , styles.normalText , styles.mb10 , styles.asfs, styles.writing ]}>{this.props.showProduct.name}</Text>
                                    <View style={[styles.directionRowSpace , styles.mb10]}>
                                        <View style={[styles.directionRowAlignCenter , {marginRight:10} ]}>
                                            <Image source={require('../../assets/images/star_border_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                            <Text style={[styles.blueText , styles.normalText]}>{this.state.starsCount}/5</Text>
                                        </View>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={this.state.starsCount}
                                            fullStarColor={'#f0aa0b'}
                                            selectedStar={(rating) => this.onStarRatingPress(rating)}
                                            starSize={18}
                                            starStyle={styles.starStyle}
                                        />
                                    </View>
                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.showProduct.price} { i18n.t('RS') }</Text>
                                    </View>
                                    <View style={[styles.directionRowAlignCenter ]}>
                                        <Image source={require('../../assets/images/category.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.showProduct.category}</Text>
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mt15, styles.mb10]}>
                                        <Image source={require('../../assets/images/feather_color.png')} style={[styles.resha]} resizeMode={'contain'} />
                                        <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('productInfo') }</Text>
                                    </View>

                                    <Text style={[styles.grayText , styles.normalText , styles.asfs, styles.writing  , {fontSize:13}]}>{this.props.showProduct.details}</Text>


                                    <View style={[styles.directionRowSpace , styles.mt15]}>
                                        <View style={styles.directionColumn}>
                                            <View style={styles.directionRowAlignCenter}>
                                                <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                                <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('mainNumber') }</Text>
                                            </View>
                                            <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13 , marginLeft:25}]}>{this.props.showProduct.user.phone}</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => Communications.phonecall(this.props.showProduct.user.phone, true)}>
                                            <Image source={require('../../assets/images/phone_bink.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={[styles.line ]}/>

                                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone='+this.props.showProduct.user.mobile)}>
                                        <Image  source={require('../../assets/images/whatsapp_icon.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.showProduct.user.mobile}</Text>
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

const mapStateToProps = ({ lang , showProduct , rateProduct , profile }) => {
    return {
        lang: lang.lang,
        showProduct: showProduct.showProduct,
        rateProduct: rateProduct.rateProduct,
        user: profile.user,
        key: showProduct.key,
        ratekey: rateProduct.key
    };
};
export default connect(mapStateToProps, {getShowProduct , SetFavouriteEvent , getRateProduct})(ProductDetails);