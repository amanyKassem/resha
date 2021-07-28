import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView, Platform, I18nManager
} from "react-native";
import {Container, Content, Form, Picker, Input, Item, Label, Button, Toast, Switch} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Modal from "react-native-modal";
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import {DoubleBounce} from "react-native-loader";
import {register} from "../actions";
import {connect} from "react-redux";
import {NavigationEvents} from "react-navigation";


class Register extends Component {
    constructor(props){
        super(props);

        this.state={
            userType: 0,
            username:'',
            phone:'',
            mail: '',
            password: '',
            rePassword: '',
            location: '',
            isModalVisible: false,
            city: '',
            mapRegion: null,
            hasLocationPermissions: false,
            initMap: true,
            isLoaded: false,
            SwitchOnValueHolder:false,
        }
    }
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    cancelLocation = () => {
        this.setState({SwitchOnValueHolder:!this.state.SwitchOnValueHolder})
    };

    renderSubmit(){
        if (this.state.username == '' || this.state.mail == '' || this.state.phone == '' || this.state.password == '' || this.state.rePassword == ''){
            return (
                <TouchableOpacity style={[styles.blueBtn, styles.mt50 , styles.mb15, {backgroundColor: '#999'}]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('register') }</Text>
                </TouchableOpacity>
            );
        }

        if (this.state.isLoaded){
            return(
                <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.mt50, styles.mb15]}>
                    <DoubleBounce size={20} color={COLORS.blue} style={{alignSelf: 'center'}}/>
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => this.onRegisterPressed()} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('register') }</Text>
            </TouchableOpacity>
        );
    }

    validate = () => {
        let isError = false;
        let msg = '';

        if (this.state.password.length <= 0) {
            isError = true;
            msg = i18n.t('passwordRequired');
        }else if (this.state.password != this.state.rePassword) {
            isError = true;
            msg = i18n.t('verifyPassword');
        }else if (this.state.password.length < 8) {
            isError = true;
            msg = i18n.t('passwordLength');
        }else if (this.state.mail.length <= 0 || this.state.mail.indexOf("@") === -1 || this.state.mail.indexOf(".") === -1) {
            isError = true;
            msg = i18n.t('emailNotCorrect');
        }

        if (msg != ''){
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000
            });
        }
        return isError;
    };


    onRegisterPressed() {
        const err = this.validate();
        if (!err){
            this.setState({ isLoaded: true });

            const { username, mail, phone, password, city, mapRegion, userType } = this.state;
            const data = {
                username,
                mail ,
                phone,
                password,
                lang: this.props.lang,
                city,
                mapRegion,
                userType
            };

            this.props.register(data, this.props);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ isLoaded: false });
        console.log('new props of register', nextProps);
    }

    async componentWillMount() {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            const userLocation = { latitude, longitude };
            this.setState({  initMap: false, mapRegion: userLocation });
        }

        //
        // let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        // getCity += this.state.mapRegion.latitude + ',' + this.state.mapRegion.longitude;
        // getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' +this.props.lang +'&sensor=true';
        //
        // console.log(getCity);
        //
        // try {
        //     const { data } = await axios.get(getCity);
        //     this.setState({ city: data.results[0].formatted_address });
        //
        // } catch (e) {
        //     console.log(e);
        // }
    }



    async componentDidMount(){
        const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
        const userLocation = { latitude, longitude };
        this.setState({  initMap: false, mapRegion: userLocation });
    }


    _handleMapRegionChange  = async (mapRegion) =>  {
        console.log(mapRegion);
        this.setState({ mapRegion });

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapRegion.latitude + ',' + mapRegion.longitude;
        getCity += '&key=AIzaSyDCdYroxCIXCe6iCwvPUdV-I0TsaBPnXlY&language= '+this.props.lang +'&sensor=true';

        console.log('locations data', getCity);


        try {
            const { data } = await axios.get(getCity);
            console.log(data);
            this.setState({ city: this.state.SwitchOnValueHolder ? '' : data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            this.setState({
                locationResult: 'Permission to access location was denied',
            });
        } else {
            this.setState({ hasLocationPermissions: true });
        }

        let location = await Location.getCurrentPositionAsync({});

        // Center the map on the location we just fetched.
        this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
    };

    async confirmLocation(){
        this.setState({ isModalVisible: !this.state.isModalVisible })
         let { status } = await Location.requestPermissionsAsync();
        // if (status !== 'granted') {
        //     alert('صلاحيات تحديد موقعك الحالي ملغاه');
        // }else {
        //     const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
        //     const userLocation = { latitude, longitude };
        //     this.setState({  initMap: false, mapRegion: userLocation });
        //
        // }

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += this.state.mapRegion.latitude + ',' + this.state.mapRegion.longitude;
        getCity += '&key=AIzaSyDCdYroxCIXCe6iCwvPUdV-I0TsaBPnXlY&language=' +this.props.lang +'&sensor=true';

        console.log(getCity);

        try {
            const { data } = await axios.get(getCity);
            this.setState({ city: this.state.SwitchOnValueHolder ? '' : data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
    }

    onFocus(payload){
        this.componentWillMount()
    }

    render() {

        console.log('damn map', this.state.initMap);

        return (
            <Container>
                {/*<NavigationEvents onWillFocus={payload => this.onFocus(payload)} />*/}
				<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                    <Content   contentContainerStyle={styles.flexGrow} >
                        <TouchableOpacity style={styles.authBack} onPress={() => this.props.navigation.goBack()}>
                            <Image source={require('../../assets/images/back_white.png')} resizeMode={'contain'}  style={[styles.authImg , styles.transform]}/>
                        </TouchableOpacity>

                            <View style={[styles.langView ]}>

                                <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?'absolute' : 'padding'} style={styles.keyboardAvoid}>
                                    <Form style={{}}>

                                        <View style={styles.inputParent}>
                                            <Item style={styles.itemPicker} regular >
                                                <Label style={[styles.labelItem , {top:I18nManager.isRTL ? -18.5 : -16.5 ,
                                                    paddingLeft:I18nManager.isRTL ?Platform.OS === 'ios' ?20 : 10 : 20 ,
                                                    paddingRight:I18nManager.isRTL ?Platform.OS === 'ios' ?10:20 : 10}]}>{ i18n.t('userType') }</Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform , {top:-19}]}/>
                                                <Picker
                                                    mode="dropdown"
                                                    style={[styles.picker , {width:Platform.OS === 'ios' ? 313 : '100%'}]}
                                                    placeholderStyle={{ color: COLORS.white}}
                                                    placeholderIconColor={{color: COLORS.white}}
                                                    selectedValue={this.state.userType}
                                                    onValueChange={(value) => this.setState({ userType: value })}
                                                >
                                                    <Picker.Item label={ i18n.t('normalUser') } value={0} />
                                                    <Picker.Item label={ i18n.t('productiveOwner') + ' - ' + i18n.t('fashion') }  value={4} />
                                                    <Picker.Item label={ i18n.t('foodTrackOwner') + ' - ' + i18n.t('station') + ' - ' + i18n.t('booth') }  value={5} />
                                                    <Picker.Item label={ i18n.t('cafeOwner') + ' - ' + i18n.t('restaurant') + ' - ' + i18n.t('cafe') }  value={3} />
                                                    <Picker.Item label={ i18n.t('eventOwner') }  value={1} />
                                                    <Picker.Item label={ i18n.t('organizer') }  value={2} />
                                                </Picker>
                                                <Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                            </Item>
                                        </View>
                                        {
                                            this.state.userType != 4 ? (
                                                <View style={styles.inputParent}>
                                                    <TouchableOpacity stackedLabel style={styles.item } bordered  onPress={() =>this._toggleModal()}>
                                                        <Label style={[styles.labelItem , {top: I18nManager.isRTL ?  -8 : -3.5 }]}>{ i18n.t('location') }</Label>
                                                        <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform, styles.transform]}/>
                                                        <Text style={[styles.whiteText , styles.normalText , styles.itemText ]}>{this.state.city}</Text>
                                                    </TouchableOpacity>
                                                    <Image source={require('../../assets/images/placeholder_blue.png')} style={styles.mapMarker} resizeMode={'contain'} />
                                                </View>
                                            ):
                                                <View/>

                                        }

                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={styles.labelItem}>
                                                    { i18n.t('username') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input autoCapitalize='none' value={this.state.username} onChangeText={(username) => this.setState({username})}   style={styles.itemInput}  />
                                            </Item>
                                        </View>

                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={styles.labelItem}>
                                                    { i18n.t('phoneNumber') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={styles.itemInput}  />
                                            </Item>
                                        </View>

                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={styles.labelItem}>
                                                    { i18n.t('email') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input value={this.state.mail} onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'} style={styles.itemInput}  />
                                            </Item>
                                        </View>

                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={styles.labelItem}>
                                                    { i18n.t('password') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input autoCapitalize='none' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry  style={styles.itemInput}  />
                                            </Item>
                                        </View>

                                        <View style={styles.inputParent}>
                                            <Item stackedLabel style={styles.item } bordered>
                                                <Label style={styles.labelItem}>
                                                    { i18n.t('rePassword') }
                                                </Label>
                                                <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                                <Input autoCapitalize='none' value={this.state.rePassword} onChangeText={(rePassword) => this.setState({rePassword})} secureTextEntry  style={styles.itemInput}  />
                                            </Item>
                                        </View>

                                        {
                                            this.renderSubmit()
                                        }
                                    </Form>
                                </KeyboardAvoidingView>

                            </View>


                        <Modal onBackdropPress={()=> this.setState({ isModalVisible : false })} isVisible={this.state.isModalVisible}>
                            <View style={[styles.modalStyle , styles.p20]}>
                                {
                                    !this.state.initMap ? (
                                        <MapView
                                            style={styles.mapView}
                                            initialRegion={{
                                                latitude: this.state.mapRegion.latitude,
                                                longitude: this.state.mapRegion.longitude,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421,
                                            }}
                                        >
                                            <MapView.Marker draggable
                                                            coordinate={this.state.mapRegion}
                                                            onDragEnd={(e) =>  this._handleMapRegionChange(e.nativeEvent.coordinate)}
                                            >
                                                <Image source={require('../../assets/images/red_marker_map.png')} resizeMode={'contain'} style={styles.regMarker}/>
                                            </MapView.Marker>
                                        </MapView>
                                    ) : (<View />)
                                }
                                <View style={[styles.directionRowSpace , styles.w100 , styles.mt15 , styles.mb15]}>
                                    <Text style={[styles.boldGrayText , styles.normalText  ]}>{ i18n.t('cancelLocation') }</Text>
                                    <Switch
                                        onValueChange={() => this.cancelLocation()}
                                        value={!this.state.SwitchOnValueHolder}
                                        onTintColor={COLORS.gray}
                                        thumbTintColor={COLORS.blue}
                                        tintColor={COLORS.rose}
                                    />
                                </View>
                                <Button onPress={() => this.confirmLocation()} style={[styles.blueBtn ,styles.mt15]}>
                                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
                                </Button>
                            </View>
                        </Modal>
                    </Content>
				</ImageBackground>
            </Container>
        );
    }
}

const mapStateToProps = ({ auth, profile, lang, register }) => {
    return {
        key: auth.key,
        auth: auth.user,
        user: profile.user,
        registering: register.register,
        lang: lang.lang,
    };
};

export default connect(mapStateToProps, { register })(Register);
