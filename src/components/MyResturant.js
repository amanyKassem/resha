import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, Share, ImageBackground , Linking, Platform,} from "react-native";
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
import * as Animatable from 'react-native-animatable';



const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class MyResturant extends Component {
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
        drawerLabel: i18n.t('myRest') ,
        drawerIcon: (<Image source={require('../../assets/images/chef_menu.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })


    selectAcive(type){
        this.setState({active:type})
    }

    _linkPressed (url){
        Linking.openURL(url);
    }
    _linkGoogleMap(lat, lng){
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';

        let url = Platform.select({
            ios : `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label}`
        });

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
                    <Animatable.View animation="zoomIn" easing="ease-out" iterationCount="infinite">
                        <Image source={require('../../assets/images/icon.png')} style={[styles.logoImg]} resizeMode={'contain'} />
                    </Animatable.View>
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
					this.props.showProfile ?
						<View style={styles.directionColumn}>

							{ this.renderNoData() }

							<View style={[styles.directionRowSpace , {flexWrap:'wrap'}]}>

								{
									this.props.showProfile.products.map((product, i) =>{
										return (
											<TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('restProductDetails', {product_id:product.product_id , backRoute:'myResturant'})}>
												<Image source={{ uri: product.image }} style={styles.productImg} resizeMode={'cover'}/>
											</TouchableOpacity>
										)
									})
								}
							</View>

							<TouchableOpacity onPress={() => this.props.navigation.navigate('restProducts', {user_id :this.props.showProfile.user_id , backRoute:'myResturant'})} style={[styles.delAcc , {backgroundColor:COLORS.white}]}>
								<Text style={[styles.blueText , styles.normalText ,{fontSize:15}]}>{ i18n.t('moreProducts') }</Text>
							</TouchableOpacity>

						</View> : <View />

            )
        } else {
            return(
				this.props.showProfile ?
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


                        <TouchableOpacity style={styles.floatingEdit} onPress={() => this.props.navigation.navigate('editRestContact' , {backRoute:'myResturant'
                            , mobile:this.props.showProfile.mobile, phone:this.props.showProfile.phone, website:this.props.showProfile.website,
                            facebook:this.props.showProfile.facebook , twitter:this.props.showProfile.twitter})}>
                            <Image source={require('../../assets/images/edit_floting.png')} style={styles.editImg} resizeMode={'contain'}/>
                        </TouchableOpacity>
                    </View> : <View />
            )
        }

    }

    onFocus(payload){
        this.componentWillMount()
    }

    render() {
        // console.log('oooo' , 'https://google.com/maps/?q=' + this.props.showProfile.latitude +','+ this.props.showProfile.longitude +'')
        // console.log('ffffffffffffff' ,  this.props.showProfile.latitude)

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        return (
            <Container>

                { this.renderLoader() }

				<Header style={[styles.header]} noShadow>
					{
						IS_IPHONE_X ?
							<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
							:
							<View/>
					}
                    {
						this.props.showProfile ?
							<Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
								<TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
									<Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
								</TouchableOpacity>
								<Text style={[styles.headerText ]}>{this.props.showProfile ? this.props.showProfile.name :''}</Text>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('editRestProfile' ,
									{image:this.props.showProfile.image ,name:this.props.showProfile.name
										,category:this.props.showProfile.category_id , address:this.props.showProfile.address ,details:this.props.showProfile.details
										,latitude:this.props.showProfile.latitude,longitude:this.props.showProfile.longitude})}
									style={styles.headerBtn}>
									<Image source={require('../../assets/images/edit.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
								</TouchableOpacity>
							</Animated.View> : <View />
                    }
				</Header>


                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        {
                            this.props.showProfile?
                                <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:0 , paddingTop:20} ]}>


                                    <Image source={{ uri: this.props.showProfile.image }} style={styles.restImg} resizeMode={'cover'}/>


                                    {
                                        this.props.showProfile.latitude ?
                                            <TouchableOpacity onPress={()=> this._linkGoogleMap( this.props.showProfile.latitude , this.props.showProfile.longitude)} style={[styles.directionRowAlignCenter , styles.mb10, {paddingHorizontal:20}]}>
                                                <Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                                                <Text style={[styles.blueText , styles.normalText , {paddingLeft:20}]}>{this.props.showProfile.address}</Text>
                                            </TouchableOpacity> : <View />
                                    }


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
                                :
                                <View/>
                        }

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
export default connect(mapStateToProps, {getShowProfile})(MyResturant);
