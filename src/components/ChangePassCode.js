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
    I18nManager, KeyboardAvoidingView
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Switch, Left, Form, Picker, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

class ChangePassCode extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            verifyCode: '',
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('changePass') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <Image source={require('../../assets/images/undraw_pass.png')} style={[styles.faqImg]} resizeMode={'contain'} />
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20 , marginTop:15}]}>
                            <ImageBackground source={require('../../assets/images/bg_feather.png')} resizeMode={'cover'} style={styles.imageBackground}>

                                <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                    <Form style={{padding:20}}>

                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={[styles.labelItem , {borderBottomColor:'#fff'}]}>
                                                    { i18n.t('verifyCode') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                                <Input keyboardType={'number-pad'} value={this.state.verifyCode} onChangeText={(verifyCode) => this.setState({verifyCode})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                            </Item>
                                        </View>
                                    </Form>
                                </KeyboardAvoidingView>

                                <TouchableOpacity onPress={() => this.props.navigation.navigate('settings')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('save') }</Text>
                                </TouchableOpacity>

                            </ImageBackground>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default ChangePassCode;