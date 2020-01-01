import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , ScrollView, FlatList, ImageBackground, Platform,} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {connect} from "react-redux";
import {getOwnerEvent} from "../actions";
import {DoubleBounce} from "react-native-loader";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class MyEvents extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            activeType:0,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('myEvents') ,
        drawerIcon: (<Image source={require('../../assets/images/checklist_menu.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <Animatable.View animation="fadeInUp" easing="ease-out" delay={600}>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('showTicket' , {eventType: this.state.activeType , event_id: item.id})} style={[styles.notiBlock , styles.directionRow]}>
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
                            <Text style={[styles.whiteText , styles.normalText]}>{item.price} {i18n.t('RS')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        );
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

    renderNoData(){
        if (this.props.ownerEvents && (this.props.ownerEvents).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 50, alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
    }

    componentWillMount() {
        this.getEvents(0);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.key });
    }
    getEvents(type){
        this.setState({activeType:type, loader: 1});
        const token =  this.props.user.token;
        this.props.getOwnerEvent( this.props.lang , type , token )
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
                        <Text style={[styles.headerText , {right:20}]}>{i18n.t('myEvents')}</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground2}>

                        <View style={styles.mainScroll}>
                            <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity onPress={ () => this.getEvents(0)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 0 ? COLORS.rose : COLORS.gray}]}>{i18n.t('underConfirmation')}</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 0 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.getEvents(1)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 1 ? COLORS.rose : COLORS.gray}]}>{i18n.t('approved')}</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 1 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.getEvents(4)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 4 ? COLORS.rose : COLORS.gray}]}>{i18n.t('executed')}</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 4 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.getEvents(3)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 3 ? COLORS.rose : COLORS.gray}]}>{i18n.t('cancelled')}</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 3 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:0 ,  marginTop:15}]}>
                            { this.renderNoData() }
                            <FlatList
                                data={this.props.ownerEvents}
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

const mapStateToProps = ({ lang , profile , ownerEvents }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        ownerEvents: ownerEvents.ownerEvents,
        key: ownerEvents.key
    };
};
export default connect(mapStateToProps, {getOwnerEvent})(MyEvents);
