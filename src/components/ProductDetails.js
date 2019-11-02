import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Share, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Communications from 'react-native-communications';


const height = Dimensions.get('window').height;


class ProductDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            starCount:3,
            starsCount:2,
            savedEvent: false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    onStarRatingPress(rating) {
        this.setState({
            starsCount: rating
        });
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

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        return (
            <Container>

                <Header style={[styles.header]} noShadow>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>

                        <Text style={[styles.headerText]}>{ i18n.t('productInfo') }</Text>

                        <TouchableOpacity onPress={() => this.savedEvent()} style={styles.headerBtn}>
                            <Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>

                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>
                            <View style={styles.directionRowSpace}>
                                <View style={styles.directionRowAlignCenter}>
                                    <View style={styles.borderImg}>
                                        <Image source={require('../../assets/images/profile_pic.png')} style={[styles.footSearchImg]} resizeMode={'cover'} />
                                    </View>
                                    <View style={styles.directionColumn}>
                                        <Text style={[styles.boldGrayText , styles.normalText , styles.mb10]}>اسم صاحب الأسرة</Text>
                                        <StarRating
                                            disabled={true}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                            fullStarColor={'#f0aa0b'}
                                            // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                            starSize={18}
                                            starStyle={styles.starStyle}
                                        />
                                    </View>
                                </View>

                                <TouchableOpacity >
                                    <Image source={require('../../assets/images/whatsapp_icon.png')} style={[styles.overImg]} resizeMode={'cover'} />
                                </TouchableOpacity>
                            </View>

                            <Swiper dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                    containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                <Image source={require('../../assets/images/image_twienty.jpg')} style={styles.swiperImg} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/image_one.png')} style={styles.swiperImg} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/events.jpg')}  style={styles.swiperImg} resizeMode={'cover'}/>
                            </Swiper>

                            <Text style={[styles.boldGrayText , styles.normalText , styles.mb10 , styles.asfs, styles.writing ]}>اسم المنتج بالتفصيل</Text>
                            <View style={[styles.directionRowSpace , styles.mb10]}>
                                <View style={[styles.directionRowAlignCenter , {marginRight:10} ]}>
                                    <Image source={require('../../assets/images/star_border_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                    <Text style={[styles.blueText , styles.normalText]}>3/5</Text>
                                </View>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    rating={this.state.starsCount}
                                    fullStarColor={'#f0aa0b'}
                                    selectedStar={(rating) => this.onStarRatingPress(rating)}
                                    starSize={18}
                                    starStyle={styles.starStyle}
                                />
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
                                <Image source={require('../../assets/images/feather_color.png')} style={[styles.resha]} resizeMode={'contain'} />
                                <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('productInfo') }</Text>
                            </View>

                            <Text style={[styles.grayText , styles.normalText , styles.asfs, styles.writing  , {fontSize:13}]}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى،</Text>


                            <View style={[styles.directionRowSpace , styles.mt15]}>
                                <View style={styles.directionColumn}>
                                    <View style={styles.directionRowAlignCenter}>
                                        <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('mainNumber') }</Text>
                                    </View>
                                    <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13 , marginLeft:25}]}>012345678</Text>
                                </View>
                                <TouchableOpacity onPress={() => Communications.phonecall('012345678', true)}>
                                    <Image source={require('../../assets/images/phone_bink.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>

                            <View style={[styles.line ]}/>

                            <View style={styles.directionRowAlignCenter} >
                                <Image  source={require('../../assets/images/whatsapp_icon.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                                <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>012345678911</Text>
                            </View>

                        </View>
                    </ImageBackground>

                </Content>
            </Container>

        );
    }
}

export default ProductDetails;