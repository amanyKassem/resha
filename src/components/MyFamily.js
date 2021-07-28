import React, { Component } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	Dimensions,
	Animated,
	ImageBackground,
	Linking,
	Platform,
	FlatList,
} from "react-native";
import {Container, Content, Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Communications from 'react-native-communications';
import {connect} from "react-redux";
import {getShowProfile} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import ProgressImg from 'react-native-image-progress';


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class MyFamily extends Component {
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
        drawerLabel: i18n.t('myFamily'),
        drawerIcon: (<Image source={require('../../assets/images/productive_icon.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
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


	_keyExtractor = (item, index) => item.id;

	renderItems = (item) => {
		return (
			<TouchableOpacity style={{margin:3, flex: 1}} onPress={() => this.props.navigation.navigate('restProductDetails', {product_id:item.product_id, backRoute:'myFamily'})}>
				<ProgressImg source={{ uri: item.image  }} style={[styles.productImg]} resizeMode={'cover'}/>
			</TouchableOpacity>
		);
	};

    renderCont() {

        if(this.state.active === 0 ){
            return(
                <View>

                    {
                        this.renderNoData()
                    }

					<FlatList
						data={this.props.showProfile.products}
						renderItem={({item}) => this.renderItems(item)}
						numColumns={3}
						keyExtractor={item => item.id}
						columnWrapperStyle={{ justifyContent:'space-between'}}
					/>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('restProducts', {user_id :this.props.showProfile.user_id, backRoute:'myFamily'})} style={[styles.delAcc , {backgroundColor:COLORS.white}]}>
                        <Text style={[styles.blueText , styles.normalText ,{fontSize:15}]}>{ i18n.t('moreProducts') }</Text>
                    </TouchableOpacity>
                    {/*<TouchableOpacity style={styles.floatingEdit} onPress={() => this.props.navigation.navigate('editFamilyProfile',*/}
						{/*{image:this.props.showProfile.image ,name:this.props.showProfile.name*/}
							{/*,category:this.props.showProfile.category_id , details:this.props.showProfile.details*/}
							{/*,latitude:this.props.showProfile.latitude,longitude:this.props.showProfile.longitude})}>*/}
                        {/*<Image source={require('../../assets/images/edit.png')} style={styles.editImg} resizeMode={'contain'}/>*/}
                    {/*</TouchableOpacity>*/}
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


                    <TouchableOpacity style={styles.floatingEdit} onPress={() => this.props.navigation.navigate('editFamilyContact', {backRoute:'myFamily'
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
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>
                    {
						this.props.showProfile ?
							<Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
								<TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
									<Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
								</TouchableOpacity>
								<Text style={[styles.headerText]}>{this.props.showProfile ? this.props.showProfile.name :''}</Text>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('editFamilyProfile',
									{image:this.props.showProfile.image ,name:this.props.showProfile.name
										,category:this.props.showProfile.category_id , details:this.props.showProfile.details
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

                                    <Animatable.View animation="zoomIn" easing="ease-out" delay={600}>
                                        <ProgressImg source={{ uri: this.props.showProfile.image  }} style={styles.restImg} resizeMode={'contain'}/>
                                    </Animatable.View>


                                    {/*<TouchableOpacity  onPress={()=> this._linkPressed('https://google.com/maps/?q=' + this.props.showProfile.latitude +','+ this.props.showProfile.longitude +'')} style={[styles.directionRowAlignCenter , styles.mb10, {paddingHorizontal:20}]}>*/}
                                        {/*<Image source={require('../../assets/images/placeholder_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />*/}
                                        {/*<Text style={[styles.blueText , styles.normalText , {paddingLeft:20}]}>{this.props.showProfile.address}</Text>*/}
                                    {/*</TouchableOpacity>*/}


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
export default connect(mapStateToProps, {getShowProfile})(MyFamily);
