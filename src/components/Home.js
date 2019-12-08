import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, ImageBackground} from "react-native";
import {Container, Content,  Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import FooterSection from './FooterSection';
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getHomeCounts} from "../actions";
import * as Animatable from 'react-native-animatable';



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


    componentWillMount() {
        this.props.getHomeCounts( this.props.lang )
    }

    renderLoader(){
        if (this.props.loader == 0){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <DoubleBounce size={20} color={COLORS.mov} />
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.user ? 'notifications' : 'login')}   style={styles.headerBtn}>
                            <Image source={require('../../assets/images/bell_active.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>


                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={styles.homeSection}>

                            <Animatable.View animation="zoomIn" easing="ease-out" delay={300}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('events')} style={[styles.imgParent , styles.w100]}>
                                    <Image source={{ uri: this.props.homeData.events_image }} style={[styles.w100 , {height:180}]} resizeMode={'cover'} />
                                    <View style={styles.overlay}>
                                        <Image source={require('../../assets/images/fireworks_wite_descrpion.png')} style={[styles.overImg, styles.transform]} resizeMode={'contain'} />
                                        <Text style={[styles.whiteText, styles.normalText , {fontSize:24}]}>{this.props.homeData.events_name}</Text>
                                        {/*<Text style={[styles.whiteText, styles.normalText , {fontSize:14}]}>{ i18n.t('eventsNo') } : {this.props.events}</Text>*/}
                                    </View>
                                </TouchableOpacity>
                            </Animatable.View>

                            <View style={[styles.directionRowSpace, styles.w100]}>
                                <View style={[styles.directionColumn , {width: '47%'}] }>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('restCafe' ,{catType : 6})} style={[styles.imgParent , {width: '100%'}]}>
                                            <Image source={{ uri: this.props.homeData.resturants_image }} style={[styles.w100 , {height:180}]} resizeMode={'cover'} />
                                            <View style={[styles.overlay , {justifyContent:'flex-end' , paddingBottom:30}]}>
                                                <Image source={require('../../assets/images/shop_white.png')} style={[styles.overImg, styles.transform]} resizeMode={'contain'} />
                                                <Text style={[styles.whiteText, styles.normalText , {fontSize:16}]}>{this.props.homeData.resturants_name}</Text>
                                                {/*<Text style={[styles.whiteText, styles.normalText , {fontSize:14}]}>{ i18n.t('number') } : {this.props.resturants}</Text>*/}
                                            </View>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                    <Animatable.View animation="fadeInRight" easing="ease-out" delay={500}>
                                        <TouchableOpacity onPress={() => this.props.navigation.navigate('cars',{catType : 7})} style={[styles.imgParent , {width: '100%'}]}>
                                            <Image source={{ uri: this.props.homeData.trucks_image }} style={[styles.w100 , {height:180}]} resizeMode={'cover'} />
                                            <View style={[styles.overlay , {justifyContent:'flex-end' , paddingBottom:30}]}>
                                                <Image source={require('../../assets/images/delivery_truck_icon.png')} style={[styles.overImg, styles.transform]} resizeMode={'contain'} />
                                                <Text style={[styles.whiteText, styles.normalText , {fontSize:20}]}>{this.props.homeData.trucks_name}</Text>
                                                {/*<Text style={[styles.whiteText, styles.normalText , {fontSize:14}]}>{ i18n.t('number') } : {this.props.food_trucks}</Text>*/}
                                            </View>
                                        </TouchableOpacity>
                                    </Animatable.View>
                                </View>


                                <Animatable.View animation="fadeInLeft" easing="ease-out" delay={500} style={{width: '47%'}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('productiveFamilies',{catType : 8})} style={[styles.imgParent , {width: '100%'}]}>
                                        <Image source={{ uri: this.props.homeData.families_image }} style={[styles.w100 , {height:382}]} resizeMode={'cover'} />
                                        <View style={[styles.overlay , {justifyContent:'flex-end' , paddingBottom:30}]}>
                                            <Image source={require('../../assets/images/family_icon.png')} style={[styles.overImg, styles.transform]} resizeMode={'contain'} />
                                            <Text style={[styles.whiteText, styles.normalText , {fontSize:19}]}>{this.props.homeData.families_name}</Text>
                                            {/*<Text style={[styles.whiteText, styles.normalText , {fontSize:14}]}>{ i18n.t('familiesNumber') } : {this.props.families}</Text>*/}
                                        </View>
                                    </TouchableOpacity>
                                </Animatable.View>
                            </View>
                        </View>
                    </ImageBackground>
                </Content>
                <FooterSection routeName={'home'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang , profile , homeCounts }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        resturants: homeCounts.resturants,
        families: homeCounts.families,
        food_trucks: homeCounts.food_trucks,
        events: homeCounts.events,
        homeData: homeCounts.homeData,
        loader: homeCounts.key
    };
};
export default connect(mapStateToProps, {getHomeCounts})(Home);