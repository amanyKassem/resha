import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, I18nManager, ImageBackground} from "react-native";
import {Container, Content,  Header, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import FooterSection from './FooterSection';


const height = Dimensions.get('window').height;

class Profile extends Component {
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
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText]}>الملف الشخصي</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')}   style={styles.headerBtn}>
                            <Image source={require('../../assets/images/bell_active.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>


                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , { marginTop:40}]}>

                            <View style={styles.sideImgView}>
                                <View style={styles.cutCircle}>
                                    <View style={styles.sideProfileImg}>
                                        <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={styles.sideDrawerImg}/>
                                    </View>
                                </View>
                                <Text style={styles.sideName}>اماني قاسم</Text>


                                <View style={[styles.editBtn]}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('editProfile')} style={[styles.blueBtn , {width:170, height:40}]} >
                                        <Text style={[styles.whiteText, styles.normalText ]}>تعديل الحساب</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={[styles.line , {marginTop:0}]}/>

                            <View style={[styles.directionColumn , {paddingHorizontal:15}]}>
                                <View style={styles.directionRowAlignCenter}>
                                    <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.headerText ]}>{ i18n.t('username') }</Text>
                                </View>
                                <Text style={[styles.headerText , styles.asfs , {marginLeft:25 , fontSize: 14} ]}>اماني قاسم</Text>
                            </View>

                            <View style={[styles.line]}/>

                            <View style={[styles.directionColumn , {paddingHorizontal:15}]}>
                                <View style={styles.directionRowAlignCenter}>
                                    <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.headerText ]}>{ i18n.t('email') }</Text>
                                </View>
                                <Text style={[styles.headerText , styles.asfs , {marginLeft:25 , fontSize: 14} ]}>aait.sa.com</Text>
                            </View>

                            <View style={[styles.line]}/>

                            <View style={[styles.directionColumn , {paddingHorizontal:15}]}>
                                <View style={styles.directionRowAlignCenter}>
                                    <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.headerText ]}>{ i18n.t('phoneNumber') }</Text>
                                </View>
                                <Text style={[styles.headerText , styles.asfs , {marginLeft:25 , fontSize: 14} ]}>01023456789</Text>
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

export default Profile;