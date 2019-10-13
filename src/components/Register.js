import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions,  ImageBackground , KeyboardAvoidingView} from "react-native";
import {Container, Content, Form, Picker, Input, Item, Label, Button} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Modal from "react-native-modal";
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';


const height = Dimensions.get('window').height;

class Register extends Component {
    constructor(props){
        super(props);

        this.state={
            userType: null,
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
        }
    }
    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });




    async componentWillMount() {


        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            const userLocation = { latitude, longitude };
            this.setState({  initMap: false, mapRegion: userLocation });

        }

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += this.state.mapRegion.latitude + ',' + this.state.mapRegion.longitude;
        getCity += '&key=AIzaSyDYjCVA8YFhqN2pGiW4I8BCwhlxThs1Lc0&language=ar&sensor=true';

        console.log(getCity);

        try {
            const { data } = await axios.get(getCity);
            this.setState({ city: data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
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
        getCity += '&key=AIzaSyDYjCVA8YFhqN2pGiW4I8BCwhlxThs1Lc0&language=ar&sensor=true';

        console.log('locations data', getCity);


        try {
            const { data } = await axios.get(getCity);
            console.log(data);
            this.setState({ city: data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
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



    confirmLocation(){
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    render() {


        return (
            <Container>
                <Content contentContainerStyle={styles.flexGrow} >
                    <TouchableOpacity style={styles.authBack} onPress={() => this.props.navigation.goBack()}>
                        <Image source={require('../../assets/images/back_white.png')} resizeMode={'contain'}  style={[styles.authImg , styles.transform]}/>
                    </TouchableOpacity>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.langView ]}>

                            <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={{}}>

                                    <View style={styles.inputParent}>
                                        <Item style={styles.itemPicker} regular >
                                            <Label style={[styles.labelItem , {top:-18.5 , paddingRight:20}]}>نوع المستخدم</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , {top:-19}]}/>
                                            <Picker
                                                mode="dropdown"
                                                style={styles.picker}
                                                placeholderStyle={{ color: COLORS.white}}
                                                placeholderIconColor={{color: COLORS.white}}
                                                selectedValue={this.state.userType}
                                                onValueChange={(value) => this.setState({ userType: value })}
                                            >
                                                <Picker.Item label={'مستخدم عادي'} value={1} />
                                                <Picker.Item label={'صاحب فاعلية'}  value={2} />
                                                <Picker.Item label={'منظم'} value={3} />
                                                <Picker.Item label={'صاحب كافيه'}  value={4} />
                                                <Picker.Item label={'صاحب اسرة منتجة'}  value={5} />
                                                <Picker.Item label={'صاحب فود تراك'}  value={6} />
                                            </Picker>
                                            <Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                        </Item>
                                    </View>

                                    {
                                        this.state.userType != 5 ? (
                                            <View style={styles.inputParent}>
                                                <TouchableOpacity stackedLabel style={styles.item } bordered  onPress={() =>this._toggleModal()}>
                                                    <Label style={[styles.labelItem , {top:-8}]}>{ i18n.t('location') }</Label>
                                                    <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
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
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input autoCapitalize='none' value={this.state.username} onChangeText={(username) => this.setState({username})}   style={styles.itemInput}  />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={styles.labelItem}>
                                                { i18n.t('phoneNumber') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input value={this.state.phone} onChangeText={(phone) => this.setState({phone})} keyboardType={'number-pad'} style={styles.itemInput}  />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={styles.labelItem}>
                                                { i18n.t('email') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input value={this.state.mail} onChangeText={(mail) => this.setState({mail})} keyboardType={'email-address'} style={styles.itemInput}  />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={styles.labelItem}>
                                                { i18n.t('password') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input autoCapitalize='none' value={this.state.password} onChangeText={(password) => this.setState({password})} secureTextEntry  style={styles.itemInput}  />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={styles.labelItem}>
                                                { i18n.t('rePassword') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input autoCapitalize='none' value={this.state.rePassword} onChangeText={(rePassword) => this.setState({rePassword})} secureTextEntry  style={styles.itemInput}  />
                                        </Item>
                                    </View>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('activationCode')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                        <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('register') }</Text>
                                    </TouchableOpacity>
                                </Form>
                            </KeyboardAvoidingView>

                        </View>


                    </ImageBackground>
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
                            <Button onPress={() => this.confirmLocation()} style={[styles.blueBtn ,styles.mt15]}>
                                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
                            </Button>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

export default Register;