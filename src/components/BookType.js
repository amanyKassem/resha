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
	Platform
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getEventTickets , getTicketsImgs} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';



class BookType extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            type:'vip',
            price : '',
            vipPrice :'',
            goldPrice :'',
            normalPrice :'',
            ticketsNum:'',
            vipTicketsNum :'',
            goldTicketsNum :'',
            normalTicketsNum :'',
            ticketType:'',
            vipTicketType :'',
            goldTicketType :'',
            normalTicketType :'',
            ticketName : i18n.t('vipTicket'),
            // imgSrc:require('../../assets/images/ticket_vip.png'),
            imgSrc:'',
            vipImgSrc:'',
            goldImgSrc:'',
            normalImgSrc:'',
            event_info:[],
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        this.setState({ loader: 1});
        this.props.getTicketsImgs( this.props.lang )
        this.props.getEventTickets( this.props.lang , this.props.navigation.state.params.event_id )
    }

    componentWillReceiveProps(nextProps) {
        console.log( 'nextProps...' , nextProps);

        if (nextProps.eventTickets.tickets_info){
			this.setState({
				loader: nextProps.key,
				imgSrc : nextProps.tickets[0].image,
				vipImgSrc : nextProps.tickets[0].image,
				goldImgSrc : nextProps.tickets[1].image,
				normalImgSrc : nextProps.tickets[2].image,
				price : nextProps.eventTickets.tickets_info[2].ticket_price,
				vipPrice : nextProps.eventTickets.tickets_info[2].ticket_price,
				goldPrice : nextProps.eventTickets.tickets_info[1].ticket_price,
				normalPrice : nextProps.eventTickets.tickets_info[0].ticket_price,
				vipTicketsNum : nextProps.eventTickets.tickets_info[2].available_count,
				goldTicketsNum : nextProps.eventTickets.tickets_info[1].available_count,
				normalTicketsNum : nextProps.eventTickets.tickets_info[0].available_count,
				vipTicketType : nextProps.eventTickets.tickets_info[2].ticket_type,
				goldTicketType : nextProps.eventTickets.tickets_info[1].ticket_type,
				normalTicketType : nextProps.eventTickets.tickets_info[0].ticket_type,
				event_info : nextProps.eventTickets.event_info,
			})
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

    selectType(type , price , name , imgSrc , ticketsNum , ticketType){
        this.setState({type , price , ticketName: name , imgSrc , ticketsNum , ticketType})
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

        const vipPrice = this.state.vipPrice ;
        const goldPrice = this.state.goldPrice ;
        const normalPrice = this.state.normalPrice ;
        const vipTicketsNum = this.state.vipTicketsNum ;
        const goldTicketsNum = this.state.goldTicketsNum ;
        const normalTicketsNum = this.state.normalTicketsNum ;
        const vipTicketType = this.state.vipTicketType ;
        const goldTicketType = this.state.goldTicketType ;
        const normalTicketType = this.state.normalTicketType ;
        const vipImgSrc = this.state.vipImgSrc;
        const goldImgSrc = this.state.goldImgSrc;
        const normalImgSrc = this.state.normalImgSrc;

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
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('bookTicket', {isLoader:true})} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('ticketType') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>

                            <TouchableOpacity onPress={() => this.selectType('vip' , vipPrice , i18n.t('vipTicket') , vipImgSrc , vipTicketsNum , vipTicketType)} style={[styles.ticketViewType , styles.mb15, {backgroundColor:this.state.type === 'vip' ? '#deeeee' : 'transparent'}]}>
                                <Image source={{ uri: vipImgSrc }} style={[styles.ticketType]} resizeMode={'contain'} />
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'30%'} ]}>{ i18n.t('vipTicket') }</Text>
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'50%'} ]}>{ i18n.t('price') } {vipPrice} { i18n.t('RS') }</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.selectType('gold' , goldPrice , i18n.t('goldTicket') , goldImgSrc , goldTicketsNum , goldTicketType)} style={[styles.ticketViewType , styles.mb15, {backgroundColor:this.state.type === 'gold' ? '#deeeee' : 'transparent'}]}>
                                <Image source={{ uri: goldImgSrc  }} style={[styles.ticketType]} resizeMode={'contain'} />
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'30%'} ]}>{ i18n.t('goldTicket') }</Text>
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'50%'} ]}>{ i18n.t('price') } {goldPrice} { i18n.t('RS') }</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.selectType('normal' , normalPrice, i18n.t('normalTicket') , normalImgSrc , normalTicketsNum , normalTicketType)} style={[styles.ticketViewType , {backgroundColor:this.state.type === 'normal' ? '#deeeee' : 'transparent'}]}>
                                <Image source={{ uri: normalImgSrc }} style={[styles.ticketType]} resizeMode={'contain'} />
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'30%'} ]}>{ i18n.t('normalTicket') }</Text>
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'50%'} ]}>{ i18n.t('price') } {normalPrice} { i18n.t('RS') }</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('continueBooking', { event_id : this.props.navigation.state.params.event_id  , price : this.state.price ,
                                ticketName : this.state.ticketName ,imgSrc : this.state.imgSrc , available_count : this.state.ticketsNum,
                                ticket_type : this.state.ticketType ,event_info : this.state.event_info  })} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('book') }</Text>
                            </TouchableOpacity>

                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang , eventTickets , ticketsImgs }) => {
    return {
        lang: lang.lang,
        eventTickets: eventTickets.eventTickets,
        tickets: ticketsImgs.tickets,
        key: eventTickets.key
    };
};
export default connect(mapStateToProps, {getEventTickets , getTicketsImgs})(BookType);
