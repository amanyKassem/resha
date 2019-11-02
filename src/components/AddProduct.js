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
import {Container, Content, Header, Button, Item, Input, Right, Textarea, Left , Label, Form, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const height = Dimensions.get('window').height;

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
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    _pickImage = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

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
            base64:true
        });

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
            base64:true
        });

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
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('addProduct') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>
                          
                            <View style={[styles.directionRowSpace , {paddingHorizontal:15}]}>
                                {image1 != null?

                                    <TouchableOpacity onPress={this._pickImage} style={[styles.restProfile ]}>
                                        <Image source={{ uri: image1 }} resizeMode={'cover'} style={styles.sideDrawerImg}/>
                                    </TouchableOpacity>

                                    :
                                    <TouchableOpacity onPress={this._pickImage} style={[styles.restProfile ]}>
                                        <Image source={require('../../assets/images/upload_button.png')} resizeMode={'contain'} style={styles.headerMenu}/>
                                    </TouchableOpacity>
                                }
                                {image2 != null?

                                    <TouchableOpacity onPress={this._pickImage2} style={[styles.restProfile ]}>
                                        <Image source={{ uri: image2 }} resizeMode={'cover'} style={styles.sideDrawerImg}/>
                                    </TouchableOpacity>

                                    :
                                    <TouchableOpacity onPress={this._pickImage2} style={[styles.restProfile ]}>
                                        <Image source={require('../../assets/images/upload_button.png')} resizeMode={'contain'} style={styles.headerMenu}/>
                                    </TouchableOpacity>
                                }
                                {image3 != null?

                                    <TouchableOpacity onPress={this._pickImage3} style={[styles.restProfile ]}>
                                        <Image source={{ uri: image3 }} resizeMode={'cover'} style={styles.sideDrawerImg}/>
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
                                                <Picker.Item label={'حلويات'} value={1} />
                                                <Picker.Item label={'مشروبات'}  value={2} />
                                            </Picker>
                                            <Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                        </Item>
                                    </View>

                                    <View style={[styles.inputParent , {height:133}]}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                { i18n.t('moreDetails') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform]}/>
                                            <Textarea autoCapitalize='none' value={this.state.moreDet} onChangeText={(moreDet) => this.setState({moreDet})} style={[styles.textarea]}  />
                                        </Item>
                                    </View>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('restProductDetails')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                        <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('save') }</Text>
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

export default AddProduct;