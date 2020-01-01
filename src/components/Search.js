import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, FlatList, ImageBackground, Platform } from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {getSearchResult} from "../actions";
import {connect} from "react-redux";
import { DoubleBounce } from 'react-native-loader';
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class Search extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            search:'',
            isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


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


    renderSubmit(){
        if (this.state.isSubmitted) {
            return (
                <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.mt50, styles.mb15 ]}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{alignSelf: 'center'}}/>
                </View>
            )
        }
        return (
            <TouchableOpacity  onPress={() => this.submitSearch()} style={[styles.blueBtn , styles.mt50, styles.mb15]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>

        );
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.searchResult) {
            this.setState({isSubmitted: false});
            this.props.navigation.navigate(this.props.user ? 'searchResult' : 'login', { searchResult : nextProps.searchResult , backRoute:'search' } );
        }
        console.log('nextProps.searchResult' , nextProps.searchResult)
    }

    submitSearch(){
        this.setState({ isSubmitted: true });
        this.props.getSearchResult( this.props.lang , this.state.search )
    }

    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        return (
            <Container>

                <Header style={[styles.header]} noShadow>
					{
						IS_IPHONE_X ?
							<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
							:
							<View/>
					}
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('search') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20} ]}>
                            <View style={styles.inputView}>
                                <Item  style={styles.inputItem} bordered>
                                    {/*<Input autoCapitalize='none' onSubmitEditing={() => this.submitSearch() } onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('search') } placeholderTextColor={'#acabae'} style={styles.modalInput}   />*/}
                                    <Input autoCapitalize='none' onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('search') } placeholderTextColor={'#acabae'} style={styles.modalInput}   />
                                </Item>
                                {/*<TouchableOpacity style={[styles.searchToch]} onPress={() => this.submitSearch()}>*/}
                                <View style={[styles.searchToch]} >
                                    <Image source={require('../../assets/images/search_floting.png')} style={[styles.searchImg , styles.transform]} resizeMode={'contain'}/>
                                </View>
                            </View>

                            <Animatable.View animation="fadeIn" easing="ease-out" delay={300}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.user ? 'proposedEvents' : 'login')} style={[styles.directionRowAlignCenter, styles.mb15]}>
                                    <Image source={require('../../assets/images/image_one_search.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:15} ]}>{ i18n.t('proposedEvents') }</Text>
                                </TouchableOpacity>
                            </Animatable.View>

                            <Animatable.View animation="fadeIn" easing="ease-out" delay={500}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('commonEvents')} style={[styles.directionRowAlignCenter, styles.mb15]}>
                                    <Image source={require('../../assets/images/image_two_search.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:15} ]}>{ i18n.t('commonEvents') }</Text>
                                </TouchableOpacity>
                            </Animatable.View>

                            <Animatable.View animation="fadeIn" easing="ease-out" delay={700}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.user ? 'saves' : 'login')} style={[styles.directionRowAlignCenter, styles.mb15]}>
                                    <Image source={require('../../assets/images/image_three_search.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                    <Text style={[styles.grayText , styles.normalText , {fontSize:15} ]}>{ i18n.t('favsEvents') }</Text>
                                </TouchableOpacity>
                            </Animatable.View>


                            {
                                this.renderSubmit()
                            }
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , profile , searchResult}) => {
    return {
        lang: lang.lang,
        searchResult: searchResult.searchResult,
        user: profile.user,
        loader: searchResult.loader
    };
};
export default connect(mapStateToProps, {getSearchResult})(Search);
