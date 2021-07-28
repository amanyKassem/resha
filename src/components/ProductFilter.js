import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    Slider,
    ImageBackground,
    KeyboardAvoidingView,
    Platform, I18nManager
} from "react-native";
import {Container, Content, Header, Item, Right, Left, Label, Form, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {getProductPrices , getTypeCategories , getFilterProducts} from "../actions";
import {connect} from "react-redux";
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ProductFilter extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            category: null,
            value: 0,
            isSubmitted: false
            // max: 2500,
            // step: 500,
            // min: 0,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    change(value){
        this.setState({value})
    }

    componentWillMount() {
        this.props.getProductPrices(this.props.lang);
        this.props.getTypeCategories(this.props.lang , this.props.navigation.state.params.catType );
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

    renderSubmit(){
        if (this.state.isSubmitted) {
            return (
                <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.mt50, styles.mb15 ]}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{alignSelf: 'center'}}/>
                </View>
            )
        }
        return (
            <TouchableOpacity  onPress={() => this.submitSearch()} style={[styles.blueBtn , styles.mt50, styles.mb15]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>

        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filterKey == 1) {
            this.setState({isSubmitted: false});
            // this.props.navigation.navigate('searchResult', { searchResult : nextProps.filterEvents } );
        }
        if (nextProps.productPrices) {
            this.setState({value: nextProps.productPrices.min})
        }

        console.log('nextProps.filterEvents' , nextProps.filterEvents)
    }

    submitSearch(){
        this.setState({ isSubmitted: true });
        this.props.getFilterProducts( this.props.lang , this.props.navigation.state.params.user_id , null , this.state.category , this.state.value , this.props , 'productFilter' , this.props.navigation.state.params.catType)
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
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.backRoute)} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('searchFilter') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>
                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={{padding:20}}>

                                    <View style={styles.inputParent}>
                                        <Item style={styles.itemPicker} regular >
                                            <Label style={[styles.labelItem , {top:I18nManager.isRTL ? -18.5 : -16.5 ,
                                                paddingLeft:I18nManager.isRTL ?Platform.OS === 'ios' ?20 : 10 : 20 ,
                                                paddingRight:I18nManager.isRTL ?Platform.OS === 'ios' ?10:20 : 10,
                                                backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                                borderBottomColor:'#fff'}]}>{ i18n.t('category') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform , {top:-19}]}/>

                                            {
                                                this.props.typeCategories ?
                                                    <Picker
                                                        mode="dropdown"
                                                        style={[styles.picker , { color: COLORS.gray , backgroundColor: '#f5f5f5',}]}
                                                        placeholderStyle={{ color: COLORS.gray}}
                                                        placeholderIconColor={{color: COLORS.gray}}
                                                        selectedValue={this.state.category}
                                                        onValueChange={(value) => this.setState({ category: value })}
                                                    >
                                                        <Picker.Item label={ i18n.t('category') } value={null} />
                                                        {
                                                            this.props.typeCategories.map((cat, i) => (
                                                                <Picker.Item key={i} label={cat.name} value={cat.id} />
                                                            ))

                                                        }
                                                    </Picker>
                                                    :
                                                    <View/>
                                            }

                                            <Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                        </Item>
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mt15]}>
                                        <Image source={require('../../assets/images/feather_color.png')} style={[styles.resha , styles.transform]} resizeMode={'contain'} />
                                        <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('price') }</Text>
                                    </View>

                                    {
                                        this.props.productPrices?
                                            <View style={styles.sliderParent}>
                                                <Slider
                                                    step={5}
                                                    minimumValue={this.props.productPrices.min}
                                                    maximumValue={this.props.productPrices.max}
                                                    onValueChange={(value) => this.change(value)}
                                                    // value={this.state.value}
                                                    thumbTintColor={COLORS.rose}
                                                    style={styles.slider}
                                                    maximumTrackTintColor={"#000"}
                                                    minimumTrackTintColor={COLORS.blue}
                                                />
                                                <View style={styles.range}>
                                                    <Left><Text style={[styles.headerText , {color:'#272727'}]}>{this.props.productPrices.min}</Text></Left>
                                                    <Text style={[styles.headerText , {color:'#272727'}]}>{this.state.value}</Text>
                                                    <Right><Text style={[styles.headerText , {color:'#272727'}]}>{this.props.productPrices.max}</Text></Right>
                                                </View>
                                            </View>
                                            :
                                            <View/>
                                    }




                                    {
                                        this.renderSubmit()
                                    }


                                </Form>
                            </KeyboardAvoidingView>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , productPrices , typeCategories , filterProducts , profile}) => {
    return {
        lang: lang.lang,
        typeCategories: typeCategories.typeCategories,
        filterProducts: filterProducts.filterProducts,
        filterKey: filterProducts.key,
        user: profile.user,
        productPrices: productPrices.productPrices,
    };
};
export default connect(mapStateToProps, {getProductPrices , getTypeCategories , getFilterProducts})(ProductFilter);
