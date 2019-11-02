import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Share, ImageBackground , Linking} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import Communications from 'react-native-communications';


const height = Dimensions.get('window').height;


class MyResturant extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            active:0
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('myRest') ,
        drawerIcon: (<Image source={require('../../assets/images/chef_menu.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })


    selectAcive(type){
        this.setState({active:type})
    }

    _linkPressed (url){
        Linking.openURL(url);
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


    renderCont() {


        if(this.state.active === 0 ){
            return(
                <View style={styles.directionColumn}>
                    <View style={[styles.directionRowSpace , {flexWrap:'wrap'}]}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('restProductDetails')}>
                            <Image source={require('../../assets/images/image_food_two.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('restProductDetails')}>
                            <Image source={require('../../assets/images/image_food_three.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('restProductDetails')}>
                            <Image source={require('../../assets/images/food_sweet.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('restProductDetails')}>
                            <Image source={require('../../assets/images/image_food_two.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('restProductDetails')}>
                            <Image source={require('../../assets/images/image_food_three.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('restProductDetails')}>
                            <Image source={require('../../assets/images/food_sweet.jpg')} style={styles.productImg} resizeMode={'cover'}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('restProducts')} style={[styles.delAcc , {backgroundColor:COLORS.white}]}>
                        <Text style={[styles.blueText , styles.normalText ,{fontSize:15}]}>{ i18n.t('moreProducts') }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.floatingEdit} onPress={() => this.props.navigation.navigate('editRestProfile')}>
                        <Image source={require('../../assets/images/edit_floting.png')} style={styles.editImg} resizeMode={'contain'}/>
                    </TouchableOpacity>

                </View>
            )
        } else {
            return(
                <View style={styles.directionColumn}>
                    <TouchableOpacity style={styles.directionColumn} onPress={() => Communications.phonecall('012345678', true)}>
                        <View style={styles.directionRowAlignCenter}>
                            <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                            <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('mainNumber') }</Text>
                        </View>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13 , marginLeft:25}]}>012345678</Text>
                    </TouchableOpacity>

                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => Communications.phonecall('012345678911', true)}>
                        <Image  source={require('../../assets/images/smartphone_call_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>012345678911</Text>
                    </TouchableOpacity>
                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed('https://www.aait.sa')}>
                        <Image  source={require('../../assets/images/internet_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>www.aait.sa</Text>
                    </TouchableOpacity>
                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed('https://www.facebook.com')}>
                        <Image  source={require('../../assets/images/facebook_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>www.facebook.com</Text>
                    </TouchableOpacity>
                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed('https://www.twitter.com')}>
                        <Image  source={require('../../assets/images/tiwiter_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>www.twitter.com</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.floatingEdit} onPress={() => this.props.navigation.navigate('editRestContact')}>
                        <Image source={require('../../assets/images/edit_floting.png')} style={styles.editImg} resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
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
                        <Text style={[styles.headerText , {right:20}]}>اسم المطعم</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:0 , paddingTop:20} ]}>


                            <Image source={require('../../assets/images/resturant.jpg')} style={styles.restImg} resizeMode={'cover'}/>


                            <View style={[styles.directionRowAlignCenter , styles.mb10, {paddingHorizontal:20}]}>
                                <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>الرياض . جده . السعودية</Text>
                            </View>


                            <Text style={[styles.grayText , styles.normalText , styles.asfs , styles.writing , {fontSize:13, paddingHorizontal:20}]}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى،</Text>


                            <View style={[styles.directionRowAlignCenter , styles.mt30 , {backgroundColor:'#f2f2f2' , paddingTop:10} ]}>
                                <TouchableOpacity onPress={() => this.selectAcive(0)} style={[styles.restTabs ,
                                    {borderColor:this.state.active === 0 ?COLORS.rose : COLORS.lightGray , borderBottomWidth:this.state.active === 0 ?5: .5}
                                ]}>
                                    <Image source={ this.state.active === 0 ? require('../../assets/images/box_active.png') : require('../../assets/images/box_gray.png')} style={[styles.activeImg]} resizeMode={'contain'} />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => this.selectAcive(1)} style={[styles.restTabs ,
                                    {borderColor:this.state.active === 1 ?COLORS.rose : COLORS.lightGray  , borderBottomWidth:this.state.active === 1 ?5: .5}
                                ]}>
                                    <Image source={ this.state.active === 1 ? require('../../assets/images/telephone_active.png') : require('../../assets/images/telephone_gray.png')} style={[styles.activeImg ]} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.grayCont}>
                                { this.renderCont()}
                            </View>




                        </View>
                    </ImageBackground>

                </Content>
            </Container>

        );
    }
}

export default MyResturant;