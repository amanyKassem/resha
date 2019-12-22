import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    Share,
    ImageBackground,
    KeyboardAvoidingView, Platform, I18nManager
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label, Form, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Modal from "react-native-modal";
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import {getFilterRestaurants} from "../actions";
import {connect} from "react-redux";
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;


class RestFilter extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            category: null,
            location: '',
            isModalVisible: false,
            mapRegion: null,
            hasLocationPermissions: false,
            initMap: true,
            isRestSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

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
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' +this.props.lang +'&sensor=true';

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
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' +this.props.lang +'&sensor=true';

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

    renderFamilySubmit(){
        if (this.state.isRestSubmitted) {
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
            this.setState({isRestSubmitted: false});
        }
        console.log('nextProps.filterRestaurants' , nextProps.filterRestaurants)
    }

    submitSearch(){
        this.setState({ isRestSubmitted: true });
        this.props.getFilterRestaurants( this.props.lang , this.state.mapRegion.latitude , this.state.mapRegion.longitude , this.props , 'restFilter')
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

                                    {/*<View style={styles.inputParent}>*/}
                                    {/*<Item style={styles.itemPicker} regular >*/}
                                    {/*<Label style={[styles.labelItem , {top:I18nManager.isRTL ? -18.5 : -16.5 ,*/}
                                    {/*paddingLeft:I18nManager.isRTL ?Platform.OS === 'ios' ?20 : 10 : 20 ,*/}
                                    {/*paddingRight:I18nManager.isRTL ?Platform.OS === 'ios' ?10:20 : 10,*/}
                                    {/*backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,*/}
                                    {/*borderBottomColor:'#fff'}]}>{ i18n.t('sortBy') }</Label>*/}
                                    {/*<Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform , {top:-19}]}/>*/}
                                    {/*<Picker*/}
                                    {/*mode="dropdown"*/}
                                    {/*style={[styles.picker , { color: COLORS.gray , backgroundColor:'#f5f5f5',}]}*/}
                                    {/*placeholderStyle={{ color: COLORS.gray}}*/}
                                    {/*placeholderIconColor={{color: COLORS.gray}}*/}
                                    {/*selectedValue={this.state.category}*/}
                                    {/*onValueChange={(value) => this.setState({ category: value })}*/}
                                    {/*>*/}
                                    {/*<Picker.Item label={'الاقرب لك'} value={1} />*/}
                                    {/*<Picker.Item label={'بعيد'}  value={2} />*/}
                                    {/*</Picker>*/}
                                    {/*<Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />*/}
                                    {/*</Item>*/}
                                    {/*</View>*/}

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

                                    {
                                        this.renderFamilySubmit()
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

const mapStateToProps = ({ lang , filterRestaurants , profile}) => {
    return {
        lang: lang.lang,
        filterRestaurants: filterRestaurants.filterRestaurants,
        filterKey: filterRestaurants.key,
        user: profile.user,
    };
};
export default connect(mapStateToProps, {getFilterRestaurants})(RestFilter);
