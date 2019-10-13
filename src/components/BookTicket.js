import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Share, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';


const height = Dimensions.get('window').height;


class BookTicket extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            starCount:3,
            savedEvent: false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    onStarRatingPress(rating) {
        this.setState({
            starCount: rating
        });
    }


    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'React Native | A framework for building native apps using React',
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


                        <View style={styles.directionRowAlignCenter}>
                            <TouchableOpacity onPress={() => this.savedEvent()} style={styles.headerBtn}>
                                <Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.onShare} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/share_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>

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
                                        <Text style={[styles.boldGrayText , styles.normalText , styles.mb10]}>اسم صاحب الفاعلية</Text>
                                        <StarRating
                                            disabled={false}
                                            maxStars={5}
                                            rating={this.state.starCount}
                                            fullStarColor={'#f0aa0b'}
                                            selectedStar={(rating) => this.onStarRatingPress(rating)}
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
                                <Image source={require('../../assets/images/image_eleven.jpg')} style={styles.swiperImg} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/image_one.png')} style={styles.swiperImg} resizeMode={'cover'}/>
                                <Image source={require('../../assets/images/events.jpg')}  style={styles.swiperImg} resizeMode={'cover'}/>
                            </Swiper>

                            <Text style={[styles.boldGrayText , styles.normalText , styles.mb10]}>حفلة وسط البلد</Text>
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
                                <Text style={[styles.blueText , styles.normalText]}>144 ريال</Text>
                            </View>
                            <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>الرياض . جده . السعودية</Text>
                            </View>
                            <Text style={[styles.grayText , styles.normalText , {fontSize:13}]}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى،</Text>


                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('bookType')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                <Text style={[styles.whiteText , styles.normalText ]}>حجز</Text>
                            </TouchableOpacity>




                        </View>
                    </ImageBackground>

                </Content>
            </Container>

        );
    }
}

export default BookTicket;