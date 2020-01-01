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
    KeyboardAvoidingView, Platform
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import DateTimePicker from "react-native-modal-datetime-picker";


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class PaymentDetails extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            creditCard: '',
            firstName: '',
            lastNAme: '',
            hoursNo: '',
            securityCode: '',
            date: '',
            isDatePickerVisible: false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        let formatted_date = date.getFullYear() + "-" + ("0"+(date.getMonth() + 1)).slice(-2) + "-" + ("0" +date.getDate()).slice(-2);
        this.setState({ date : formatted_date });

        this.hideDatePicker();
    };

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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('paymentOp') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <Image source={require('../../assets/images/payment_logo_undraw.png')} style={[styles.faqImg]} resizeMode={'contain'} />
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:25 , paddingVertical:20 , marginTop:15}]}>

                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={{}}>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' , borderBottomColor:'#fff'}]}>
                                                { i18n.t('creditCard') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Input keyboardType={'number-pad'} value={this.state.creditCard} onChangeText={(creditCard) => this.setState({creditCard})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' , borderBottomColor:'#fff'}]}>
                                                { i18n.t('firstName') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Input autoCapitalize='none' value={this.state.firstName} onChangeText={(firstName) => this.setState({firstName})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>
                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' , borderBottomColor:'#fff'}]}>
                                                { i18n.t('lastName') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Input autoCapitalize='none' value={this.state.lastNAme} onChangeText={(lastNAme) => this.setState({lastNAme})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>
                                    <View style={styles.inputParent}>
                                        <TouchableOpacity stackedLabel style={styles.item } bordered  onPress={this.showDatePicker}>
                                            <Label style={[styles.labelItem , {top:-8, backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent'  , borderBottomColor:'#fff'}]}>{ i18n.t('expDate') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Text style={[styles.whiteText , styles.normalText , styles.itemText, {backgroundColor:'#f5f5f5',  paddingLeft:10,color: COLORS.gray  } ]}>{this.state.date}</Text>
                                        </TouchableOpacity>
                                        <DateTimePicker
                                            isVisible={this.state.isDatePickerVisible}
                                            onConfirm={this.handleDatePicked}
                                            onCancel={this.hideDatePicker}
                                            mode={'date'}
                                        />
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' , borderBottomColor:'#fff'}]}>
                                                { i18n.t('securityCode') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Input autoCapitalize='none' value={this.state.securityCode} onChangeText={(securityCode) => this.setState({securityCode})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>
                                </Form>
                            </KeyboardAvoidingView>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('confirmPayment', {
                                event_info : this.props.navigation.state.params.event_info,
                                event_id : this.props.navigation.state.params.event_id ,
                                price : this.props.navigation.state.params.price,
                                ticket_type : this.props.navigation.state.params.ticket_type,
                                imgSrc : this.props.navigation.state.params.imgSrc,
                                ticketName : this.props.navigation.state.params.ticketName,
                                ticketsNo : this.props.navigation.state.params.ticketsNo,
                            })} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('bookTicket')} style={[styles.blueBtn,  styles.mb15 , {backgroundColor:'transparent'}]}>
                                <Text style={[styles.blueText , styles.normalText ]}>{ i18n.t('cancel') }</Text>
                            </TouchableOpacity>

                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default PaymentDetails;
