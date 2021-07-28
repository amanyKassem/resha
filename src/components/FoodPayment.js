import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ImageBackground, Animated} from "react-native";
import {Container, Content, Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {connect} from "react-redux";
import {getSubscriptions, logout, tempAuth} from "../actions";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;

class FoodPayment extends Component {
    constructor(props){
        super(props);

        this.state={
            baqa:'',
            subId:1,
            price: 0
        }
    }

    selectLang(type , id, price){
        this.setState({baqa:type , subId: id, price})
        // alert(id)
    }


    componentWillMount() {
        this.props.getSubscriptions( this.props.lang )
    }

    logout(){
        this.props.logout({ token: this.props.user.token })
        this.props.tempAuth();
        this.props.navigation.navigate('login');
    }

    renderLoader(){
        if (this.props.loader == 0){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <Animatable.View animation="zoomIn" easing="ease-out" iterationCount="infinite">
                        <Image source={require('../../assets/images/icon.png')} style={[styles.logoImg]} resizeMode={'contain'} />
                    </Animatable.View>
                </View>
            );
        }
    }

    render() {


        return (
            <Container>
                <Header style={[styles.header]} noShadow>

                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: 0,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>

                    <View style={[ styles.animatedHeader ]}>
                        <TouchableOpacity  onPress={() => this.logout()}>
                            <Text style={[styles.headerText]}>{i18n.t('logout')}</Text>
                        </TouchableOpacity>


                    </View>
                </Header>
                <Content contentContainerStyle={styles.flexGrow} >
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.langView ]}>

                            <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                            <Text style={[styles.whiteText , styles.normalText , styles.tAC , styles.mb10]}>{ i18n.t('choosePackage') }</Text>
                            {
                                this.props.desc ?
                                    <Text style={[styles.whiteText , styles.normalText , styles.tAC , {lineHeight:20}]}>{this.props.desc}</Text>
                                    :
                                    <View/>
                            }

                            {
                                this.props.subscriptions ?
                                    <View style={[styles.directionRowSpace , styles.w100 , styles.mt50, { justifyContent: 'space-around' }]}>

										{/*{ console.log(this.props.subscriptions[0].name) }*/}
                                        {
											this.props.subscriptions[0] ?
												<TouchableOpacity onPress={() => this.selectLang('month' , this.props.subscriptions[0].id, this.props.subscriptions[0].price)} style={[styles.langBorder , {borderColor:this.state.baqa === 'month' ?COLORS.blue : 'transparent' , height:160, padding: 5}]}>
													<View style={[styles.lang]}>
														<Image source={require('../../assets/images/calender_month.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
														<Text style={[styles.whiteText , styles.normalText , styles.tAC , {marginVertical:15}]}>{ this.props.subscriptions[0].name }</Text>
														<Text style={[styles.whiteText , styles.normalText , styles.tAC]}>{ this.props.subscriptions[0].price } { i18n.t('RS') }</Text>
													</View>
												</TouchableOpacity> : <View />
										}

                                        {
											this.props.subscriptions[1] ?
												<TouchableOpacity onPress={() => this.selectLang('year' , this.props.subscriptions[1].id, this.props.subscriptions[1].price)} style={[styles.langBorder , {borderColor:this.state.baqa === 'year' ?COLORS.blue : 'transparent' , height:160, padding: 5}]}>
													<View style={[styles.lang]}>
														<Image source={require('../../assets/images/calender_year.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
														<Text style={[styles.whiteText , styles.normalText , styles.tAC , {marginVertical:15}]}>{ this.props.subscriptions[1].name }</Text>
														<Text style={[styles.whiteText , styles.normalText , styles.tAC]}>{ this.props.subscriptions[1].price } { i18n.t('RS') }</Text>
													</View>
												</TouchableOpacity> : <View/>
										}

                                    </View>
                                    :
                                    <View/>
                            }

                            <TouchableOpacity disabled={this.state.baqa === ''} onPress={ () => this.props.navigation.navigate('foodPayMethod' , {subscription_id:this.state.subId , price:this.state.price , user_id:this.props.navigation.state.params.user_id}) } style={[styles.blueBtn , styles.mt70, { backgroundColor: this.state.baqa === '' ? '#999' : COLORS.blue }]}>
                                <Text style={[styles.whiteText , styles.normalText , styles.tAC]}>{ i18n.t('next') }</Text>
                            </TouchableOpacity>

                        </View>

                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , subscriptions , profile }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        subscriptions: subscriptions.subscriptions,
        desc: subscriptions.desc,
        loader: subscriptions.key
    };
};
export default connect(mapStateToProps, {getSubscriptions, logout, tempAuth})(FoodPayment);
