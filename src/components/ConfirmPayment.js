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
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Modal from "react-native-modal";


const height = Dimensions.get('window').height;


class ConfirmPayment extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            modalEvent: false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _modalEvent = () => this.setState({ modalEvent: !this.state.modalEvent });

    backHome() {
        this.setState({ modalEvent: !this.state.modalEvent });
        this.props.navigation.navigate('drawerNavigator')
    };
    showTicket() {
        this.setState({ modalEvent: !this.state.modalEvent });
        this.props.navigation.navigate('showTicketQr')
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
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>تأكيد عملية الدفع</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <Image source={require('../../assets/images/payment_logo_undraw.png')} style={[styles.faqImg]} resizeMode={'contain'} />
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:25 , paddingVertical:20 , marginTop:15}]}>

                            <Text style={[styles.headerText , styles.asc  , styles.tac , styles.mt30 , {color:'#272727' , width:'70%' , lineHeight:30}]}>لا يمكن استرجاع المبلغ اذا تم الموافقة علي التأكيد</Text>

                            <TouchableOpacity onPress={this._modalEvent} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('confirmTicket')} style={[styles.blueBtn,  styles.mb15 , {backgroundColor:'transparent'}]}>
                                <Text style={[styles.blueText , styles.normalText ]}>عوده للتذكرة</Text>
                            </TouchableOpacity>

                        </View>
                    </ImageBackground>
                    <Modal onBackdropPress={()=> this.setState({ modalEvent : false })} isVisible={this.state.modalEvent}>
                        <View style={styles.modalEvent}>

                            <Image source={require('../../assets/images/calendar_blue.png')} resizeMode={'contain'} style={styles.sideImg}/>

                            <Text style={[styles.headerText , {color:'#272727'}]}>تم تأكيد الدفع</Text>
                            <Text style={[styles.grayText , styles.normalText]}>تم حجز مقعدك بنجاح</Text>
                            <Text style={[styles.grayText , styles.normalText]}>لا يمكن استرجاع المبلغ</Text>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this.showTicket()} style={[styles.centerBlock ,{width:'50%' , borderRightWidth:.5 , borderColor:COLORS.lightGray ,}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>رؤية التذكرة</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.backHome()} style={[styles.centerBlock ,{width:'50%'}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>العوده للرئيسية</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

export default ConfirmPayment;