import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    ImageBackground,
    KeyboardAvoidingView, Platform
} from "react-native";
import {Container, Content, Header,Item, Input, Right, Toast, Left, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ContinueBooking extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            ticketsNo: '',
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        this.setState({ticketsNo:''})
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


    confirmTicketsNum(){
        // console.log('counter', this.state.ticketsNo , this.props.navigation.state.params.available_count);

        if (this.state.ticketsNo > this.props.navigation.state.params.available_count || this.state.ticketsNo == '' || this.state.ticketsNo == null || this.state.ticketsNo.length == 0 ){
            Toast.show({
                text: i18n.t('availTicket') ,
                type: "danger",
                duration: 3000
            });
        } else {
            this.props.navigation.navigate('confirmTicket' , {
                event_info : this.props.navigation.state.params.event_info,
                event_id : this.props.navigation.state.params.event_id ,
                price : this.props.navigation.state.params.price,
                ticket_type : this.props.navigation.state.params.ticket_type,
                imgSrc : this.props.navigation.state.params.imgSrc,
                ticketName : this.props.navigation.state.params.ticketName,
                ticketsNo : this.state.ticketsNo,
            })
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
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('bookType')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('continueBooking') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>

                            <View  style={[styles.ticketViewType , styles.mb15]}>
                                <Image source={{ uri: this.props.navigation.state.params.imgSrc }} style={[styles.ticketType]} resizeMode={'contain'} />
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'30%'} ]}>{this.props.navigation.state.params.ticketName}</Text>
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'50%'} ]}>{ i18n.t('price') } {this.props.navigation.state.params.price} { i18n.t('RS') }</Text>
                            </View>


                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={{padding:20}}>
                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' , borderBottomColor:'#fff'}]}>
                                                { i18n.t('ticketsNo') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input keyboardType={'number-pad'} value={this.state.ticketsNo} onChangeText={(ticketsNo) => this.setState({ticketsNo})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>
                                </Form>
                            </KeyboardAvoidingView>


                            <TouchableOpacity onPress={ () => this.confirmTicketsNum()} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
                            </TouchableOpacity>

                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default ContinueBooking;
