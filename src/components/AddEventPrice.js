import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    Platform,
    ImageBackground,
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Textarea, Left, Form, Label, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;

class AddEventPrice extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            vipPrice: '',
            vipQuantity: '',
            goldPrice: '',
            goldQuantity: '',
            normalPrice: '',
            normalQuantity: '',
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });




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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('addEvent') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?'height' : 'padding'} style={styles.keyboardAvoid}>
                                <Form style={{padding:20}}>

                                    <View style={styles.ticketView}>
                                        <Image source={require('../../assets/images/ticket_vip.png')} style={[styles.ticket]} resizeMode={'contain'} />
                                        <Text style={[styles.whiteText , styles.normalText , styles.ticketText ]}>{ i18n.t('vipTicket') }</Text>
                                    </View>

                                    <View style={styles.directionRowSpace}>
                                        <View style={[styles.inputParent , {width: '48%'}]}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                    { i18n.t('price') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                                <Input keyboardType={'number-pad'} value={this.state.vipPrice} onChangeText={(vipPrice) => this.setState({vipPrice})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray , width: '92.5%' }]}  />
                                            </Item>
                                        </View>
                                        <View style={[styles.inputParent , {width: '48%'}]}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                    { i18n.t('quantity') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                                <Input keyboardType={'number-pad'} value={this.state.vipQuantity} onChangeText={(vipQuantity) => this.setState({vipQuantity})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray , width: '92.5%' }]}  />
                                            </Item>
                                        </View>
                                    </View>

                                    <View style={[styles.ticketView , styles.mt15]}>
                                        <Image source={require('../../assets/images/ticket_yellow_big.png')} style={[styles.ticket]} resizeMode={'contain'} />
                                        <Text style={[styles.whiteText , styles.normalText , styles.ticketText ]}>{ i18n.t('goldTicket') }</Text>
                                    </View>

                                    <View style={styles.directionRowSpace}>
                                        <View style={[styles.inputParent , {width: '48%'}]}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                    { i18n.t('price') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                                <Input keyboardType={'number-pad'} value={this.state.goldPrice} onChangeText={(goldPrice) => this.setState({goldPrice})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray , width: '92.5%' }]}  />
                                            </Item>
                                        </View>
                                        <View style={[styles.inputParent , {width: '48%'}]}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                    { i18n.t('quantity') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                                <Input keyboardType={'number-pad'} value={this.state.goldQuantity} onChangeText={(goldQuantity) => this.setState({goldQuantity})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray , width: '92.5%' }]}  />
                                            </Item>
                                        </View>
                                    </View>

                                    <View style={[styles.ticketView , styles.mt15]}>
                                        <Image source={require('../../assets/images/ticket_gray.png')} style={[styles.ticket]} resizeMode={'contain'} />
                                        <Text style={[styles.whiteText , styles.normalText , styles.ticketText ]}>{ i18n.t('normalTicket') }</Text>
                                    </View>

                                    <View style={styles.directionRowSpace}>
                                        <View style={[styles.inputParent , {width: '48%'}]}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                    { i18n.t('price') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                                <Input keyboardType={'number-pad'} value={this.state.normalPrice} onChangeText={(normalPrice) => this.setState({normalPrice})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray , width: '92.5%' }]}  />
                                            </Item>
                                        </View>
                                        <View style={[styles.inputParent , {width: '48%'}]}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                    { i18n.t('quantity') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                                <Input keyboardType={'number-pad'} value={this.state.normalQuantity} onChangeText={(normalQuantity) => this.setState({normalQuantity})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray , width: '92.5%' }]}  />
                                            </Item>
                                        </View>
                                    </View>


                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('addEventImage')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                        <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
                                    </TouchableOpacity>
                                </Form>
                            </KeyboardAvoidingView>

                        </View>
                    </ImageBackground>

                </Content>
            </Container>

        );
    }
}

export default AddEventPrice;