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
    Platform,
    FlatList
} from "react-native";
import {Container, Content, Header,} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Communications from 'react-native-communications';
import {connect} from "react-redux";
import {SetFavouriteEvent, getProfileDetails} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import ProgressImg from 'react-native-image-progress';
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import axios from "axios";


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class RestCafeDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            savedEvent: false,
            userAddress: '',
            active:0,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    async componentWillMount() {
        this.setState({ loader: 1});
        const token = this.props.user ? this.props.user.token : null;
        this.props.getProfileDetails( this.props.lang , this.props.navigation.state.params.user_id , token)
let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            const userLocation = { latitude, longitude };

            let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
            getCity += userLocation.latitude + ',' + userLocation.longitude;
            getCity += '&key=AIzaSyDCdYroxCIXCe6iCwvPUdV-I0TsaBPnXlY&language= '+this.props.lang +'&sensor=true';

            console.log('locations data', getCity);


            try {
                const { data } = await axios.get(getCity);
                console.log(data);
                this.setState({ userAddress: data.results[0].formatted_address });

            } catch (e) {
                console.log(e);
            }
        }
    }

    selectAcive(type){
        this.setState({active:type})
    }

    _linkPressed (url){
        Linking.openURL(url);
    }

    _linkGoogleMap(lat, lng, address){
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';

        // let url = Platform.select({
        //     ios : `${scheme}${label}@${latLng}`,
        //     android: `${scheme}${latLng}(${label}`
        // });

        let url = 'https://www.google.com/maps/dir/?api=1&origin=' + this.state.userAddress + '&destination=' + address;

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
        // if(nextProps.navigation.state.params && nextProps.navigation.state.params.isLoader)
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
    renderNoData(){
        if (this.props.profileDetails.products && (this.props.profileDetails.products).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
    }


    _keyExtractor = (item, index) => item.id;

    renderItems = (item , i) => {
        return (
            <TouchableOpacity style={{margin:3, flex: 1}} onPress={() => this.props.navigation.navigate('productDetails', {
                product_id: item.product_id,
                backRoute: 'restCafeDetails',
                item,
                products: this.props.profileDetails.products,
                index: i
            })}>
                <ProgressImg source={{uri: item.images[0].image }} style={styles.productImg} resizeMode={'cover'}/>
            </TouchableOpacity>
        );
    };

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

    renderCont() {


        if(this.state.active === 0 ){
            return(
                <View>
                    {
                        this.renderNoData()
                    }


                    {/*<FlatList*/}
                    {/*    data={this.props.profileDetails.products}*/}
                    {/*    renderItem={({item , index}) => this.renderItems(item , index)}*/}
                    {/*    numColumns={3}*/}
                    {/*    keyExtractor={this._keyExtractor}*/}
                    {/*    columnWrapperStyle={{ justifyContent:'space-between'}}*/}
                    {/*/>*/}

                    <View style={[styles.directionRowSpace , {flexWrap:'wrap'}]}>

                        {
                            this.props.profileDetails.products.map((product, i) =>{

                                return (

                                    <TouchableOpacity style={{ marginBottom:3, width: '33%' }} key={i} onPress={() => this.props.navigation.navigate('productDetails', {products: this.props.profileDetails.products, product_id: product.product_id , backRoute:'restCafeDetails', index: i})}>
                                        <ProgressImg source={{ uri: product.images[0].image }} style={[styles.productImg, { alignSelf: 'center' }]} resizeMode={'cover'}/>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </View>


                    {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('products', {user_id :this.props.navigation.state.params.user_id , backRoute:'restCafeDetails' , catType:this.props.navigation.state.params.catType  })} style={[styles.delAcc , {backgroundColor:COLORS.white}]}>*/}
                    {/*<Text style={[styles.blueText , styles.normalText ,{fontSize:15}]}>{ i18n.t('moreProducts') }</Text>*/}
                    {/*</TouchableOpacity>*/}
                </View>
            )
        } else {
            return(
                <View style={styles.directionColumn}>
                    <TouchableOpacity style={styles.directionColumn} onPress={() => Communications.phonecall(this.props.profileDetails.mobile, true)}>
                        <View style={styles.directionRowAlignCenter}>
                            <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                            <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('mainNumber') }</Text>
                        </View>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13 , marginLeft:25}]}>{this.props.profileDetails.mobile}</Text>
                    </TouchableOpacity>

                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => Communications.phonecall(this.props.profileDetails.phone, true)}>
                        <Image  source={require('../../assets/images/smartphone_call_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.profileDetails.phone}</Text>
                    </TouchableOpacity>
                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed(this.props.profileDetails.website)}>
                        <Image  source={require('../../assets/images/internet_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.profileDetails.website}</Text>
                    </TouchableOpacity>
                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed(this.props.profileDetails.facebook)}>
                        <Image  source={require('../../assets/images/facebook_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.profileDetails.facebook}</Text>
                    </TouchableOpacity>
                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed(this.props.profileDetails.twitter)}>
                        <Image  source={require('../../assets/images/tiwiter_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.profileDetails.twitter}</Text>
                    </TouchableOpacity>
                </View>
            )
        }

    }

    onFocus(payload){
        this.componentWillMount()
    }
    render() {

        // console.log('oooooo' , 'https://google.com/maps/?q=' + this.props.profileDetails.latitude +','+ this.props.profileDetails.longitude +'')

        let whatsNum = '';

        if(this.props.profileDetails && Platform.OS == 'ios')
            whatsNum = (this.props.profileDetails.mobile).substr(1);
        else if(this.props.profileDetails)
            whatsNum = this.props.profileDetails.mobile;

        return (
            <Container>

                { this.renderLoader() }
                <Header style={[styles.header]} noShadow>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>
                    <View style={[ styles.animatedHeader]}>
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

                    </View>
                </Header>

                <Content contentContainerStyle={styles.flexGrow} style={styles.homecontent} >
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{height:'100%'}}>
                        {
                            this.props.profileDetails ?
                                <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal: 0 , paddingTop:20} ]}>
                                    <View style={[styles.directionRowSpace , {paddingHorizontal:20}]}>
                                        <Text style={[styles.boldGrayText , styles.normalText , styles.mb10]}>{this.props.profileDetails.name}</Text>

                                        <TouchableOpacity onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone='+ whatsNum)}>
                                            <Image source={require('../../assets/images/whatsapp_icon.png')} style={[styles.overImg]} resizeMode={'cover'} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ paddingHorizontal: 20 }}>
                                        <ProgressImg source={{ uri: this.props.profileDetails.image  }}  style={[styles.restImg, {width:'100%', height: (height*60)/100}]} resizeMode={'contain'}/>
                                    </View>


                                    <TouchableOpacity onPress={()=> this._linkGoogleMap( this.props.profileDetails.latitude , this.props.profileDetails.longitude, this.props.profileDetails.address)} style={[styles.directionRowAlignCenter , styles.mb10, {paddingHorizontal:20}]}>
                                        <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.profileDetails.address}</Text>
                                    </TouchableOpacity>


                                    <Text style={[styles.grayText , styles.normalText , styles.asfs, styles.writing  , {fontSize:13, paddingHorizontal:20}]}>{this.props.profileDetails.details}</Text>


                                    <View style={[styles.directionRowAlignCenter , styles.mt30 , {backgroundColor:'#f2f2f2' , paddingTop:10} ]}>
                                        <TouchableOpacity onPress={() => this.selectAcive(0)} style={[styles.restTabs ,
                                            {borderColor:this.state.active === 0 ?COLORS.rose : COLORS.lightGray , borderBottomWidth:this.state.active === 0 ?5: .5}
                                        ]}>
                                            <Image source={ this.state.active === 0 ? require('../../assets/images/box_active.png') : require('../../assets/images/box_gray.png')} style={[styles.activeImg]} resizeMode={'contain'} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => this.selectAcive(1)} style={[styles.restTabs ,
                                            {borderColor:this.state.active === 1 ?COLORS.rose : COLORS.lightGray  , borderBottomWidth:this.state.active === 1 ?5: .5}
                                        ]}>
                                            <Image source={ this.state.active === 1 ? require('../../assets/images/telephone_active.png') : require('../../assets/images/telephone_gray.png')} style={[styles.activeImg ]} resizeMode={'contain'} />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.grayCont}>
                                        { this.renderCont()}
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

const mapStateToProps = ({ lang , profileDetails , profile }) => {
    return {
        lang: lang.lang,
        profileDetails: profileDetails.profileDetails,
        user: profile.user,
        key: profileDetails.key
    };
};

export default connect(mapStateToProps, {getProfileDetails , SetFavouriteEvent})(RestCafeDetails);