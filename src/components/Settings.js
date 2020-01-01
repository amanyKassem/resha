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
    I18nManager
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Switch, Left, Form, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {connect} from "react-redux";
import {chooseLang , getDeleteAccount , getStopNotification} from "../actions";


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class Settings extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            SwitchOnValueHolder:false,
            language:null
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('settings') ,
        drawerIcon: (<Image source={require('../../assets/images/settings_menu.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })

    onChangeLang(value){
        this.setState({ language: value })
        if (this.props.lang != value){
            this.props.chooseLang(value);
        }
    }

    stopNotification = () =>{
        this.props.getStopNotification( this.props.lang , this.props.user.token)
        this.setState({SwitchOnValueHolder:!this.state.SwitchOnValueHolder})
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

    deleteAcc(){
        this.props.getDeleteAccount( this.props.lang , this.props.user.token)
        this.props.navigation.navigate('login')
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('settings') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <Image source={require('../../assets/images/undraw_personal_settings_kihd.png')} style={[styles.faqImg]} resizeMode={'contain'} />
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20 , marginTop:15}]}>
                            <ImageBackground source={require('../../assets/images/bg_feather.png')} resizeMode={'cover'} style={styles.imageBackground}>

                                <View style={styles.directionRowSpace}>
                                    <Text style={[styles.boldGrayText , styles.normalText  ]}>{ i18n.t('stopNotification') }</Text>
                                    <Switch
                                        onValueChange={() => this.stopNotification()}
                                        value={!this.state.SwitchOnValueHolder}
                                        onTintColor={COLORS.gray}
                                        thumbTintColor={COLORS.blue}
                                        tintColor={'#c5c5c5'}
                                    />
                                </View>

                                <View style={[styles.line ]}/>

                                <View style={styles.directionRowSpace}>
                                    <Item style={[styles.catPicker ]} regular >
                                        <Picker
                                            mode="dropdown"
                                            style={[styles.pickerLabel]}
                                            placeholder={ i18n.t('langSettings') }
                                            placeholderStyle={{ color: COLORS.boldGray  }}
                                            placeholderIconColor={COLORS.boldGray }
                                            textStyle={{ color: COLORS.boldGray }}
                                            itemTextStyle={{ color: COLORS.boldGray  }}
                                            selectedValue={this.state.language}
                                            onValueChange={(value) => this.onChangeLang(value)}
                                        >
                                            <Picker.Item label={ i18n.t('langSettings') } value={null} />
                                            <Picker.Item label={'العربية'} value={"ar"} />
                                            <Picker.Item label={'English'} value={"en"} />
                                        </Picker>
                                        <Image source={require('../../assets/images/drop_down_gray.png')}  style={styles.dropArrow} resizeMode={'contain'} />
                                    </Item>
                                </View>

                                <View style={[styles.line ]}/>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('changePass')}>
                                    <Text style={[styles.boldGrayText , styles.normalText , styles.asfs , styles.writing  ]}>{ i18n.t('changePass') }</Text>
                                </TouchableOpacity>


                                <TouchableOpacity  onPress={() => this.deleteAcc()} style={styles.delAcc}>
                                    <Text style={[styles.whiteText , styles.BoldText ,{color:COLORS.rose , fontSize:13 }]}>{ i18n.t('deleteAcc') }</Text>
                                </TouchableOpacity>


                            </ImageBackground>
                        </View>
                    </ImageBackground>
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

export default connect(mapStateToProps, {chooseLang , getDeleteAccount , getStopNotification})(Settings);
