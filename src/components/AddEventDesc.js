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
    KeyboardAvoidingView,
    I18nManager
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Textarea, Left, Form, Label, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {getEventCategories , getOrganizations} from "../actions";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;

class AddEventDesc extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            arabicDesc: '',
            englishDesc: '',
            category: null,
            organization: null,

        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    async componentWillMount() {
        this.props.getEventCategories(this.props.lang);
        this.props.getOrganizations(this.props.lang);
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


    renderNextBtn(){
        if (this.state.arabicDesc == '' || this.state.englishDesc == '' ){
            return (
                <TouchableOpacity style={[styles.blueBtn, styles.mt50 , styles.mb15 , {backgroundColor:'#999'}]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('addEventPrice' , {
                ar_name : this.props.navigation.state.params.ar_name ,
                en_name : this.props.navigation.state.params.en_name ,
                date :this.props.navigation.state.params.date ,
                time : this.props.navigation.state.params.time ,
                event_hours : this.props.navigation.state.params.event_hours ,
                address : this.props.navigation.state.params.address ,
                latitude : this.props.navigation.state.params.latitude ,
                longitude : this.props.navigation.state.params.longitude ,
                ar_description : this.state.arabicDesc,
                en_description : this.state.englishDesc,
                organization_id: this.state.organization,
                category_id: this.state.category})}
                              style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
            </TouchableOpacity>
        );
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
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?'height' : 'padding'} style={styles.keyboardAvoid}>
                                <Form style={{padding:20}}>

                                    <View style={[styles.inputParent , {height:133}]}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                { i18n.t('arDesc') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Textarea autoCapitalize='none' value={this.state.arabicDesc} onChangeText={(arabicDesc) => this.setState({arabicDesc})} style={[styles.textarea]}  />
                                        </Item>
                                    </View>
                                    <View style={[styles.inputParent , {height:133}]}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                { i18n.t('enDesc') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Textarea autoCapitalize='none' value={this.state.englishDesc} onChangeText={(englishDesc) => this.setState({englishDesc})} style={[styles.textarea]}  />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item style={styles.itemPicker} regular >
                                            <Label style={[styles.labelItem , {top:I18nManager.isRTL ? -18.5 : -16.5 ,
                                                paddingLeft:I18nManager.isRTL ?Platform.OS === 'ios' ?20 : 10 : 20 ,
                                                paddingRight:I18nManager.isRTL ?Platform.OS === 'ios' ?10:20 : 10,
                                                backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                                borderBottomColor:'#fff'}]}>{ i18n.t('section') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform , {top:-19}]}/>
                                            <Picker
                                                mode="dropdown"
                                                style={[styles.picker , { color: COLORS.gray , backgroundColor:'#f5f5f5',}]}
                                                placeholderStyle={{ color: COLORS.gray}}
                                                placeholderIconColor={{color: COLORS.gray}}
                                                selectedValue={this.state.category}
                                                onValueChange={(value) => this.setState({ category: value })}
                                            >
                                                <Picker.Item label={ i18n.t('chooseCategory') } value={null} />
                                                {
                                                    this.props.eventCategories.map((cat, i) => (
                                                        <Picker.Item key={i} label={cat.name} value={cat.id} />
                                                    ))

                                                }

                                            </Picker>
                                            <Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item style={styles.itemPicker} regular >
                                            <Label style={[styles.labelItem , {top:I18nManager.isRTL ? -18.5 : -16.5 ,
                                                paddingLeft:I18nManager.isRTL ?Platform.OS === 'ios' ?20 : 10 : 20 ,
                                                paddingRight:I18nManager.isRTL ?Platform.OS === 'ios' ?10:20 : 10,
                                                backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                                borderBottomColor:'#fff'}]}>{ i18n.t('commission') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform , {top:-19}]}/>
                                            <Picker
                                                mode="dropdown"
                                                style={[styles.picker , { color: COLORS.gray , backgroundColor:'#f5f5f5',}]}
                                                placeholderStyle={{ color: COLORS.gray}}
                                                placeholderIconColor={{color: COLORS.gray}}
                                                selectedValue={this.state.organization}
                                                onValueChange={(value) => this.setState({ organization: value })}
                                            >
                                                <Picker.Item label={ i18n.t('chooseOrganizations') } value={null} />
                                                {
                                                    this.props.organizations.map((org, i) => (
                                                        <Picker.Item key={i} label={org.name} value={org.id} />
                                                    ))

                                                }
                                            </Picker>
                                            <Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                        </Item>
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


const mapStateToProps = ({ lang , eventCategories , organizations }) => {
    return {
        lang: lang.lang,
        eventCategories: eventCategories.eventCategories,
        organizations: organizations.organizations,
    };
};
export default connect(mapStateToProps, {getEventCategories , getOrganizations})(AddEventDesc);