import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Share, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Switch, Left, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Communications from 'react-native-communications';
import {connect} from "react-redux";
import {getShowProduct , getProductAvailability} from "../actions";
import {NavigationEvents} from "react-navigation";
import {DoubleBounce} from "react-native-loader";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;


class RestProductDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            SwitchOnValueHolder:false,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        this.setState({ loader: 1});
        this.props.getShowProduct( this.props.lang , this.props.navigation.state.params.product_id , this.props.user.token)
    }

    renderLoader(){
        if (this.state.loader == 1){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <Animatable.View animation="zoomIn" easing="ease-out" iterationCount="infinite">
                        <Image source={require('../../assets/images/icon.png')} style={[styles.logoImg]} resizeMode={'contain'} />
                    </Animatable.View>
                </View>
            );
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.key , SwitchOnValueHolder: nextProps.showProduct.available });
    }

    stopProduct = (value) =>{
        this.props.getProductAvailability( this.props.lang , this.props.navigation.state.params.product_id , this.props.user.token)
        this.setState({SwitchOnValueHolder:value})
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

    onFocus(payload){
        this.componentWillMount()
    }
    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        return (
            <Container>

                { this.renderLoader() }
                <Header style={[styles.header]} noShadow>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.backRoute)} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('productInfo') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        {
                            this.props.showProduct?
                                <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>

                                    <Swiper dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                            containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                        {
                                            this.props.showProduct.images.map((img, i) =>{
                                                return (
                                                    <Image key={i} source={{ uri: img.image }}  style={styles.swiperImg} resizeMode={'cover'}/>
                                                )
                                            })
                                        }
                                    </Swiper>

                                    <View style={[styles.directionRowSpace ,  styles.mb10]}>
                                        <Text style={[styles.boldGrayText , styles.normalText ]}>{this.props.showProduct.name}</Text>
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
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.showProduct.rates}/5</Text>
                                    </View>
                                    <View style={[styles.directionRowAlignCenter , styles.mb10]}>
                                        <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.showProduct.price} { i18n.t('RS') }</Text>
                                    </View>
                                    <View style={[styles.directionRowAlignCenter ]}>
                                        <Image source={require('../../assets/images/category.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                        <Text style={[styles.blueText , styles.normalText]}>{this.props.showProduct.category}</Text>
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mt15, styles.mb10]}>
                                        <Image source={require('../../assets/images/feather_color.png')} style={[styles.resha , styles.transform]} resizeMode={'contain'} />
                                        <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('productInfo') }</Text>
                                    </View>

                                    <Text style={[styles.grayText , styles.normalText , styles.asfs, styles.writing , {fontSize:13}]}>{this.props.showProduct.details}</Text>

                                    <TouchableOpacity style={styles.floatingEdit} onPress={() => this.props.navigation.navigate('editProduct' , {product_id:this.props.navigation.state.params.product_id,
                                        prodName :this.props.showProduct.name , price:this.props.showProduct.price , moreDet: this.props.showProduct.details ,base64:this.props.showProduct.images, backRoute:'restProductDetails'})}>
                                        <Image source={require('../../assets/images/edit_floting.png')} style={styles.editImg} resizeMode={'contain'}/>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View/>
                        }

                    </ImageBackground>

                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , showProduct , profile }) => {
    return {
        lang: lang.lang,
        showProduct: showProduct.showProduct,
        user: profile.user,
        key: showProduct.key,
    };
};
export default connect(mapStateToProps, {getShowProduct , getProductAvailability})(RestProductDetails);
