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
import {Container, Content, Header, Right, Left} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import { WebView } from 'react-native-webview';
import domain from "../consts/domain";


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class VisaPay extends Component {
    constructor(props){
        super(props);

        this.state={
        }
    }



    _onLoad(state, navigation) {
        console.log(state.url);
        // if(state.url === domain + 'payment2'){
        //     navigation.navigate('details', {service_id:id})
        // }
    }

    render() {

        const user_id = this.props.navigation.state.params.user_id ;
        const event_id = this.props.navigation.state.params.event_id ;
        const tickets_type = this.props.navigation.state.params.tickets_type;
        const tickets_count = this.props.navigation.state.params.tickets_count;

        // alert(this.props.navigation.state.params.user_id)

        return (
            <Container>

                <Content contentContainerStyle={{ flexGrow: 1 , backgroundColor:'#241934' }} style={{padding:15}}>
                    <View style={[styles.directionRowSpace , styles.mt25]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('ticketPayment')} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>
                    <WebView
                        source = {{uri: 'http://reesh1.com/backend/payment2/'+user_id+'/'+event_id+'/'+tickets_type+'/'+tickets_count}}
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

export default VisaPay;
