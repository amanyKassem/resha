import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , ScrollView, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getEvents} from "../actions";
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;

class Events extends Component {
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
        this.props.getEvents( this.props.lang )
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
        this.setState({ loader: nextProps.key });
    }


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={ () => this.props.navigation.navigate( this.props.user ? 'bookTicket' : 'login', { event_id: item.id , backRoute:'events'})} style={[styles.notiBlock , styles.directionRow]}>
                <Image source={{ uri: item.thumbnail }} resizeMode={'cover'} style={styles.eventImg}/>
                <View style={[styles.directionColumn , {flex:1}]}>
                    <Text style={[styles.headerText, styles.asfs , styles.writing , {color:'#272727' , lineHeight:23}]}>{item.name}</Text>
                    <View style={[styles.directionRowAlignCenter ]}>
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
        if (this.props.events && (this.props.events).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 20, alignSelf: 'center', width: 200, height: 200 }} />
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
                        <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={ () => this.props.navigation.navigate(this.props.user ? 'searchFilter' : 'login' , {backRoute:'events'})} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/filter_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>


                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground2}>

                        <View style={[styles.directionRowSpace , styles.w100  , styles.mt70, {paddingHorizontal:20 , paddingVertical:15}]}>
                            <View style={[styles.directionColumn , {flex: 1}]}>
                                <Text style={[styles.whiteText, styles.normalText, styles.asfs , styles.writing ]}>{ i18n.t('events') }</Text>
                                <Text style={[styles.whiteText, styles.normalText, styles.asfs , styles.writing , {fontSize:14}]}>{ i18n.t('eventsNo') } : {this.props.count}</Text>
                                <Text style={[styles.whiteText, styles.normalText, styles.asfs , styles.writing, {fontSize:13} ]}>{this.props.desc}</Text>
                            </View>
                            <Image source={require('../../assets/images/events_icon.png')} style={{ width:135, height:135}} resizeMode={'contain'} />
                        </View>

                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:0 ,  marginTop:15}]}>
                            {
                                this.renderNoData()
                            }
                            <FlatList
                                data={this.props.events}
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


const mapStateToProps = ({ lang , profile , events }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        events: events.events,
        desc: events.desc,
        count: events.count,
        key: events.key
    };
};
export default connect(mapStateToProps, {getEvents})(Events);