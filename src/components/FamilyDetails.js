import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    Share,
    ImageBackground,
    Platform,
    Linking,
    FlatList
} from "react-native";
import {Container, Content, Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {SetFavouriteEvent, getProfileDetails} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';
import ProgressImg from 'react-native-image-progress';
import FamilyProduct from './FamilyProduct'

const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class FamilyDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            loader: 1,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        this.setState({ loader: 1});
        const token = this.props.user ? this.props.user.token : null;
        this.props.getProfileDetails( this.props.lang , this.props.navigation.state.params.user_id ,token)
    }
    _linkPressed (url){
        Linking.openURL(url);
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
        // if(nextProps.navigation.state.params && nextProps.navigation.state.params.isLoader)
            this.setState({loader:0})
        // console.log('nextProps.profileDetails.is_save' , nextProps.profileDetails.is_save)
        // this.setState({ savedEvent: nextProps.profileDetails.is_save });
    }

    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    Platform.OS === 'ios'? 'https://apps.apple.com/us/app/reesh-ريش/id1490248883?ls=1' : 'https://play.google.com/store/apps/details?id=com.app.reesh',
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

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return (

          <FamilyProduct key={item.id} data={item} navigation={this.props.navigation}/>

        );
    };

    // renderItems = (item) => {
    //     return (
    //         <TouchableOpacity style={{marginBottom:7}} onPress={() => this.props.navigation.navigate('productDetails', {product_id:item.product_id , backRoute:'familyDetails'})}>
    //             <ProgressImg source={{ uri: item.image }} style={styles.productImg} resizeMode={'cover'}/>
    //         </TouchableOpacity>
    //     );
    // };

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
					{
						IS_IPHONE_X ?
							<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
							:
							<View/>
					}
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <View style={[styles.directionRowAlignCenter]}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.backRoute)} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            {
                                this.props.profileDetails ?
                                    <View style={[styles.directionRowAlignCenter]}>
                                        <View style={styles.borderImg}>
                                            <ProgressImg source={{ uri: this.props.profileDetails.image }} style={[styles.footSearchImg]} resizeMode={'cover'} />
                                        </View>
                                        <Text style={[styles.whiteText , styles.normalText , styles.mb10]}>{this.props.profileDetails.name}</Text>
                                    </View>
                                    :
                                    null
                            }

                        </View>


                        <View style={styles.directionRowAlignCenter}>
                            {
                                this.props.profileDetails ?
                                    <TouchableOpacity onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone='+this.props.profileDetails.mobile)}>
                                        <Image source={require('../../assets/images/whatsapp_icon.png')} style={[styles.headerMenu]} resizeMode={'cover'} />
                                    </TouchableOpacity>
                                            :
                                            null
                            }
                            <TouchableOpacity onPress={this.onShare} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/share_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>

                    </Animated.View>
                </Header>

                <Content  bounces={false} scrollEnabled={false} contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground2}>
                        {
                            this.props.profileDetails ?
                                <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingTop:20 , paddingBottom:30} ]}>
                                    {/*<View style={styles.directionRowSpace}>*/}
                                        {/*<Text style={[styles.boldGrayText , styles.normalText , styles.mb10]}>{this.props.profileDetails.name}</Text>*/}

                                        {/*<TouchableOpacity onPress={() => this._linkPressed('https://api.whatsapp.com/send?phone='+this.props.profileDetails.mobile)}>*/}
                                            {/*<Image source={require('../../assets/images/whatsapp_icon.png')} style={[styles.overImg]} resizeMode={'cover'} />*/}
                                        {/*</TouchableOpacity>*/}
                                    {/*</View>*/}

                                    {/*<ProgressImg source={{ uri: this.props.profileDetails.image }}*/}
                                           {/*//  indicator={ProgressBar}*/}
                                           {/*// indicatorProps={{*/}
                                           {/*//     size: 80,*/}
                                           {/*//     borderWidth: 0,*/}
                                           {/*//     color: 'rgba(150, 150, 150, 1)',*/}
                                           {/*//     unfilledColor: 'rgba(200, 200, 200, 0.2)'*/}
                                           {/*// }}*/}
                                           {/*style={[styles.restImg , {width:'100%'}]} resizeMode={'cover'}/>*/}



                                    {/*<Text style={[styles.grayText , styles.normalText , styles.asfs, styles.writing  , {fontSize:13}]}>{this.props.profileDetails.details}</Text>*/}

                                    {/*<View style={[styles.directionRowAlignCenter , styles.mt15 , styles.mb15]}>*/}
                                        {/*<Image source={require('../../assets/images/feather_color.png')} style={[styles.resha]} resizeMode={'contain'} />*/}
                                        {/*<Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('products') }</Text>*/}
                                    {/*</View>*/}

                                    {/*<View style={[styles.directionRowSpace , {flexWrap:'wrap'}]}>*/}

                                    {/*    {*/}
                                    {/*        this.props.profileDetails.products.map((product, i) =>{*/}
                                    {/*            return (*/}
                                    {/*                <TouchableOpacity key={i} onPress={() => this.props.navigation.navigate('productDetails', {product_id:product.product_id , backRoute:'familyDetails'})}>*/}
                                    {/*                    <Image source={{ uri: product.image }} style={styles.productImg} resizeMode={'cover'}/>*/}
                                    {/*                </TouchableOpacity>*/}
                                    {/*            )*/}
                                    {/*        })*/}
                                    {/*    }*/}

                                    {/*</View>*/}
                                    <FlatList
                                        data={this.props.profileDetails.products}
                                        renderItem={({item}) => this.renderItems(item)}
                                        numColumns={1}
                                        keyExtractor={this._keyExtractor}
                                        // style={{ backgroundColor:'#000'}}
                                        // columnWrapperStyle={{ backgroundColor:'#000'}}
                                    />


                                    {/*<TouchableOpacity onPress={() => this.props.navigation.navigate('products', {user_id :this.props.navigation.state.params.user_id , backRoute:'familyDetails' , catType:this.props.navigation.state.params.catType })} style={styles.delAcc}>*/}
                                        {/*<Text style={[styles.blueText , styles.normalText ,{fontSize:15}]}>{ i18n.t('moreProducts') }</Text>*/}
                                    {/*</TouchableOpacity>*/}
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

const mapStateToProps = ({ lang , profileDetails , profile }) => {
    return {
        lang: lang.lang,
        profileDetails: profileDetails.profileDetails,
        user: profile.user,
        key: profileDetails.key
    };
};
export default connect(mapStateToProps, {getProfileDetails , SetFavouriteEvent})(FamilyDetails);
