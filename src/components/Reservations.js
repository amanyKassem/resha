import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    FlatList,
    ImageBackground,
    ScrollView, Platform
} from "react-native";
import {Container, Content,  Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import FooterSection from './FooterSection';
import {connect} from "react-redux";
import {getReservations, getReservationsByDay , getReservationDetails , getNotificationCount} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';     


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class Reservations extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            activeDate:null,
            loader: 1,
            submitTicket: false,
            notify:false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        const token = this.props.auth ? this.props.auth.data.token : null;
        this.setState({ loader: 1 ,submitTicket: false , activeDate:null});
        this.props.getReservations( this.props.lang , this.props.user.token)
        this.props.getNotificationCount( this.props.lang , token , this.props);
        console.log('1' , this.props.user.token)
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
        // console.log('2')
        this.setState({ loader: nextProps.key });
        // console.log('nextprops reservations' , nextProps)
        if (nextProps.detKey == 1){
            // console.log('3')
            this.setState({ submitTicket: false});
        }

        if(nextProps.notificationCount)
            this.setState({notify:nextProps.notificationCount.notify})

    }
    pressedDate(date){
        this.setState({activeDate :date , loader: 1 })
        this.props.getReservationsByDay( this.props.lang , date , this.props.user.token)
    }


    goToTicket(ticket_id){
        this.setState({ submitTicket: true , loader: 1 });
        this.props.getReservationDetails( this.props.lang ,
            ticket_id,
            this.props.user.token,
            this.props
        )
        // console.log('4')
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
        return(
            <Animatable.View animation="fadeInUp" easing="ease-out" delay={600}>
                <TouchableOpacity onPress={() => this.goToTicket(item.ticket_id)} style={[styles.eventTouch ]}>
                    <Image source={{ uri: item.thumbnail  }} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                    <View style={[styles.eventCont ]}>
                        <Text style={[styles.whiteText , styles.BoldText]}>{item.event_name}</Text>
                        <View style={styles.dateEvent}>
                            <Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:12 , lineHeight:18}]}>{item.day}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        );
    }


    renderNoData(){
        if (this.props.reservations.tickets && (this.props.reservations.tickets).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 50, alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
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
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText]}>{ i18n.t('reservations') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')}   style={styles.headerBtn}>
                            <Image source={this.state.notify ? require('../../assets/images/bell_active.png') :  require('../../assets/images/bell_non_active.png') } style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>


                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        {
                            this.props.reservations ?
                                <View style={[styles.homeSection  , {paddingHorizontal:0}]}>

                                    <Animatable.View animation="zoomIn" easing="ease-out" delay={600} style={styles.reservationScroll}>
                                        <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                            {
                                                this.props.reservations.dates.map((date, i) => {
                                                        return(
                                                            <TouchableOpacity onPress={ () => this.pressedDate(date.date)} key={i} style={[styles.reservationScrollView ,  {backgroundColor:this.state.activeDate === date.date ?'#6b4d6b' : 'transparent'}]}>
                                                                <Text style={[styles.reservationScrollText]}>{date.day}</Text>
                                                                <Text style={[styles.reservationScrollText]}>{date.month}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    }
                                                )
                                            }

                                        </ScrollView>
                                    </Animatable.View>

                                    <View style={{paddingHorizontal:10}}>
                                        {
                                            this.renderNoData()
                                        }
                                        <FlatList
                                            data={this.props.reservations.tickets}
                                            renderItem={({item}) => this.renderItems(item)}
                                            numColumns={1}
                                            keyExtractor={this._keyExtractor}
                                        />
                                    </View>

                                </View>
                                :
                                <View/>
                        }

                    </ImageBackground>
                </Content>
                <FooterSection routeName={'reservations'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}
const mapStateToProps = ({ lang , profile , reservations , reservationDetails , notificationCount, auth}) => {
    return {
        lang: lang.lang,
        user: profile.user,
        reservations: reservations.reservations,
        reservationDetails: reservationDetails.reservationDetails,
        notificationCount: notificationCount.notificationCount,
        key: reservations.key,
        detKey: reservationDetails.key,
        auth: auth.user
    };
};
export default connect(mapStateToProps, {getReservations , getReservationsByDay , getReservationDetails , getNotificationCount})(Reservations);
