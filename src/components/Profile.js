import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, ImageBackground, Platform,} from "react-native";
import {Container, Content,  Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import FooterSection from './FooterSection';
import {connect} from "react-redux";
import * as Animatable from 'react-native-animatable';
import {getNotificationCount} from "../actions";


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class Profile extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }
    componentWillMount() {
        const token = this.props.auth ? this.props.auth.data.token : null;
        this.props.getNotificationCount( this.props.lang , token , this.props);
    }

    componentWillReceiveProps(nextProps, nextContext) {

        if(nextProps.notificationCount)
            this.setState({notify:nextProps.notificationCount.notify})
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

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


    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        return (
            <Container>
                <Header style={[styles.header]} noShadow>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText]}>{ i18n.t('profile') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')}   style={styles.headerBtn}>
                            <Image source={this.state.notify ? require('../../assets/images/bell_active.png') :  require('../../assets/images/bell_non_active.png') } style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>


                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , { marginTop:70}]}>

                            <View style={styles.sideImgView}>
                                <Animatable.View animation="fadeInDown" easing="ease-out" delay={500} style={styles.cutCircle}>
                                    <View style={styles.sideProfileImg}>
                                        <Image source={{ uri : this.props.user.avatar  }} resizeMode={'cover'} style={styles.drawImg}/>
                                    </View>
                                </Animatable.View>
                                <Text style={styles.sideName}>{ this.props.user.name }</Text>


                                <View style={[styles.editBtn]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfile')} style={[styles.blueBtn , {width:170, height:40}]} >
                                        <Text style={[styles.whiteText, styles.normalText ]}>{ i18n.t('editAcc') }</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.line , {marginTop:0}]}/>

                            <View style={[styles.directionColumn , {paddingHorizontal:15}]}>
                                <View style={styles.directionRowAlignCenter}>
                                    <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg , styles.transform]} resizeMode={'contain'} />
                                    <Text style={[styles.headerText ]}>{ i18n.t('username') }</Text>
                                </View>
                                <Text style={[styles.headerText , styles.asfs , {marginLeft:25 , fontSize: 14} ]}>{ this.props.user.name }</Text>
                            </View>

                            <Animatable.View animation="fadeInLeft" easing="ease-out" delay={500} style={[styles.line]}/>

                            <View style={[styles.directionColumn , {paddingHorizontal:15}]}>
                                <View style={styles.directionRowAlignCenter}>
                                    <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg , styles.transform]} resizeMode={'contain'} />
                                    <Text style={[styles.headerText ]}>{ i18n.t('email') }</Text>
                                </View>
                                <Text style={[styles.headerText , styles.asfs , {marginLeft:25 , fontSize: 14} ]}>a{ this.props.user.email }</Text>
                            </View>

                            <Animatable.View animation="fadeInRight" easing="ease-out" delay={500} style={[styles.line]}/>

                            <View style={[styles.directionColumn , {paddingHorizontal:15}]}>
                                <View style={styles.directionRowAlignCenter}>
                                    <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg , styles.transform]} resizeMode={'contain'} />
                                    <Text style={[styles.headerText ]}>{ i18n.t('phoneNumber') }</Text>
                                </View>
                                <Text style={[styles.headerText , styles.asfs , {marginLeft:25 , fontSize: 14} ]}>{ this.props.user.mobile }</Text>
                            </View>

                            <View style={[styles.line]}/>

                        </View>
                    </ImageBackground>
                </Content>
                <FooterSection routeName={'profile'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}



const mapStateToProps = ({ profile, lang , auth , notificationCount}) => {
    return {
        user: profile.user,
        lang: lang.lang,
        auth: auth.user,
        notificationCount: notificationCount.notificationCount,
    };
};
export default connect(mapStateToProps, {getNotificationCount})(Profile);
