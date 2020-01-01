import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, FlatList, ImageBackground, Platform,} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getNotifications , getDeleteNotification} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class Notifications extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            loader:0
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        this.setState({loader:0});
        this.props.getNotifications( this.props.lang , this.props.user.token)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.notifications)
            this.setState({loader:1})
    }

    renderLoader(){
        if (this.state.loader === 0){
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
        if (this.props.notifications && (this.props.notifications).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 60, alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
    }

    deleteNoti(notification_id){
        this.props.getDeleteNotification( this.props.lang , notification_id , this.props.user.token)
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
           <View style={styles.notiBlock}>
                <View style={styles.directionRowSpace}>
                    <View style={styles.directionRowAlignCenter}>
                        <Image source={require('../../assets/images/Feather_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                        <Text style={[styles.headerText , {color:'#272727'}]}>{item.title}</Text>
                    </View>
                    <TouchableOpacity onPress={() => this.deleteNoti(item.notification_id)}>
                        <Image source={require('../../assets/images/close_notifcation.png')} style={[styles.notiClose]} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.grayText , styles.asfs , styles.writing , styles.normalText]}>{item.message}</Text>
           </View>
        );
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('notifications') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground2}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:0}]}>
                            {this.renderNoData()}

                            {
								this.props.notifications ?
									<FlatList
										data={this.props.notifications}
										renderItem={({item}) => this.renderItems(item)}
										numColumns={1}
										keyExtractor={this._keyExtractor}
									/> : <View />
                            }

                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}
const mapStateToProps = ({ lang , notifications , profile }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        notifications: notifications.notifications,
    };
};
export default connect(mapStateToProps, {getNotifications , getDeleteNotification})(Notifications);
