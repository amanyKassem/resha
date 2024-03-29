import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, Animated, Linking, ImageBackground, Platform, } from "react-native";
import {Container, Content, Header, Right,Left} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import Communications from 'react-native-communications';
import {connect} from "react-redux";
import {getContactUs} from "../actions";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ContactUs extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('contactUs') ,
        drawerIcon: (<Image source={require('../../assets/images/phone_menu_icon.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })

    componentWillMount() {
        this.props.getContactUs( this.props.lang )
    }

    renderLoader(){
        if (this.props.loader == 0){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <Animatable.View animation="zoomIn" easing="ease-out" iterationCount="infinite">
                        <Image source={require('../../assets/images/icon.png')} style={[styles.logoImg]} resizeMode={'contain'} />
                    </Animatable.View>
                </View>
            );
        }
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
    _linkPressed (url){
        Linking.openURL(url);
    }

    render() {
            console.log('contactUs' , this.props.contactUs)

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        let whatsNum = '';

        if(this.props.mobile && Platform.OS == 'ios')
            whatsNum = (this.props.mobile).substr(1);
        else if(this.props.mobile)
            whatsNum = this.props.mobile;

        return (
            <Container>

                <Header style={[styles.header]} noShadow>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('contactUs') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <Image source={require('../../assets/images/undraw_contact_us.png')} style={[styles.faqImg]} resizeMode={'contain'} />
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20 , marginTop:15}]}>
                            <ImageBackground source={require('../../assets/images/bg_feather.png')} resizeMode={'cover'} style={styles.imageBackground}>

                                <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed(this.props.instgram)}>
                                    <Image  source={require('../../assets/images/instagram.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                                    <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.instgram}</Text>
                                </TouchableOpacity>

                                <View style={[styles.line ]}/>

                                <View style={styles.directionRowSpace}>
                                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => Communications.phonecall(this.props.mobile, true)}>
                                        <Image  source={require('../../assets/images/smartphone_call_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.mobile}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone=' + whatsNum)}>
                                        <Image source={require('../../assets/images/whatsapp_icon.png')} style={[styles.headerMenu]} resizeMode={'cover'} />
                                    </TouchableOpacity>
                                </View>

                                <View style={[styles.line ]}/>

                                <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed(this.props.website)}>
                                    <Image  source={require('../../assets/images/internet_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                                    <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.website}</Text>
                                </TouchableOpacity>
                                <View style={[styles.line ]}/>

                                <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed('mailto:'+ this.props.email)}>
                                    <Image  source={require('../../assets/images/mail.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                                    <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.email}</Text>
                                </TouchableOpacity>
                                <View style={[styles.line ]}/>

                                <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed(this.props.twitter)}>
                                    <Image  source={require('../../assets/images/tiwiter_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                                    <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.twitter}</Text>
                                </TouchableOpacity>
                                <View style={[styles.line ]}/>

                            </ImageBackground>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , contactUs }) => {
    return {
        lang: lang.lang,
        twitter: contactUs.twitter,
        facebook: contactUs.facebook,
        website: contactUs.website,
        phone: contactUs.phone,
        mobile: contactUs.mobile,
        email: contactUs.email,
        instgram: contactUs.instgram,
        contactUs: contactUs,
        loader: contactUs.key
    };
};
export default connect(mapStateToProps, {getContactUs})(ContactUs);
