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
import {Container, Content, Header,  Right, Left} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import Swiper from 'react-native-swiper';
import {NavigationEvents} from "react-navigation";
import ProgressImg from 'react-native-image-progress';


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ConfirmTicket extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
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
        // alert(this.props.navigation.state.params.ticket_type)

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
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('continueBooking')} style={styles.headerBtn}>
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
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:25} ]}>

                            <View style={styles.directionRowCenter}>

                                <View style={styles.dateView}>
                                    <Text style={[styles.boldGrayText , styles.normalText , {height:45 , lineHeight:45}]}>{this.props.navigation.state.params.event_info.day}</Text>
                                </View>
                                <View style={styles.remainingView}>
                                    <Text style={[styles.boldGrayText , styles.normalText , {height:45 , lineHeight:45}]}>{ i18n.t('remain') } {this.props.navigation.state.params.event_info.day_remaining}</Text>
                                </View>

                            </View>

                            <Swiper key={this.props.navigation.state.params.event_info.images} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                    containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                {
                                    this.props.navigation.state.params.event_info.images.map((img, i) =>{
                                        return (
                                            <ProgressImg key={i} source={{ uri: img.image  }}  style={styles.swiperImg} resizeMode={'cover'}/>
                                        )
                                    })
                                }
                            </Swiper>

                            <Text style={[styles.boldGrayText , styles.normalText , styles.asfs , styles.writing , styles.mb10]}>{this.props.navigation.state.params.event_info.event_name}</Text>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <View style={[styles.directionRowAlignCenter , {marginRight:10} ]}>
                                    <Image source={require('../../assets/images/clock_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.blueText , styles.normalText]}>{this.props.navigation.state.params.event_info.time}</Text>
                                </View>
                                <View style={[styles.directionRowAlignCenter ]}>
                                    <Image source={require('../../assets/images/calendar_icon_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.blueText , styles.normalText]}>{this.props.navigation.state.params.event_info.date}</Text>
                                </View>
                            </View>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>{this.props.navigation.state.params.price * this.props.navigation.state.params.ticketsNo} { i18n.t('RS') } ( { i18n.t('ticketsNo') } {this.props.navigation.state.params.ticketsNo} )</Text>
                            </View>
                            <TouchableOpacity onPress={()=> this._linkGoogleMap( this.props.navigation.state.params.event_info.latitude , this.props.navigation.state.params.event_info.longitude )}
                                style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>{this.props.navigation.state.params.event_info.address}</Text>
                            </TouchableOpacity>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/receipt_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('onlineBook') }</Text>
                            </View>
                            <View style={[styles.directionRowAlignCenter ]}>
                                <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>{this.props.navigation.state.params.event_info.category}</Text>
                            </View>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <View style={styles.directionRowAlignCenter}>
                                    <View style={styles.borderImg}>
                                        <Image source={{ uri: this.props.navigation.state.params.event_info.user.avatar }} style={[styles.footSearchImg]} resizeMode={'cover'} />
                                    </View>
                                    <Text style={[styles.boldGrayText , styles.normalText ]}>{this.props.navigation.state.params.event_info.user.name }</Text>
                                </View>

                                <TouchableOpacity onPress={ () => this.props.navigation.navigate('bookTicket' , { event_id: this.props.navigation.state.params.event_id , backRoute:'confirmTicket'})} >
                                    <Text style={[styles.blueText , styles.normalText ]}>{ i18n.t('details') }</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ticketPayment', {
                                    event_info : this.props.navigation.state.params.event_info,
                                    event_id : this.props.navigation.state.params.event_id ,
                                    price : this.props.navigation.state.params.price,
                                    ticket_type : this.props.navigation.state.params.ticket_type,
                                    imgSrc : this.props.navigation.state.params.imgSrc,
                                    ticketName : this.props.navigation.state.params.ticketName,
                                    ticketsNo : this.props.navigation.state.params.ticketsNo,
                                })} style={[styles.blueBtn]}>
                                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('continue') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('events')} style={[styles.disabledBtn]}>
                                    <Text style={[styles.boldGrayText , styles.normalText ]}>{ i18n.t('deleteTicket') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default ConfirmTicket;
