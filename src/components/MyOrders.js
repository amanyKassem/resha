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
    ScrollView,
    StyleSheet
} from "react-native";
import {Container, Content,  Header, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {getOrganizerEvents, getOrganizerRejectedEvents} from "../actions";
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";
import {connect} from "react-redux";
import * as Animatable from 'react-native-animatable';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


class MyOrders extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            tabActiveType:1,
            activeDate:null,
            loader: 1

        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('myOrders'),
        drawerIcon: (<Image source={require('../../assets/images/organizer.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })


    componentWillMount() {
        this.setState({activeDate:null});
        this.getEvents(1)
    }


    getEvents(type){
        this.setState({tabActiveType:type, loader: 1});
        const token =  this.props.user.token;
        this.props.getOrganizerEvents( this.props.lang , type , null , token)

        if(type === 3){
            this.props.getOrganizerRejectedEvents( this.props.lang , null , token)
        }


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
        console.log('nextprops organizer' , nextProps.organizerEvents)
    }
    pressedDate(date){
        this.setState({activeDate :date , loader: 1})
        this.props.getOrganizerEvents( this.props.lang , this.state.tabActiveType , date , this.props.user.token)
    }

    renderNoData(){
        if (this.props.organizerEvents.events && (this.props.organizerEvents.events).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 50, alignSelf: 'center', width: 200, height: 200 }} />
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
        return(
            <Animatable.View animation="fadeInUp" easing="ease-out" delay={600}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('orderDetails' , {orderType: this.state.tabActiveType ,event_id: item.id} )} style={[styles.eventTouch ]}>
                    <Image source={{ uri: item.thumbnail }} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                    <View style={[styles.eventCont ]}>
                        <Text style={[styles.whiteText , styles.BoldText]}>{item.name}</Text>
                        <View style={styles.dateEvent}>
                            <Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:12 , lineHeight:18}]}>{item.date}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        );
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
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText , {right:-20}]}>{ i18n.t('myOrders') }</Text>
                        <View style={styles.directionRowAlignCenter}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('qrScan')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/black_qr.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/bell_active.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>


                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={styles.mainScroll}>
                            <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity onPress={ () => this.getEvents(1)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.tabActiveType === 1 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('newOrders') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.tabActiveType === 1 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.getEvents(2)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.tabActiveType === 2 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('accepted') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.tabActiveType === 2 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.getEvents(4)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.tabActiveType === 4 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('executed') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.tabActiveType === 4 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.getEvents(3)} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.tabActiveType === 3 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('refused') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.tabActiveType === 3 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        {
                            this.props.organizerEvents?
                                <View style={[styles.homeSection  , {paddingHorizontal:0 , marginTop:20}]}>

                                    <Animatable.View animation="zoomIn" easing="ease-out" delay={600} style={styles.reservationScroll}>
                                        <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                            {
                                                this.props.organizerEvents.dates.map((date, i) => {
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
                                        { this.renderNoData() }
                                        <FlatList
                                            data={this.props.organizerEvents.events}
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
            </Container>

        );
    }

}

const mapStateToProps = ({ lang , profile , organizerEvents }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        organizerEvents: organizerEvents.organizerEvents,
        key: organizerEvents.key,
    };
};
export default connect(mapStateToProps, {getOrganizerEvents , getOrganizerRejectedEvents})(MyOrders);