import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Share, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Switch, Left, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Communications from 'react-native-communications';


const height = Dimensions.get('window').height;


class RestProductDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            SwitchOnValueHolder:false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    stopProduct = (value) =>{
        this.setState({  SwitchOnValueHolder:!this.state.SwitchOnValueHolder})
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('productInfo') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>
                            
                            <Swiper dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                    containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                <Image source={require('../../assets/images/image_twienty.jpg')} style={styles.swiperImg} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/image_one.png')} style={styles.swiperImg} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/events.jpg')}  style={styles.swiperImg} resizeMode={'cover'}/>
                            </Swiper>

                            <View style={[styles.directionRowSpace ,  styles.mb10]}>
                                <Text style={[styles.boldGrayText , styles.normalText ]}>اسم المنتج بالتفصيل</Text>
                                <View style={styles.directionRowAlignCenter}>
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:15} ]}>{ i18n.t('not') }</Text>
                                    <Switch
                                        onValueChange={(value) => this.stopProduct(value)}
                                        value={this.state.SwitchOnValueHolder}
                                        onTintColor={COLORS.gray}
                                        thumbTintColor={COLORS.blue}
                                        tintColor={'#c5c5c5'}
                                        style={styles.switch}
                                    />
                                    <Text style={[styles.blueText , styles.normalText  ]}>{ i18n.t('available') }</Text>
                                </View>
                            </View>


                            <View style={[styles.directionRowAlignCenter, styles.mb10 , {marginRight:10} ]}>
                                <Image source={require('../../assets/images/star_border_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>3/5</Text>
                            </View>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>144 ريال</Text>
                            </View>
                            <View style={[styles.directionRowAlignCenter ]}>
                                <Image source={require('../../assets/images/category.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>تصنيف حلويات</Text>
                            </View>

                            <View style={[styles.directionRowAlignCenter , styles.mt15, styles.mb10]}>
                                <Image source={require('../../assets/images/feather_color.png')} style={[styles.resha , styles.transform]} resizeMode={'contain'} />
                                <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('productInfo') }</Text>
                            </View>

                            <Text style={[styles.grayText , styles.normalText , styles.asfs, styles.writing , {fontSize:13}]}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى،</Text>

                            <TouchableOpacity style={styles.floatingEdit} onPress={() => this.props.navigation.navigate('addProduct')}>
                                <Image source={require('../../assets/images/edit_floting.png')} style={styles.editImg} resizeMode={'contain'}/>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                </Content>
            </Container>

        );
    }
}

export default RestProductDetails;