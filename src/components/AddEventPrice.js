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
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';


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





    renderNextBtn(){
        if (this.state.vipPrice == '' || this.state.vipQuantity == '' || this.state.goldPrice == '' || this.state.goldQuantity == '' || this.state.normalPrice == '' || this.state.normalQuantity == '' ){
            return (
                <TouchableOpacity style={[styles.blueBtn, styles.mt50 , styles.mb15 , {backgroundColor:'#999'}]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
                </TouchableOpacity>
            );
        }
        const tickets = [
            {
                type:1,
                price:this.state.normalPrice,
                amount:this.state.normalQuantity
            },
            {
                type:2,
                price:this.state.goldPrice,
                amount:this.state.goldQuantity
            },
            {
                type:3,
                price:this.state.vipPrice,
                amount:this.state.vipQuantity
            },
        ]
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('addEventImage' , {
                ar_name : this.props.navigation.state.params.ar_name ,
                en_name : this.props.navigation.state.params.en_name ,
                date :this.props.navigation.state.params.date ,
                time : this.props.navigation.state.params.time ,
                event_hours : this.props.navigation.state.params.event_hours ,
                address : this.props.navigation.state.params.address ,
                latitude : this.props.navigation.state.params.latitude ,
                longitude : this.props.navigation.state.params.longitude ,
                ar_description :  this.props.navigation.state.params.ar_description,
                en_description : this.props.navigation.state.params.en_description,
                organization_id: this.props.navigation.state.params.organization_id,
                category_id: this.props.navigation.state.params.category_id,
                tickets

            })}
                              style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
            </TouchableOpacity>
        );
    }


    onFocus(payload){
        // this.componentWillMount()
    }


    render() {


        // console.log( this.props.navigation.state.params.ar_name ,
        //     this.props.navigation.state.params.en_name ,
        //     this.props.navigation.state.params.date ,
        //    this.props.navigation.state.params.time ,
        //      this.props.navigation.state.params.event_hours ,
        //      this.props.navigation.state.params.address ,
        //     this.props.navigation.state.params.latitude ,
        //      this.props.navigation.state.params.longitude ,
        //     this.props.navigation.state.params.ar_description,
        //     this.props.navigation.state.params.en_description,
        //     this.props.navigation.state.params.organization_id,
        //     this.props.navigation.state.params.category_id)

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
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('addEventDesc')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('addEvent') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
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

                                    { this.renderNextBtn()}


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
