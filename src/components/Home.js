import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, I18nManager, ImageBackground} from "react-native";
import {Container, Content,  Header, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import FooterSection from './FooterSection';


const height = Dimensions.get('window').height;

class Home extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('home') ,
        drawerIcon: (<Image source={require('../../assets/images/home_menu.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })

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
                        <Text style={[styles.headerText]}>{ i18n.t('home') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')}   style={styles.headerBtn}>
                            <Image source={require('../../assets/images/bell_active.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>


                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={styles.homeSection}>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('events')} style={[styles.imgParent , styles.w100]}>
                                <Image source={require('../../assets/images/events.jpg')} style={[styles.w100 , {height:180}]} resizeMode={'cover'} />
                                <View style={styles.overlay}>
                                    <Image source={require('../../assets/images/fireworks_wite_descrpion.png')} style={[styles.overImg, styles.transform]} resizeMode={'contain'} />
                                    <Text style={[styles.whiteText, styles.normalText , {fontSize:24}]}>{ i18n.t('events') }</Text>
                                    <Text style={[styles.whiteText, styles.normalText , {fontSize:14}]}>{ i18n.t('eventsNo') } : 512</Text>
                                </View>
                            </TouchableOpacity>

                            <View style={[styles.directionRowSpace, styles.w100]}>
                                <View style={[styles.directionColumn , {width: '47%'}] }>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('restCafe')} style={[styles.imgParent , {width: '100%'}]}>
                                        <Image source={require('../../assets/images/lights.jpg')} style={[styles.w100 , {height:180}]} resizeMode={'cover'} />
                                        <View style={[styles.overlay , {justifyContent:'flex-end' , paddingBottom:30}]}>
                                            <Image source={require('../../assets/images/shop_white.png')} style={[styles.overImg, styles.transform]} resizeMode={'contain'} />
                                            <Text style={[styles.whiteText, styles.normalText , {fontSize:16}]}>{ i18n.t('coffeeRest') }</Text>
                                            <Text style={[styles.whiteText, styles.normalText , {fontSize:14}]}>{ i18n.t('number') } : 512</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('cars')} style={[styles.imgParent , {width: '100%'}]}>
                                        <Image source={require('../../assets/images/track_blue.jpg')} style={[styles.w100 , {height:180}]} resizeMode={'cover'} />
                                        <View style={[styles.overlay , {justifyContent:'flex-end' , paddingBottom:30}]}>
                                            <Image source={require('../../assets/images/delivery_truck_icon.png')} style={[styles.overImg, styles.transform]} resizeMode={'contain'} />
                                            <Text style={[styles.whiteText, styles.normalText , {fontSize:20}]}>{ i18n.t('foodTrack') }</Text>
                                            <Text style={[styles.whiteText, styles.normalText , {fontSize:14}]}>{ i18n.t('number') } : 512</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('productiveFamilies')} style={[styles.imgParent , {width: '47%'}]}>
                                    <Image source={require('../../assets/images/family_descrption.jpg')} style={[styles.w100 , {height:382}]} resizeMode={'cover'} />
                                    <View style={[styles.overlay , {justifyContent:'flex-end' , paddingBottom:30}]}>
                                        <Image source={require('../../assets/images/family_icon.png')} style={[styles.overImg, styles.transform]} resizeMode={'contain'} />
                                        <Text style={[styles.whiteText, styles.normalText , {fontSize:19}]}>{ i18n.t('productiveFamilies') }</Text>
                                        <Text style={[styles.whiteText, styles.normalText , {fontSize:14}]}>{ i18n.t('familiesNumber') } : 512</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ImageBackground>
                </Content>
                <FooterSection routeName={'home'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

export default Home;