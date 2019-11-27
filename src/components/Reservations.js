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
    ScrollView
} from "react-native";
import {Container, Content,  Header, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import FooterSection from './FooterSection';
import {connect} from "react-redux";
import {getReservations, getReservationsByDay , getReservationDetails} from "../actions";
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;




class Reservations extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            activeDate:null,
            loader: 1,
            submitTicket: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        this.setState({ loader: 1 ,submitTicket: false , activeDate:null});
        this.props.getReservations( this.props.lang , this.props.user.token)
        // console.log('1')
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
        // console.log('2')
        this.setState({ loader: nextProps.key });
        // console.log('nextprops reservations' , nextProps)
        if (nextProps.detKey == 1){
            // console.log('3')
            this.setState({ submitTicket: false});
        }

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
            <TouchableOpacity onPress={() => this.goToTicket(item.ticket_id)} style={[styles.eventTouch ]}>
                <Image source={{ uri: item.thumbnail }} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                <View style={[styles.eventCont ]}>
                    <Text style={[styles.whiteText , styles.BoldText]}>{item.event_name}</Text>
                    <View style={styles.dateEvent}>
                        <Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:12 , lineHeight:18}]}>{item.day}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText]}>{ i18n.t('reservations') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')}   style={styles.headerBtn}>
                            <Image source={require('../../assets/images/bell_active.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>


                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection  , {paddingHorizontal:0}]}>

                            <View style={styles.reservationScroll}>
                                <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    {/*<TouchableOpacity onPress={ () => this.setState({activeType:0})} style={[styles.reservationScrollView ,  {backgroundColor:this.state.activeType === 0 ?'#6b4d6b' : 'transparent'}]}>*/}
                                        {/*<Text style={[styles.reservationScrollText]}>15</Text>*/}
                                        {/*<Text style={[styles.reservationScrollText]}>December</Text>*/}
                                    {/*</TouchableOpacity>*/}

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
                            </View>

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
                    </ImageBackground>
                </Content>
                <FooterSection routeName={'reservations'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}
const mapStateToProps = ({ lang , profile , reservations , reservationDetails }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        reservations: reservations.reservations,
        reservationDetails: reservationDetails.reservationDetails,
        key: reservations.key,
        detKey: reservationDetails.key
    };
};
export default connect(mapStateToProps, {getReservations , getReservationsByDay , getReservationDetails})(Reservations);