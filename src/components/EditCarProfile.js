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
import {
    Container,
    Content,
    Header,
    Button,
    Item,
    Input,
    Right,
    Textarea,
    Left,
    Label,
    Form,
    Picker,
    Switch
} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Modal from "react-native-modal";
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import {getTypeCategories , getUpdateCarProfileMain} from "../actions";
import {connect} from "react-redux";
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";

const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class EditCarProfile extends Component {
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
            isSubmitted: false,
            SwitchOnValueHolder:false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };
    cancelLocation = () => {
        this.setState({SwitchOnValueHolder:!this.state.SwitchOnValueHolder})
    };
    _pickImage = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true,
            quality:.1
        });

        console.log(result);

        // check if there is image then set it and make button not disabled
        if (!result.cancelled) {
            this.setState({ restImage: result.uri ,base64:result.base64});
        }
    };

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });


    async componentWillMount() {

        // alert(this.props.navigation.state.params.category)

        this.setState({isSubmitted: false ,
            restName: this.props.navigation.state.params.name,
            location: this.props.navigation.state.params.address,
            moreDet: this.props.navigation.state.params.details,
            category: this.props.navigation.state.params.category,
        })

        this.props.getTypeCategories(this.props.lang , this.props.user.type );

        // let { status } = await Permissions.askAsync(Permissions.LOCATION);
        // if (status !== 'granted') {
        //     alert('صلاحيات تحديد موقعك الحالي ملغاه');
        // }else {
        //     const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
        //     const userLocation = { latitude, longitude };
        //     this.setState({  initMap: false, mapRegion: userLocation });
        //
        // }
        //
        // let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
		// getCity += this.props.navigation.state.params.latitude + ',' + this.props.navigation.state.params.longitude;
        // getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' +this.props.lang +'&sensor=true';
        //
        // console.log(getCity);
        //
        // try {
        //     const { data } = await axios.get(getCity);
		// 	this.setState({ location: data.results[0].formatted_address });
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
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' +this.props.lang +'&sensor=true';

        console.log('locations data', getCity);


        try {
            const { data } = await axios.get(getCity);
            console.log(data);
            this.setState({ location: this.state.SwitchOnValueHolder ? '' : data.results[0].formatted_address });

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



    async confirmLocation(){
        this.setState({ isModalVisible: !this.state.isModalVisible });
        let { status } = await Permissions.askAsync(Permissions.LOCATION);

        const { latitude, longitude } = this.state.mapRegion;

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += latitude + ',' + longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' +this.props.lang +'&sensor=true';


        try {
            const { data } = await axios.get(getCity);
            this.setState({ location: this.state.SwitchOnValueHolder ? '' : data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
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
        if (this.state.restName == '' || this.state.moreDet == '' || this.state.category == null){
            return (
                <TouchableOpacity style={[styles.blueBtn, styles.mt50 , styles.mb15 , { backgroundColor: '#999' }]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
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
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
            </TouchableOpacity>

        );
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.key == 1) {
            this.setState({isSubmitted: false});
        }
        console.log('nextProps.updateCarProfileMain' , nextProps.updateCarProfileMain)
    }

    submitData(){
        this.setState({ isSubmitted: true });
        this.props.getUpdateCarProfileMain( this.props.lang , this.state.restName , this.state.moreDet , this.state.mapRegion.latitude , this.state.mapRegion.longitude ,
            this.state.category , this.state.location , this.state.base64 , this.props.user.token , this.props, 'myCar')
    }


    onFocus(payload){
        this.componentWillMount()
    }


    render() {
        let image = this.state.restImage;
        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        console.log('mmammam', this.state.mapRegion);

        return (
            <Container>
				<NavigationEvents onWillFocus={payload => this.onFocus(payload)} />

                <Header style={[styles.header]} noShadow>
					{
						IS_IPHONE_X ?
							<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
							:
							<View/>
					}
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('myCar')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('editCar') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>
                            {image != null?

                                <TouchableOpacity onPress={this._pickImage} style={[styles.restProfile ]}>
                                    <Image source={{ uri: image }} resizeMode={'cover'} style={styles.sideDrawerImg}/>
                                </TouchableOpacity>

                                :
								<TouchableOpacity onPress={this._pickImage} style={[styles.restProfile ]}>
									<Image source={{ uri:this.props.navigation.state.params.image }} resizeMode={'cover'} style={styles.sideDrawerImg}/>
								</TouchableOpacity>
                            }
                            <Text style={[styles.blueText, styles.normalText , styles.asc , styles.tAC ]}>{ i18n.t('uploadPhoto') }</Text>


                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ?'height' : 'padding'} style={styles.keyboardAvoid}>
                                <Form style={{padding:20}}>

                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,borderBottomColor:'#fff'}]}>
                                                { i18n.t('carName') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform]}/>
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
                                    <View style={styles.inputParent}>
                                        <TouchableOpacity stackedLabel style={styles.item } bordered  onPress={() =>this._toggleModal()}>
                                            <Label style={[styles.labelItem , {top: I18nManager.isRTL ?  -8 : -3.5 ,
                                                backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                                borderBottomColor:'#fff'}]}>{ i18n.t('location') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform]}/>
                                            <Text style={[styles.whiteText , styles.normalText , styles.itemText, {backgroundColor:'#f5f5f5',  color: COLORS.gray } ]}>{this.state.location}</Text>
                                        </TouchableOpacity>
                                        <Image source={require('../../assets/images/placeholder_blue.png')} style={styles.mapMarker} resizeMode={'contain'} />
                                    </View>

                                    <View style={[styles.inputParent , {height:133}]}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' , borderBottomColor:'#fff'}]}>
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
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , typeCategories , updateProfileMain , profile}) => {
    return {
        lang: lang.lang,
        typeCategories: typeCategories.typeCategories,
        updateCarProfileMain: updateProfileMain.updateCarProfileMain,
        user: profile.user,
        key:updateProfileMain.key
    };
};
export default connect(mapStateToProps, {getTypeCategories , getUpdateCarProfileMain})(EditCarProfile);
