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
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import {connect} from "react-redux";
import {SetFavouriteEvent, getProfileDetails} from "../actions";
import {NavigationEvents} from "react-navigation";
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


class CarDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            savedEvent: false,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        this.setState({ loader: 1});
        this.props.getProfileDetails( this.props.lang , this.props.navigation.state.params.user_id , this.props.user.token)
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
        if(nextProps.navigation.state.params && nextProps.navigation.state.params.isLoader)
            this.setState({loader:0})
        console.log('nextProps.profileDetails.is_save' , nextProps.profileDetails.is_save)
        this.setState({ savedEvent: nextProps.profileDetails.is_save });
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

    // savedEvent() {
    //     this.setState({savedEvent: !this.state.savedEvent})
    //     this.props.SetFavouriteEvent( this.props.lang , this.props.navigation.state.params.user_id , this.props.user.token)
    // }

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
					{
						IS_IPHONE_X ?
							<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
							:
							<View/>
					}
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.backRoute)} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>


                        <View style={styles.directionRowAlignCenter}>
                            {/*<TouchableOpacity onPress={() => this.savedEvent()} style={styles.headerBtn}>*/}
                                {/*<Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />*/}
                            {/*</TouchableOpacity>*/}
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
                            this.props.profileDetails?
                                <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>
                                    <View style={styles.directionRowSpace}>
                                        <Text style={[styles.boldGrayText , styles.normalText , styles.mb10]}>{this.props.profileDetails.details}</Text>

                                        <TouchableOpacity onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone='+this.props.profileDetails.mobile)}>
                                            <Image source={require('../../assets/images/whatsapp_icon.png')} style={[styles.overImg]} resizeMode={'cover'} />
                                        </TouchableOpacity>
                                    </View>

                                    <Image source={{ uri: this.props.profileDetails.image }}  onLoad={() => this.setState({ loader: 0  })}  style={[styles.restImg , {width:'100%'}]} resizeMode={'cover'}/>


                                    <TouchableOpacity onPress={()=> this._linkGoogleMap( this.props.profileDetails.latitude , this.props.profileDetails.longitude)} style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.profileDetails.address}</Text>
                                    </TouchableOpacity>


                                    <Text style={[styles.grayText , styles.normalText , styles.asfs, styles.writing  , {fontSize:13}]}>{this.props.profileDetails.details}</Text>

                                    <View style={[styles.directionRowAlignCenter , styles.mt15 , styles.mb15]}>
                                        <Image source={require('../../assets/images/feather_color.png')} style={[styles.resha]} resizeMode={'contain'} />
                                        <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('products') }</Text>
                                    </View>

                                    <View style={[styles.directionRowSpace , {flexWrap:'wrap'}]}>
                                        {
                                            this.props.profileDetails.products.map((product, i) =>{
                                                return (
                                                    <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('productDetails', {product_id:product.product_id, backRoute:'carDetails'})}>
                                                        <Image source={{ uri: product.image }} style={styles.productImg} resizeMode={'cover'}/>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </View>

                                    {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('products' , {user_id :this.props.navigation.state.params.user_id , backRoute:'carDetails', catType:this.props.navigation.state.params.catType})} style={styles.delAcc}>*/}
                                        {/*<Text style={[styles.blueText , styles.normalText ,{fontSize:15}]}>{ i18n.t('moreProducts') }</Text>*/}
                                    {/*</TouchableOpacity>*/}
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

const mapStateToProps = ({ lang , profileDetails , profile }) => {
    return {
        lang: lang.lang,
        profileDetails: profileDetails.profileDetails,
        user: profile.user,
        key: profileDetails.key
    };
};
export default connect(mapStateToProps, {getProfileDetails , SetFavouriteEvent})(CarDetails);
