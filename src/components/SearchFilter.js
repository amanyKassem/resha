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
import {Container, Content, Header, Button, Item, Right, Left, Label, Form, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Modal from "react-native-modal";
import * as Permissions from 'expo-permissions';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import DateTimePicker from "react-native-modal-datetime-picker";
import {getEventCategories, getEventsPrices , getFilterEvents} from "../actions";
import {connect} from "react-redux";
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class SearchFilter extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            city: null,
            eventType: null,
            location: '',
            isModalVisible: false,
            mapRegion: null,
            hasLocationPermissions: false,
            initMap: true,
            date: '',
            isDatePickerVisible: false,
            value: 0,
            isSubmitted: false
            // max: null,
            // step: null,
            // min: null,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _toggleModal = () => this.setState({ isModalVisible: !this.state.isModalVisible });

    change(value){
        this.setState({value})
    }


    showDatePicker = () => {
        this.setState({ isDatePickerVisible: true });
    };

    hideDatePicker = () => {
        this.setState({ isDatePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        let formatted_date = date.getFullYear() + "-" + ("0"+(date.getMonth() + 1)).slice(-2) + "-" + ("0" +date.getDate()).slice(-2);
        this.setState({ date : formatted_date });

        this.hideDatePicker();
    };

    async componentWillMount() {


        this.props.getEventCategories(this.props.lang);
        this.props.getEventsPrices(this.props.lang);


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
        getCity += '&key=AIzaSyCiptKZt0io7ZOgjNPQ0yvjST9AQrUCW5Y&language=' +this.props.lang +'&sensor=true';

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
        getCity += '&key=AIzaSyCiptKZt0io7ZOgjNPQ0yvjST9AQrUCW5Y&language=' +this.props.lang +'&sensor=true';

        console.log('locations data', getCity);


        try {
            const { data } = await axios.get(getCity);
            console.log(data);
            this.setState({ location: data.results[0].formatted_address });

        } catch (e) {
            console.log(e);
        }
    }



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
        if (nextProps.eventsPrices) {
            this.setState({value:nextProps.eventsPrices.min})
        }

        console.log('nextProps.filterEvents' , nextProps.filterEvents)
    }

    submitSearch(){
        this.setState({ isSubmitted: true });
        this.props.getFilterEvents( this.props.lang , this.state.value , this.state.mapRegion.latitude , this.state.mapRegion.longitude , this.state.eventType , this.props.user.token , this.props, 'searchFilter')
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
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-45 , height:350 , width:'100%'}}/>
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
                                                {/*borderBottomColor:'#fff'}]}>{ i18n.t('city') }</Label>*/}
                                            {/*<Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform , {top:-19}]}/>*/}
                                            {/*<Picker*/}
                                                {/*mode="dropdown"*/}
                                                {/*style={[styles.picker , { color: COLORS.gray , backgroundColor:'#f5f5f5',}]}*/}
                                                {/*placeholderStyle={{ color: COLORS.gray}}*/}
                                                {/*placeholderIconColor={{color: COLORS.gray}}*/}
                                                {/*selectedValue={this.state.city}*/}
                                                {/*onValueChange={(value) => this.setState({ city: value })}*/}
                                            {/*>*/}
                                                {/*<Picker.Item label={'الرياض'} value={1} />*/}
                                                {/*<Picker.Item label={'القاهرة'}  value={2} />*/}
                                            {/*</Picker>*/}
                                            {/*<Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />*/}
                                        {/*</Item>*/}
                                    {/*</View>*/}
                                    <View style={styles.inputParent}>
                                        <Item style={styles.itemPicker} regular >
                                            <Label style={[styles.labelItem , {top:I18nManager.isRTL ? -18.5 : -16.5 ,
                                                paddingLeft:I18nManager.isRTL ?Platform.OS === 'ios' ?20 : 10 : 20 ,
                                                paddingRight:I18nManager.isRTL ?Platform.OS === 'ios' ?10:20 : 10,
                                                backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                                borderBottomColor:'#fff'}]}>{ i18n.t('eventType') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform , {top:-19}]}/>
                                            {
                                                this.props.eventCategories?
                                                    <Picker
                                                        mode="dropdown"
                                                        style={[styles.picker , { color: COLORS.gray , backgroundColor:'#f5f5f5',}]}
                                                        placeholderStyle={{ color: COLORS.gray}}
                                                        placeholderIconColor={{color: COLORS.gray}}
                                                        selectedValue={this.state.eventType}
                                                        onValueChange={(value) => this.setState({ eventType: value })}
                                                    >
                                                        <Picker.Item label={ i18n.t('eventType') } value={null} />
                                                        {
                                                            this.props.eventCategories.map((cat, i) => (
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
                                    <View style={styles.inputParent}>
                                        <TouchableOpacity stackedLabel style={styles.item } bordered  onPress={() =>this._toggleModal()}>
                                            <Label style={[styles.labelItem , {top: I18nManager.isRTL ?  -8 : -3.5
                                                ,backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                                borderBottomColor:'#fff'}]}>{ i18n.t('location') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform]}/>
                                            <Text style={[styles.whiteText , styles.normalText , styles.itemText, {backgroundColor:'#f5f5f5',  color: COLORS.gray } ]}>{this.state.location}</Text>
                                        </TouchableOpacity>
                                        <Image source={require('../../assets/images/placeholder_blue.png')} style={styles.mapMarker} resizeMode={'contain'} />
                                    </View>
                                    <View style={styles.inputParent}>
                                        <TouchableOpacity stackedLabel style={styles.item } bordered  onPress={this.showDatePicker}>
                                            <Label style={[styles.labelItem , {top: I18nManager.isRTL ?  -8 : -3.5 ,
                                                backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                                borderBottomColor:'#fff'}]}>{ i18n.t('date') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform]}/>
                                            <Text style={[styles.whiteText , styles.normalText , styles.itemText, {backgroundColor:'#f5f5f5',  color: COLORS.gray } ]}>{this.state.date}</Text>
                                        </TouchableOpacity>
                                        <Image source={require('../../assets/images/calendar_icon_small.png')} style={styles.mapMarker} resizeMode={'contain'} />
                                        <DateTimePicker
                                            isVisible={this.state.isDatePickerVisible}
                                            onConfirm={this.handleDatePicked}
                                            onCancel={this.hideDatePicker}
                                            mode={'date'}
                                        />
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mt15]}>
                                        <Image source={require('../../assets/images/feather_color.png')} style={[styles.resha , styles.transform]} resizeMode={'contain'} />
                                        <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('price') }</Text>
                                    </View>

                                    {
                                        this.props.eventsPrices?
                                            <View style={styles.sliderParent}>
                                                <Slider
                                                    step={10}
                                                    minimumValue={this.props.eventsPrices.min}
                                                    maximumValue={this.props.eventsPrices.max}
                                                    onValueChange={(value) => this.change(value)}
                                                    // value={this.state.value}
                                                    thumbTintColor={COLORS.rose}
                                                    style={styles.slider}
                                                    maximumTrackTintColor={"#000"}
                                                    minimumTrackTintColor={COLORS.blue}
                                                />
                                                <View style={styles.range}>
                                                    <Left><Text style={[styles.headerText , {color:'#272727'}]}>{this.props.eventsPrices.min}</Text></Left>
                                                    <Text style={[styles.headerText , {color:'#272727'}]}>{this.state.value}</Text>
                                                    <Right><Text style={[styles.headerText , {color:'#272727'}]}>{this.props.eventsPrices.max}</Text></Right>
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

const mapStateToProps = ({ lang , eventCategories , eventsPrices , filterEvents , profile}) => {
    return {
        lang: lang.lang,
        eventCategories: eventCategories.eventCategories,
        filterEvents: filterEvents.filterEvents,
        filterKey: filterEvents.key,
        user: profile.user,
        eventsPrices: eventsPrices.eventsPrices,
    };
};
export default connect(mapStateToProps, {getEventCategories , getEventsPrices , getFilterEvents})(SearchFilter);
