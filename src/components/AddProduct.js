import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    KeyboardAvoidingView,
    ImageBackground,
    Platform, I18nManager
} from "react-native";
import {Container, Content, Header,  Item, Input, Right, Textarea, Left , Label, Form, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {getTypeCategories, getStoreProduct} from "../actions";
import {connect} from "react-redux";
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;
let base64   = [];

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class AddProduct extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            prodImg1: null,
            base64_1: null,
            prodImg2: null,
            base64_2: null,
            prodImg3: null,
            base64_3: null,
            prodName: '',
            price: '',
            category: null,
            moreDet: '',
            isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };


    componentWillMount() {
        this.props.getTypeCategories(this.props.lang , this.props.user.type );
        base64 = [];
        this.setState({prodName:'' ,price :'' , category: null, moreDet: '' , prodImg1: null, base64_1: null, prodImg2: null, base64_2: null, prodImg3: null, base64_3: null , isSubmitted: false})
    }


    _pickImage = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true,
            quality:.1
        });
        base64.push(result.base64)
        console.log(result);

        // check if there is image then set it and make button not disabled
        if (!result.cancelled) {
            this.setState({ prodImg1: result.uri ,base64_1:result.base64});
        }
    };

    _pickImage2 = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true,
            quality:.1
        });
        base64.push(result.base64)
        console.log(result);

        // check if there is image then set it and make button not disabled
        if (!result.cancelled) {
            this.setState({ prodImg2: result.uri ,base64_2:result.base64});
        }
    };

    _pickImage3 = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true,
            quality:.1
        });
        base64.push(result.base64)
        console.log(result);

        // check if there is image then set it and make button not disabled
        if (!result.cancelled) {
            this.setState({ prodImg3: result.uri ,base64_3:result.base64});
        }
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


    renderSubmit(){
        if (this.state.prodName == '' || this.state.price == '' || this.state.category == '' || base64.length <= 0 ){
            return (
                <TouchableOpacity style={[styles.blueBtn, styles.mt50 , styles.mb15 , { backgroundColor: '#999' }]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('save') }</Text>
                </TouchableOpacity>
            );
        }

        if (this.state.isSubmitted) {
            return (
                <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.mt50, styles.mb15 ]}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{alignSelf: 'center'}}/>
                </View>
            )
        }
        return (
            <TouchableOpacity  onPress={() => this.submitData()} style={[styles.blueBtn , styles.mt50, styles.mb15]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('save') }</Text>
            </TouchableOpacity>

        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.key == 1) {
            this.setState({isSubmitted: false});
        }
        console.log('nextProps.storeProduct' , nextProps.storeProduct)
    }

    submitData(){
        this.setState({ isSubmitted: true });
        this.props.getStoreProduct( this.props.lang , this.state.prodName , this.state.price , this.state.category , this.state.moreDet , base64 , this.props.user.token , this.props , this.props.navigation.state.params.afterAdd)
    }


    onFocus(payload){
        base64 = [];
        this.componentWillMount()
    }


    render() {
        let image1 = this.state.prodImg1;
        let image2 = this.state.prodImg2;
        let image3 = this.state.prodImg3;
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('addProduct') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>

                            <View style={[styles.directionRowSpace , {paddingHorizontal:15}]}>
                                {image1 != null?

                                    <TouchableOpacity onPress={this._pickImage} style={[styles.restProfile ]}>
                                        <Image source={{ uri: image1  }} resizeMode={'cover'} style={styles.sideDrawerImg}/>
                                    </TouchableOpacity>

                                    :
                                    <TouchableOpacity onPress={this._pickImage} style={[styles.restProfile ]}>
                                        <Image source={require('../../assets/images/upload_button.png')} resizeMode={'contain'} style={styles.headerMenu}/>
                                    </TouchableOpacity>
                                }
                                {image2 != null?

                                    <TouchableOpacity onPress={this._pickImage2} style={[styles.restProfile ]}>
                                        <Image source={{ uri: image2  }} resizeMode={'cover'} style={styles.sideDrawerImg}/>
                                    </TouchableOpacity>

                                    :
                                    <TouchableOpacity onPress={this._pickImage2} style={[styles.restProfile ]}>
                                        <Image source={require('../../assets/images/upload_button.png')} resizeMode={'contain'} style={styles.headerMenu}/>
                                    </TouchableOpacity>
                                }
                                {image3 != null?

                                    <TouchableOpacity onPress={this._pickImage3} style={[styles.restProfile ]}>
                                        <Image source={{ uri: image3  }} resizeMode={'cover'} style={styles.sideDrawerImg}/>
                                    </TouchableOpacity>

                                    :
                                    <TouchableOpacity onPress={this._pickImage3} style={[styles.restProfile ]}>
                                        <Image source={require('../../assets/images/upload_button.png')} resizeMode={'contain'} style={styles.headerMenu}/>
                                    </TouchableOpacity>
                                }
                            </View>


                            <Text style={[styles.blueText, styles.normalText , styles.writing , styles.asfs , {marginHorizontal:15} ]}>{ i18n.t('uploadPhoto') }</Text>


                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?'height' : 'padding'} style={styles.keyboardAvoid}>
                                <Form style={{padding:20}}>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                { i18n.t('productName') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform]}/>
                                            <Input autoCapitalize='none' value={this.state.prodName} onChangeText={(prodName) => this.setState({prodName})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                { i18n.t('price') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform]}/>
                                            <Input keyboardType={'number-pad'} value={this.state.price} onChangeText={(price) => this.setState({price})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>
                                    {
										this.props.user.type != 5 && this.props.user.type != 4 ?
											<View style={styles.inputParent}>
												<Item style={styles.itemPicker} regular >
													<Label style={[styles.labelItem , {top:I18nManager.isRTL ? -18.5 : -16.5 ,
														paddingLeft:I18nManager.isRTL ?Platform.OS === 'ios' ?20 : 10 : 20 ,
														paddingRight:I18nManager.isRTL ?Platform.OS === 'ios' ?10:20 : 10,
														backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
														borderBottomColor:'#fff'}]}>{ i18n.t('category') }</Label>
													<Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform , {top:-19}]}/>
													<Picker
														mode="dropdown"
														style={[styles.picker , { color: COLORS.gray , backgroundColor:'#f5f5f5',}]}
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
													<Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />
												</Item>
											</View>
                                            :
                                            <View/>
									}


                                    <View style={[styles.inputParent , {height:133}]}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                { i18n.t('moreDetails') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform]}/>
                                            <Textarea autoCapitalize='none' value={this.state.moreDet} onChangeText={(moreDet) => this.setState({moreDet})} style={[styles.textarea]}  />
                                        </Item>
                                    </View>

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

const mapStateToProps = ({ lang , typeCategories , storeProduct , profile}) => {
    return {
        lang: lang.lang,
        typeCategories: typeCategories.typeCategories,
        storeProduct: storeProduct.storeProduct,
        user: profile.user,
        key:storeProduct.key
    };
};
export default connect(mapStateToProps, {getTypeCategories , getStoreProduct})(AddProduct);
