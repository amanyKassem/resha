import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , ScrollView, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import FooterSection from './FooterSection';
import {DoubleBounce} from "react-native-loader";
import {connect} from "react-redux";
import {getFavouriteEvents , getFavouriteFamilies , getFavouriteRestaurants , getFavouriteFoodTrucks} from "../actions";
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;

class Saves extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            activeType:0,
            savedEvent: true,
            refreshed: false,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        this.getEvents(0);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.key });
    }
    getEvents(type){
        this.setState({activeType:type, loader: 1});
        const token =  this.props.user.token;
        if (type === 0){
            this.props.getFavouriteEvents( this.props.lang , token )
        }
        else if (type === 1){
            this.props.getFavouriteFamilies( this.props.lang , token )
        }
        else if (type === 2){
            this.props.getFavouriteRestaurants( this.props.lang , token )
        }
        else {
            this.props.getFavouriteFoodTrucks( this.props.lang , token )
        }

    }

    renderEventsNoData(){
        if (this.props.favouriteEvents && (this.props.favouriteEvents).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 70, alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
    }

    renderFamiliesNoData(){
        if (this.props.favouriteFamilies && (this.props.favouriteFamilies).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 70, alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
    }

    renderRestaurantsNoData(){
        if (this.props.favouriteRestaurants && (this.props.favouriteRestaurants).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 70, alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
    }


    renderFoodTrucksNoData(){
        if (this.props.favouriteFoodTrucks && (this.props.favouriteFoodTrucks).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 70, alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
    }

    _keyExtractor = (item, index) => item.id;
    _keyExtractor2 = (item, index) => item.id;
    _keyExtractor3 = (item, index) => item.id;
    _keyExtractor4 = (item, index) => item.id;

    renderFavsEvents = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('bookTicket', { event_id: item.id , backRoute:'saves'})} style={[styles.eventTouch , {marginTop :20 , marginBottom:0}]}>
                <View  style={styles.saveBtn}>
                    {/*<Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />*/}
                    <Image source={require('../../assets/images/bookmark_bink.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                </View>
                <Image source={{uri:item.thumbnail}} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                <View style={[styles.eventCont]}>
                    <Text style={[styles.whiteText , styles.BoldText]}>{item.name}</Text>
                    <View style={styles.dateEvent}>
                        <Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:11 , lineHeight:18 }]}>{item.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderFavsFamilies = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('productDetails', {product_id:item.id , backRoute:'saves'})} style={[styles.eventTouch , {marginTop :20 , marginBottom:0}]}>
                <View  style={styles.saveBtn}>
                    {/*<Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />*/}
                    <Image source={require('../../assets/images/bookmark_bink.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                </View>
                <Image source={{uri:item.thumbnail}} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                <View style={[styles.eventCont]}>
                    <Text style={[styles.whiteText , styles.BoldText]}>{item.name}</Text>

                    {/*<View style={styles.familiesEvent}>*/}
                        {/*<Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:11 , lineHeight:18 }]}>{item.products_count} { i18n.t('product') }</Text>*/}
                    {/*</View>*/}
                </View>
            </TouchableOpacity>
        );
    }

    renderFavsRestaurants = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('productDetails', {product_id:item.id , backRoute:'saves'})} style={[styles.eventTouch , {marginTop :20 , marginBottom:0}]}>
                <View  style={styles.saveBtn}>
                    {/*<Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />*/}
                    <Image source={require('../../assets/images/bookmark_bink.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                </View>
                <Image source={{uri:item.thumbnail}} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                <View style={[styles.eventCont]}>
                    <Text style={[styles.whiteText , styles.BoldText]}>{item.name}</Text>

                    {/*<View style={styles.familiesEvent}>*/}
                        {/*<Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:11 , lineHeight:18 }]}>{item.products_count} { i18n.t('product') }</Text>*/}
                    {/*</View>*/}
                </View>
            </TouchableOpacity>
        );
    }

    renderFavsFoodTrucks = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('productDetails', {product_id:item.id , backRoute:'saves'})} style={[styles.eventTouch , {marginTop :20 , marginBottom:0}]}>
                <View  style={styles.saveBtn}>
                    {/*<Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />*/}
                    <Image source={require('../../assets/images/bookmark_bink.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                </View>
                <Image source={{uri:item.thumbnail}} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                <View style={[styles.eventCont]}>
                    <Text style={[styles.whiteText , styles.BoldText]}>{item.name}</Text>

                    {/*<View style={styles.familiesEvent}>*/}
                        {/*<Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:11 , lineHeight:18 }]}>{item.products_count} { i18n.t('product') }</Text>*/}
                    {/*</View>*/}
                </View>
            </TouchableOpacity>
        );
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

    renderSaves(){
        if (this.state.activeType === 0){
            return(
                <View>
                    { this.renderEventsNoData() }
                    <FlatList
                        data={this.props.favouriteEvents}
                        renderItem={({item}) => this.renderFavsEvents(item)}
                        numColumns={1}
                        keyExtractor={this._keyExtractor}
                        extraData={this.state.refreshed}
                    />
                </View>
            )
        }
        else if (this.state.activeType === 1){
            return(
                <View>
                    { this.renderFamiliesNoData() }
                    <FlatList
                        data={this.props.favouriteFamilies}
                        renderItem={({item}) => this.renderFavsFamilies(item)}
                        numColumns={1}
                        keyExtractor={this._keyExtractor2}
                        extraData={this.state.refreshed}
                    />
                </View>
            )
        } else if (this.state.activeType === 2){
            return(
                <View>
                    { this.renderRestaurantsNoData() }
                    <FlatList
                        data={this.props.favouriteRestaurants}
                        renderItem={({item}) => this.renderFavsRestaurants(item)}
                        numColumns={1}
                        keyExtractor={this._keyExtractor3}
                        extraData={this.state.refreshed}
                    />
                </View>
            )
        } else {
            return(
                <View>
                    { this.renderFoodTrucksNoData() }
                    <FlatList
                        data={this.props.favouriteFoodTrucks}
                        renderItem={({item}) => this.renderFavsFoodTrucks(item)}
                        numColumns={1}
                        keyExtractor={this._keyExtractor4}
                        extraData={this.state.refreshed}
                    />
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('saves') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>


                        <View style={styles.mainScroll}>
                            <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity onPress={ () => this.getEvents(0)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 0 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('events') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 0 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.getEvents(1)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 1 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('productiveFamilies') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 1 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.getEvents(2)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 2 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('rest&cafe') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 2 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.getEvents(3)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 3 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('foodTrack') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 3 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        <View style={[styles.homeSection , {paddingHorizontal:10 ,   marginTop:15}]}>

                            {this.renderSaves()}

                        </View>
                    </ImageBackground>
                </Content>
                <FooterSection routeName={'saves'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , profile , favouriteEvents }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        favouriteEvents: favouriteEvents.favouriteEvents,
        favouriteFamilies: favouriteEvents.favouriteFamilies,
        favouriteRestaurants: favouriteEvents.favouriteRestaurants,
        favouriteFoodTrucks: favouriteEvents.favouriteFoodTrucks,
        key: favouriteEvents.key
    };
};
export default connect(mapStateToProps, {getFavouriteEvents , getFavouriteFamilies , getFavouriteRestaurants , getFavouriteFoodTrucks})(Saves);