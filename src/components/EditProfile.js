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
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const height = Dimensions.get('window').height;


class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            userImage: null,
            base64: null,
            username: '',
            phone: '',
            email: '',
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
            this.setState({ userImage: result.uri ,base64:result.base64});
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
        let image = this.state.userImage;
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
                        <Text style={[styles.headerText , {right:20}]}>تعديل الصفحة الشخصية</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>

                            {image != null?

                                <View style={[styles.sideImgView , {height:160 , marginTop:15}]}>
                                    <View style={[styles.cutCircle]}>
                                        <View style={styles.sideProfileImg}>
                                            <View style={styles.overProfile}/>
                                            <Image source={{ uri: image }} resizeMode={'cover'} style={styles.sideDrawerImg}/>
                                        </View>
                                    </View>
                                </View>

                                :
                                <View style={[styles.sideImgView , {height:160 , marginTop:15}]}>
                                    <View style={[styles.cutCircle]}>
                                        <View style={styles.sideProfileImg}>
                                            <View style={styles.overProfile}/>
                                            <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={styles.sideDrawerImg}/>
                                        </View>
                                    </View>
                                </View>
                            }

                            <TouchableOpacity onPress={this._pickImage}  style={[styles.upload]} >
                                <Image source={require('../../assets/images/upload_button.png')} style={[styles.headerMenu , {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.blueText, styles.normalText ]}>رفع صوره</Text>
                            </TouchableOpacity>


                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={{padding:20}}>


                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {borderBottomColor:'#fff'}]}>
                                                { i18n.t('username') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input autoCapitalize='none' value={this.state.username} onChangeText={(username) => this.setState({username})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>
                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {borderBottomColor:'#fff'}]}>
                                                { i18n.t('phoneNumber') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input keyboardType={'number-pad'} value={this.state.phone} onChangeText={(phone) => this.setState({phone})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {borderBottomColor:'#fff'}]}>
                                                { i18n.t('email') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input keyboardType={'email-address'} value={this.state.email} onChangeText={(email) => this.setState({email})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>


                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
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

export default EditProfile;