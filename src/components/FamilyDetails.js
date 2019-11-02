import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Share, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';


const height = Dimensions.get('window').height;


class FamilyDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            savedEvent: false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });




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
                                <Text style={[styles.boldGrayText , styles.normalText , styles.mb10]}>اسم الأسرة</Text>

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


                            <Text style={[styles.grayText , styles.normalText , styles.asfs, styles.writing  , {fontSize:13}]}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى،</Text>

                            <View style={[styles.directionRowAlignCenter , styles.mt15 , styles.mb15]}>
                                <Image source={require('../../assets/images/feather_color.png')} style={[styles.resha]} resizeMode={'contain'} />
                                <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('products') }</Text>
                            </View>

                            <View style={[styles.directionRowSpace , {flexWrap:'wrap'}]}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('productDetails')}>
                                    <Image source={require('../../assets/images/image_food_two.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('productDetails')}>
                                    <Image source={require('../../assets/images/image_food_three.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('productDetails')}>
                                    <Image source={require('../../assets/images/food_sweet.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('productDetails')}>
                                    <Image source={require('../../assets/images/image_food_two.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('productDetails')}>
                                    <Image source={require('../../assets/images/image_food_three.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('productDetails')}>
                                    <Image source={require('../../assets/images/food_sweet.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={styles.delAcc}>
                                <Text style={[styles.blueText , styles.normalText ,{fontSize:15}]}>{ i18n.t('moreProducts') }</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>

                </Content>
            </Container>

        );
    }
}

export default FamilyDetails;