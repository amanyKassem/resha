import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    ImageBackground,
    Platform,
} from "react-native";
import {Container, Content, Header, Right, Left, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import { WebView } from 'react-native-webview';
import {connect} from "react-redux";
import { getReservationDetails , getConfirmSub} from "../actions";
import domain from "../consts/domain";

const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class VisaPay extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    _onLoad(state, navigation) {
        console.log(state.url);

        if (state.url.indexOf('?status=') != -1) {
            let status      = state.url.split("?status=")[1];
            status          = status.substring(0, 1);
            let ticketId    = state.url.split("&id=")[1];

            console.log('damn id', ticketId, status);

            if (status == 1){
                Toast.show({
                    text: i18n.t('successPayment'),
                    type: "success",
                    duration: 3000
                });

                const {user_id, pathName, subscription_id}  = this.props.navigation.state.params;

                if (pathName === 'ticketPayment'){
                    return  this.props.getReservationDetails( this.props.lang ,
                        ticketId,
                        this.props.user.token,
                        this.props
                    )
                }else if(pathName === 'FoodPayMethod'){
                    return  this.props.getConfirmSub(
                        this.props.lang ,
                        user_id ,
                        subscription_id ,
                        this.props
                    )
                }
            }else{
                Toast.show({
                    text: i18n.t('error'),
                    type: "danger",
                    duration: 3000
                });
            }

         //   return navigation.navigate('reCharge');
        }
    }


    render() {

        const {user_id, pathName, payType}  = this.props.navigation.state.params;
        let webViewUrl = '';

        if (pathName === 'ticketPayment'){
            const {event_id, tickets_type, tickets_count} = this.props.navigation.state.params ;
            webViewUrl = 'https://reesh1.com/backend/payment_ticket/'+user_id+'/'+event_id+'/'+tickets_type+'/'+tickets_count+'/'+payType
        } else if(pathName === 'FoodPayMethod'){
            const {total, subscription_id} = this.props.navigation.state.params ;
            webViewUrl = 'https://reesh1.com/backend/payment/'+user_id+'/'+total+'/'+subscription_id+'/'+payType
        }

        // alert(this.props.navigation.state.params.user_id)

        return (
            <Container>

                <Header style={[styles.header]} noShadow>
                    {
                        IS_IPHONE_X ?
                            <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
                            :
                            <View/>
                    }
                    <View style={[ styles.animatedHeader ,{ backgroundColor: '#000'}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('ticketPayment')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('payment') }</Text>
                        <Left style={styles.flex0}/>
                    </View>
                </Header>

                <Content contentContainerStyle={{ flexGrow: 1 , backgroundColor:'#241934' }} style={{padding:15}}>
                    {/*<View style={[styles.directionRowSpace , styles.mt25]}>*/}
                    {/*    <TouchableOpacity  onPress={() => this.props.navigation.navigate('ticketPayment')} style={styles.headerBtn}>*/}
                    {/*        <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}
                    <WebView
                        source = {{uri: webViewUrl}}
                        style  = {{flex:1 , width:'100%' , height:'100%'}}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        scalesPageToFit={false}
                        scrollEnabled={true}
                        javaScriptEnabled={true}
                        onNavigationStateChange={(state) => this._onLoad(state, this.props.navigation)}
                    />
                </Content>

            </Container>

        );
    }
}

const mapStateToProps = ({ lang , profile }) => {
    return {
        lang: lang.lang,
        user: profile.user,
    };
};

export default connect(mapStateToProps, {getReservationDetails, getConfirmSub })(VisaPay);
