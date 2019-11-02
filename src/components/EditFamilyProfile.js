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
import Modal from "react-native-modal";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';


const height = Dimensions.get('window').height;

class EditFamilyProfile extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            restImage: null,
            base64: null,
            restName: '',
            category: null,
            location: '',
            isModalVisible: false,
            mapRegion: null,
            hasLocationPermissions: false,
            initMap: true,
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
            this.setState({ restImage: result.uri ,base64:result.base64});
        }
    };

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
            this.setState({ location: data.results[0].formatted_address });

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
            this.setState({ location: data.results[0].formatted_address });

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
        let image = this.state.restImage;
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('editFamily') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>
                            {image != null?

                                <TouchableOpacity onPress={this._pickImage} style={[styles.restProfile ]}>
                                    <Image source={{ uri: image }} resizeMode={'cover'} style={styles.sideDrawerImg}/>
                                </TouchableOpacity>

                                :
                                <TouchableOpacity onPress={this._pickImage} style={[styles.restProfile ]}>
                                    <Image source={require('../../assets/images/upload_button.png')} resizeMode={'contain'} style={styles.headerMenu}/>
                                </TouchableOpacity>
                            }
                            <Text style={[styles.blueText, styles.normalText , styles.asc , styles.tAC ]}>{ i18n.t('uploadPhoto') }</Text>


                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?'height' : 'padding'} style={styles.keyboardAvoid}>
                                <Form style={{padding:20}}>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                { i18n.t('familyName') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Input autoCapitalize='none' value={this.state.restName} onChangeText={(restName) => this.setState({restName})} style={[styles.itemInput , {backgroundColor:'#f5f5f5',  color: COLORS.gray }]}  />
                                        </Item>
                                    </View>
                                    <View style={styles.inputParent}>
                                        <Item style={styles.itemPicker} regular >
                                            <Label style={[styles.labelItem , {top:I18nManager.isRTL ? -18.5 : -16.5 ,
                                                paddingLeft:I18nManager.isRTL ?Platform.OS === 'ios' ?20 : 10 : 20 ,
                                                paddingRight:I18nManager.isRTL ?Platform.OS === 'ios' ?10:20 : 10,
                                                backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                                borderBottomColor:'#fff'}]}>{ i18n.t('category') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform , {top:-19}]}/>
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
                                    <View style={styles.inputParent}>
                                        <TouchableOpacity stackedLabel style={styles.item } bordered  onPress={() =>this._toggleModal()}>
                                            <Label style={[styles.labelItem , {top: I18nManager.isRTL ?  -8 : -3.5 ,
                                                backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                                borderBottomColor:'#fff'}]}>{ i18n.t('location') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Text style={[styles.whiteText , styles.normalText , styles.itemText, {backgroundColor:'#f5f5f5',  color: COLORS.gray } ]}>{this.state.location}</Text>
                                        </TouchableOpacity>
                                        <Image source={require('../../assets/images/placeholder_blue.png')} style={styles.mapMarker} resizeMode={'contain'} />
                                    </View>

                                    <View style={[styles.inputParent , {height:133}]}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                { i18n.t('moreDetails') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg, styles.transform]}/>
                                            <Textarea autoCapitalize='none' value={this.state.moreDet} onChangeText={(moreDet) => this.setState({moreDet})} style={[styles.textarea]}  />
                                        </Item>
                                    </View>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('editFamilyContact')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                        <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
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

export default EditFamilyProfile;