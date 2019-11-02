import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import Modal from "react-native-modal";


const height = Dimensions.get('window').height;


class OrderDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            orderType:0,
            deleteProduct: false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    _deleteProduct = () => this.setState({ deleteProduct: !this.state.deleteProduct });
    _deleteConfirmation() {
        this.setState({ deleteProduct: !this.state.deleteProduct });
        this.props.navigation.navigate('myOrders')
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

    renderBtn(){
        if(this.state.orderType === 0){
            return(
                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('myOrders')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                        <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('myOrders')} style={[styles.disabledBtn, styles.mb15 , {backgroundColor:'transparent'}]}>
                        <Text style={[styles.blueText , styles.normalText ]}>{ i18n.t('refuse') }</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        else if(this.state.orderType === 1){
            return(
                <TouchableOpacity onPress={() => this.props.navigation.navigate('contactUs')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('contactManege') }</Text>
                </TouchableOpacity>
            )
        }
        else if(this.state.orderType === 2 || this.state.orderType === 3){
            return(
                <TouchableOpacity onPress={this._deleteProduct} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('delete') }</Text>
                </TouchableOpacity>
            )
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('orderDet') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>

                            <Text style={[styles.boldGrayText , styles.normalText , styles.mb10, styles.asfs, styles.writing]}>حفلة وسط البلد</Text>

                            <Swiper dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                    containerStyle={[styles.eventswiper , styles.mb15]} showsButtons={false} autoplay={true}>
                                <Image source={require('../../assets/images/image_eleven.jpg')} style={styles.swiperImg} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/image_one.png')} style={styles.swiperImg} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/events.jpg')}  style={styles.swiperImg} resizeMode={'cover'}/>
                            </Swiper>


                            <View style={[styles.directionRowCenter ,  styles.mb15]}>
                                <View style={[styles.directionRowAlignCenter , {paddingHorizontal:15}  ]}>
                                    <Image source={require('../../assets/images/feather_gray.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:13}]}>الهيئة حكومية</Text>
                                </View>
                                <View style={[styles.directionRowAlignCenter , { paddingHorizontal:15 ,borderLeftWidth:1 , borderLeftColor:COLORS.lightGray}]}>
                                    <Image source={require('../../assets/images/feather_gray.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:13}]}>القسم ترفيه</Text>
                                </View>
                            </View>


                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <View style={[styles.directionRowAlignCenter , {marginRight:10} ]}>
                                    <Image source={require('../../assets/images/clock_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.blueText , styles.normalText]}>3:30 AM _ 6:00 PM</Text>
                                </View>
                                <View style={[styles.directionRowAlignCenter ]}>
                                    <Image source={require('../../assets/images/calendar_icon_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.blueText , styles.normalText]}>9/7/2020</Text>
                                </View>
                            </View>

                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('normalPrice') } 144 ريال</Text>
                            </View>

                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/ticket_yellow.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.orangeText , styles.normalText]}>{ i18n.t('vipPrice') } 144 ريال</Text>
                            </View>

                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/chair_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('normalChairs') } 44</Text>
                            </View>

                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/chair_yellow.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.orangeText , styles.normalText]}>{ i18n.t('vipChairs') } 44</Text>
                            </View>

                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>الرياض . جده . السعودية</Text>
                            </View>
                            <Text style={[styles.grayText , styles.normalText, styles.asfs, styles.writing , {fontSize:13}]}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى،</Text>

                            {
                                this.renderBtn()
                            }




                        </View>
                    </ImageBackground>
                    <Modal onBackdropPress={()=> this.setState({ deleteProduct : false })} isVisible={this.state.deleteProduct}>
                        <View style={styles.modalEvent}>

                            <Text style={[styles.headerText , styles.mt15 , {color:'#272727'}]}>{ i18n.t('confirmDelete') }</Text>
                            <Text style={[styles.grayText , styles.mb15 , styles.normalText]}>{ i18n.t('deleteQues') }</Text>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this._deleteConfirmation()} style={[styles.centerBlock ,{width:'50%' , borderRightWidth:.5 , borderColor:COLORS.lightGray }]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._deleteProduct()} style={[styles.centerBlock ,{width:'50%'}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('cancel') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

export default OrderDetails;