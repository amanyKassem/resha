import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, FlatList, ImageBackground, Platform,} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getSearchSuggestedEvents} from "../actions";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ProposedEvents extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        this.setState({ loader: 1});
        this.props.getSearchSuggestedEvents( this.props.lang , this.props.user.token )
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
        this.setState({ loader: nextProps.key });
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('bookTicket', { event_id: item.id })} style={[styles.notiBlock , styles.directionRow]}>
                <Image source={{ uri: item.thumbnail }} resizeMode={'cover'} style={styles.eventImg}/>
                <View style={[styles.directionColumn , {flex:1}]}>
                    <Text style={[styles.headerText , styles.asfs , styles.writing , {color:'#272727' , lineHeight:23}]}>{item.name}</Text>
                    <View style={[styles.directionRowAlignCenter  ]}>
                        <Image source={require('../../assets/images/clock_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                        <Text style={[styles.blueText , styles.normalText]}>{item.time}</Text>
                    </View>
                    <View style={[styles.directionRowAlignCenter ]}>
                        <Image source={require('../../assets/images/calendar_icon_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                        <Text style={[styles.blueText , styles.normalText]}>{item.date}</Text>
                    </View>
                    <View style={[styles.eventBtn]}>
                        <Text style={[styles.whiteText , styles.normalText]}>{item.price} { i18n.t('RS') }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderNoData(){
        if (this.props.searchSuggestedEvents && (this.props.searchSuggestedEvents).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 60, alignSelf: 'center', width: 200, height: 200 }} />
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('proposedEvents') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>
                            {this.renderNoData()}
                            <FlatList
                                data={this.props.searchSuggestedEvents}
                                renderItem={({item}) => this.renderItems(item)}
                                numColumns={1}
                                keyExtractor={this._keyExtractor}
                            />

                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , profile , searchSuggestedEvents }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        searchSuggestedEvents: searchSuggestedEvents.searchSuggestedEvents,
        key: searchSuggestedEvents.key
    };
};
export default connect(mapStateToProps, {getSearchSuggestedEvents})(ProposedEvents);
