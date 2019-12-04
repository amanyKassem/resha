import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Share, ImageBackground , Linking} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import Communications from 'react-native-communications';
import {connect} from "react-redux";
import {getShowProfile} from "../actions";
import {NavigationEvents} from "react-navigation";
import {DoubleBounce} from "react-native-loader";


const height = Dimensions.get('window').height;


class MyCar extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            active:0,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel:  i18n.t('myCar')  ,
        drawerIcon: (<Image source={require('../../assets/images/food_truck_icon.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })


    selectAcive(type){
        this.setState({active:type})
    }

    _linkPressed (url){
        Linking.openURL(url);
    }

    componentWillMount() {
        this.setState({ loader: 1});
        this.props.getShowProfile( this.props.lang , this.props.user.token)
    }

    renderLoader(){
        if (this.state.loader == 1){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <DoubleBounce size={20} color={COLORS.mov} />
                </View>
            );
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.key  });
    }


    renderNoData(){
        if (this.props.showProfile.products && (this.props.showProfile.products).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
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

                    {
                        this.renderNoData()
                    }

                    <View style={[styles.directionRowSpace , {flexWrap:'wrap'}]}>

                        {
                            this.props.showProfile.products.map((product, i) =>{
                                return (
                                    <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('restProductDetails', {product_id:product.product_id, backRoute:'myCar'})}>
                                        <Image source={{ uri: product.image }} style={styles.productImg} resizeMode={'cover'}/>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('restProducts', {user_id :this.props.showProfile.user_id, backRoute:'myCar'})} style={[styles.delAcc , {backgroundColor:COLORS.white}]}>
                        <Text style={[styles.blueText , styles.normalText ,{fontSize:15}]}>{ i18n.t('moreProducts') }</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.floatingEdit} onPress={() => this.props.navigation.navigate('editCarProfile')}>
                        <Image source={require('../../assets/images/edit_floting.png')} style={styles.editImg} resizeMode={'contain'}/>
                    </TouchableOpacity>

                </View>
            )
        } else {
            return(
                <View style={styles.directionColumn}>
                    <TouchableOpacity style={styles.directionColumn} onPress={() => Communications.phonecall(this.props.showProfile.mobile, true)}>
                        <View style={styles.directionRowAlignCenter}>
                            <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                            <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('mainNumber') }</Text>
                        </View>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13 , marginLeft:25}]}>{this.props.showProfile.mobile}</Text>
                    </TouchableOpacity>

                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => Communications.phonecall(this.props.showProfile.phone, true)}>
                        <Image  source={require('../../assets/images/smartphone_call_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.showProfile.phone}</Text>
                    </TouchableOpacity>
                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed(this.props.showProfile.website)}>
                        <Image  source={require('../../assets/images/internet_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.showProfile.website}</Text>
                    </TouchableOpacity>
                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed(this.props.showProfile.facebook)}>
                        <Image  source={require('../../assets/images/facebook_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.showProfile.facebook}</Text>
                    </TouchableOpacity>
                    <View style={[styles.line ]}/>

                    <TouchableOpacity style={styles.directionRowAlignCenter} onPress={() => this._linkPressed(this.props.showProfile.twitter)}>
                        <Image  source={require('../../assets/images/tiwiter_blue.png')} style={[styles.headerMenu,{marginRight:10}]} resizeMode={'contain'}/>
                        <Text style={[styles.grayText , styles.normalText , styles.asfs , {fontSize:13}]}>{this.props.showProfile.twitter}</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.floatingEdit} onPress={() => this.props.navigation.navigate('editCarContact', {backRoute:'myCar'
                        , mobile:this.props.showProfile.mobile, phone:this.props.showProfile.phone, website:this.props.showProfile.website,
                        facebook:this.props.showProfile.facebook , twitter:this.props.showProfile.twitter})}>
                        <Image source={require('../../assets/images/edit_floting.png')} style={styles.editImg} resizeMode={'contain'}/>
                    </TouchableOpacity>
                </View>
            )
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
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{this.props.showProfile ? this.props.showProfile.name :''}</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:0 , paddingTop:20} ]}>


                            <Image source={{ uri: this.props.showProfile.image }} style={styles.restImg} resizeMode={'cover'}/>


                            <View style={[styles.directionRowAlignCenter , styles.mb10, {paddingHorizontal:20}]}>
                                <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                <Text style={[styles.blueText , styles.normalText]}>{this.props.showProfile.address}</Text>
                            </View>


                            <Text style={[styles.grayText , styles.normalText , styles.asfs , styles.writing , {fontSize:13, paddingHorizontal:20}]}>{this.props.showProfile.details}</Text>

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

const mapStateToProps = ({ lang , showProfile , profile }) => {
    return {
        lang: lang.lang,
        showProfile: showProfile.showProfile,
        user: profile.user,
        key: showProfile.key
    };
};
export default connect(mapStateToProps, {getShowProfile})(MyCar);