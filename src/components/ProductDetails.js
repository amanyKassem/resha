import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    ImageBackground,
    Linking,
    Platform,
    I18nManager,
    FlatList
} from "react-native";
import {Container, Content, Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Communications from 'react-native-communications';
import {connect} from "react-redux";
import {SetFavouriteEvent, getShowProduct , getRateProduct} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import ProgressImg from 'react-native-image-progress';
import FamilyProduct from './FamilyProduct'

const height        = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ProductDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            starsCount:this.props.showProduct ? this.props.showProduct.rates: 0,
            userRate:this.props.showProduct ? this.props.showProduct.user_rates: 0,
            savedEvent: false,
            loader: 1,
            rate: 0
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        const token = this.props.user ? this.props.user.token : null;
        this.props.getShowProduct( this.props.lang , this.props.navigation.state.params.product_id , token)
        this.setState({ loader: 1, savedEvent: false ,  starsCount:this.props.showProduct && (this.props.showProduct.id === this.props.navigation.state.params.product_id)? this.props.showProduct.rates: 0});
    }

    _linkPressed (url){
        Linking.openURL(url);
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
        this.setState({ loader: 0 , savedEvent: nextProps.showProduct.is_save ,
            starsCount:nextProps.showProduct && (nextProps.showProduct.id === this.props.navigation.state.params.product_id)? nextProps.showProduct.rates: 0});

        if (nextProps.ratekey == 1  && (nextProps.rateProduct.product_id === this.props.navigation.state.params.product_id)){
            this.setState({userRate : nextProps.rateProduct.user_rates ,  starsCount : nextProps.rateProduct.product_rates })
        }

    }

    componentDidMount() {
        const { index } = this.props.navigation.state.params;
        if(this.flatListRef.scrollToIndex({ index , animated: true })){
            this.flatListRef.scrollToIndex({ index , animated: true })
        }
    }

    onStarRatingPress(rating) {
        this.props.getRateProduct( this.props.lang , this.props.navigation.state.params.product_id , rating , this.props.user.token)
        this.setState({ rate: rating });
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

    renderItems = (item) => {
        return (
            <FamilyProduct key={item.id} data={item} navigation={this.props.navigation}/>
        );
    };


    onFocus(payload){
        this.setState({ rate: 0 });
        this.componentWillMount();
        this.componentDidMount()
    }

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        const products = this.props.navigation.state.params.products;

        let whatsNum = '';

        if(this.props.showProduct && Platform.OS == 'ios')
            whatsNum = (this.props.showProduct.user.mobile).substr(1);
        else if(this.props.showProduct)
            whatsNum = this.props.showProduct.user.mobile;

        return (
            <Container>
                {/*{ this.renderLoader() }*/}

                <Header style={[styles.header]} noShadow>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-45 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.backRoute , {isLoader:true})} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>

                        {
                            this.props.showProduct ?
                                <View style={[styles.directionRowSpace, { width: '86%' }]}>
                                    <View style={styles.directionRowAlignCenter}>
                                        <View style={styles.borderImg}>
                                            <ProgressImg source={{ uri: this.props.showProduct.user.image  }} style={[styles.footSearchImg]} resizeMode={'cover'} />
                                        </View>
                                        <View style={styles.directionColumn}>
                                            <Text style={[styles.headerText]}>{this.props.showProduct.user.user_name}</Text>
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone=' + whatsNum)}>
                                        <Image source={require('../../assets/images/whatsapp_icon.png')} style={{ width: 30, height: 30, alignSelf: 'center' }} resizeMode={'cover'} />
                                        <Text style={{ color: '#fff', textAlign: 'center', marginTop: 3, fontFamily: I18nManager.isRTL ? 'cairo' : 'openSans' }}>{ i18n.t('contact') }</Text>
                                    </TouchableOpacity>
                                </View> : null
                        }

                        {/*<TouchableOpacity onPress={() =>  this.props.user ? this.savedEvent() : this.props.navigation.navigate('login')} style={styles.headerBtn}>*/}
                        {/*<Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />*/}
                        {/*</TouchableOpacity>*/}


                    </Animated.View>
                </Header>

                <Content  scrollEnabled={false} contentContainerStyle={styles.flexGrow} style={[styles.homecontent, {padding: 0}]}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , { paddingHorizontal: 0, paddingVertical:20, height: height-100} ]}>
                            {/*{*/}
                            {/*this.props.showProduct ?*/}
                            {/*<View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>*/}


                            {/*<Swiper key={this.props.showProduct.images.length} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}*/}
                            {/*containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>*/}
                            {/*{*/}
                            {/*this.props.showProduct.images.map((img, i) =>{*/}
                            {/*return (*/}
                            {/*<ProgressImg key={i} source={{ uri: img.image  }}   style={styles.swiperImg} resizeMode={'cover'}/>*/}
                            {/*)*/}
                            {/*})*/}
                            {/*}*/}
                            {/*</Swiper>*/}

                            {/*<Text style={[styles.boldGrayText , styles.normalText , styles.mb10 , styles.asfs, styles.writing ]}>{this.props.showProduct.name}</Text>*/}
                            {/*<View style={[styles.directionRowSpace , styles.mb10]}>*/}
                            {/*<View style={[styles.directionRowAlignCenter , {marginRight:10} ]}>*/}
                            {/*<Image source={require('../../assets/images/star_border_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />*/}
                            {/*<Text style={[styles.blueText , styles.normalText]}>{this.state.starsCount}/5</Text>*/}
                            {/*</View>*/}
                            {/*{*/}
                            {/*this.props.user ?*/}
                            {/*<StarRating*/}
                            {/*disabled={false}*/}
                            {/*maxStars={5}*/}
                            {/*rating={this.state.rate}*/}
                            {/*fullStarColor={'#f0aa0b'}*/}
                            {/*selectedStar={(rating) => this.onStarRatingPress(rating)}*/}
                            {/*starSize={18}*/}
                            {/*starStyle={styles.starStyle}*/}
                            {/*/>*/}
                            {/*:*/}
                            {/*null*/}
                            {/*}*/}

                            {/*</View>*/}
                            {/*<View style={[styles.directionRowAlignCenter , styles.mb10]}>*/}
                            {/*<Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />*/}
                            {/*<Text style={[styles.blueText , styles.normalText]}>{this.props.showProduct.price} { i18n.t('RS') }</Text>*/}
                            {/*</View>*/}
                            {/*<View style={[styles.directionRowAlignCenter ]}>*/}
                            {/*<Image source={require('../../assets/images/category.png')} style={[styles.notiImg]} resizeMode={'contain'} />*/}
                            {/*<Text style={[styles.blueText , styles.normalText]}>{this.props.showProduct.category}</Text>*/}
                            {/*</View>*/}

                            {/*<View style={[styles.directionRowAlignCenter , styles.mt15, styles.mb10]}>*/}
                            {/*<Image source={require('../../assets/images/feather_color.png')} style={[styles.resha]} resizeMode={'contain'} />*/}
                            {/*<Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('productInfo') }</Text>*/}
                            {/*</View>*/}

                            {/*<Text style={[styles.grayText , styles.normalText , styles.asfs, styles.writing  , {fontSize:13}]}>{this.props.showProduct.details}</Text>*/}


                            {/*<View style={[styles.directionRowSpace , styles.mt15]}>*/}
                            {/*<View style={styles.directionColumn}>*/}
                            {/*<View style={styles.directionRowAlignCenter}>*/}
                            {/*<Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />*/}
                            {/*<Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('mainNumber') }</Text>*/}
                            {/*</View>*/}
                            {/*<Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13 , marginLeft:25}]}>{this.props.showProduct.user.phone}</Text>*/}
                            {/*</View>*/}
                            {/*<TouchableOpacity onPress={() => Communications.phonecall(this.props.showProduct.user.phone, true)}>*/}
                            {/*<Image source={require('../../assets/images/phone_bink.png')} style={[styles.headerMenu]} resizeMode={'contain'} />*/}
                            {/*</TouchableOpacity>*/}
                            {/*</View>*/}

                            {/*/!*<View style={[styles.line ]}/>*!/*/}

                            {/*/!*<TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone='+this.props.showProduct.user.mobile)}>*!/*/}
                            {/*/!*<Image  source={require('../../assets/images/whatsapp_icon.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>*!/*/}
                            {/*/!*<Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.showProduct.user.mobile}</Text>*!/*/}
                            {/*/!*</TouchableOpacity>*!/*/}

                            {/*</View>*/}
                            {/*:*/}
                            {/*<View/>*/}
                            {/*}*/}

                            <FlatList
                                showsVerticalScrollIndicator={false}
                                ref={(ref) => { this.flatListRef = ref; }}
                                data={products}
                                renderItem={({item}) => this.renderItems(item)}
                                onScrollToIndexFailed={()=>{}}
                                numColumns={1}
                                scrollEnabled={true}
                                keyExtractor={this._keyExtractor}
                                // style={{ backgroundColor:'#000'}}
                                // columnWrapperStyle={{ backgroundColor:'#000'}}
                            />
                        </View>


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
