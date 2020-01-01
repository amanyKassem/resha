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
    KeyboardAvoidingView, Platform, I18nManager
} from "react-native";
import {
    Container,
    Content,
    Header,
    Button,
    Item,
    Input,
    Right,
    Icon,
    Left,
    Form,
    Label,
    Textarea,
    Toast
} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getSendComplaint} from "../actions";


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class Complaints extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            title:'',
            desc:'',
            isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('complaints') ,
        drawerIcon: (<Image source={require('../../assets/images/lightbulb_menu.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })


    renderSubmit(){
        if (this.state.title == '' || this.state.desc == '') {
            return (
                <TouchableOpacity style={[styles.blueBtn, styles.mt50 , styles.mb15, {backgroundColor: '#999'}]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('sendButton') }</Text>
                </TouchableOpacity>
            );
        }
        if (this.state.isSubmitted) {
            return (
                <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.mt50, styles.mb15]}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{alignSelf: 'center'}}/>
                </View>
            )
        }
        return (
            <TouchableOpacity onPress={() => this.sendComp()} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('sendButton') }</Text>
            </TouchableOpacity>

        );
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps.sendComplaint) {
            this.setState({isSubmitted: false});
            this.props.navigation.navigate('home')
        }
        console.log('nextProps.sendComplaint' , nextProps.sendComplaint)
    }

    sendComp(){
        this.setState({ isSubmitted: true });
        this.props.getSendComplaint( this.props.lang ,
            this.state.title,
            this.state.desc,
            this.props.user.token
        )
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('complaints') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <Image source={require('../../assets/images/complain_undraw.png')} style={[styles.faqImg]} resizeMode={'contain'} />
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20 , marginTop:15}]}>
                            <ImageBackground source={require('../../assets/images/bg_feather.png')} resizeMode={'cover'} style={styles.imageBackground}>
                                <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                    <Form style={{padding:20}}>

                                        <View style={[styles.inputParent , {height:Platform.OS === 'ios' ?56 : 50}]}>
                                            <Item stackedLabel style={[styles.item , {top:-14.5}]} bordered>
                                                <Label style={[styles.labelItem , {borderBottomColor:'transparent' }]}/>
                                                <Input placeholder={ i18n.t('complainAndProposal') } placeholderTextColor={COLORS.gray} autoCapitalize='none' value={this.state.title} onChangeText={(title) => this.setState({title})}
                                                       style={[styles.itemInput , {top: Platform.OS === 'ios' ?-1 : -7,
                                                           lineHeight:I18nManager.isRTL ?Platform.OS === 'ios' ?28 : 37 : Platform.OS === 'ios' ?20 : 37,
                                                           backgroundColor:'#f5f5f5',  color: COLORS.gray , left:5 ,paddingRight:30 }]}  />
                                            </Item>
                                            <Image source={require('../../assets/images/add_only.png')} style={styles.mapMarker} resizeMode={'contain'} />
                                        </View>

                                        <View style={[styles.inputParent , {height:133}]}>
                                            <Item stackedLabel style={[styles.item , {top:-14.5}]} bordered>
                                                <Label style={[styles.labelItem , {borderBottomColor:'transparent' }]}/>
                                                <Textarea placeholder={ i18n.t('addComp') } placeholderTextColor={COLORS.gray} autoCapitalize='none' value={this.state.desc} onChangeText={(desc) => this.setState({desc})}
                                                          style={[styles.textarea , {top:Platform.OS === 'ios' ?0 : -7}]}  />
                                            </Item>
                                        </View>

                                        {
                                            this.renderSubmit()
                                        }

                                    </Form>
                                </KeyboardAvoidingView>
                            </ImageBackground>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , profile , sendComplaint }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        sendComplaint: sendComplaint.sendComplaint,
        key: sendComplaint.key
    };
};
export default connect(mapStateToProps, {getSendComplaint})(Complaints);
