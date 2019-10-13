import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    FlatList,
    ImageBackground,
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";


const height = Dimensions.get('window').height;


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
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>تأكيد بيانات التذكرة</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:25} ]}>

                            <View style={styles.directionRowCenter}>

                                <View style={styles.dateView}>
                                    <Text style={[styles.boldGrayText , styles.normalText]}>20 سبتمبر</Text>
                                </View>
                                <View style={styles.remainingView}>
                                    <Text style={[styles.boldGrayText , styles.normalText]}>متبقي ١٠ ايام</Text>
                                </View>

                            </View>

                            <Swiper dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                    containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                <Image source={require('../../assets/images/image_eleven.jpg')} style={styles.swiperImg} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/image_one.png')} style={styles.swiperImg} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/events.jpg')}  style={styles.swiperImg} resizeMode={'cover'}/>
                            </Swiper>

                            <Text style={[styles.boldGrayText , styles.normalText , styles.mb10]}>حفلة وسط البلد</Text>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <View style={[styles.directionRowAlignCenter , {marginRight:10} ]}>
                                    <Image source={require('../../assets/images/clock_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.blueText , styles.normalText]}>3:30 AM</Text>
                                </View>
                                <View style={[styles.directionRowAlignCenter ]}>
                                    <Image source={require('../../assets/images/calendar_icon_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.blueText , styles.normalText]}>9/7/2020</Text>
                                </View>
                            </View>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>144 ريال ( عدد التذاكر 4 )</Text>
                            </View>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>الرياض . جده . السعودية</Text>
                            </View>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/receipt_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>حجز اونلاين</Text>
                            </View>
                            <View style={[styles.directionRowAlignCenter ]}>
                                <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>القسم ترفيه</Text>
                            </View>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <View style={styles.directionRowAlignCenter}>
                                    <View style={styles.borderImg}>
                                        <Image source={require('../../assets/images/profile_pic.png')} style={[styles.footSearchImg]} resizeMode={'cover'} />
                                    </View>
                                    <Text style={[styles.boldGrayText , styles.normalText ]}>اسم المستخدم</Text>
                                </View>

                                <TouchableOpacity onPress={ () => this.props.navigation.navigate('bookTicket')} >
                                    <Text style={[styles.blueText , styles.normalText ]}>التفاصيل</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('ticketPayment')} style={[styles.blueBtn]}>
                                    <Text style={[styles.whiteText , styles.normalText ]}>اكمال</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('events')} style={[styles.disabledBtn]}>
                                    <Text style={[styles.boldGrayText , styles.normalText ]}>حذف التذكرة</Text>
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