import React, { Component } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions, Animated, FlatList, ImageBackground, ImageEditor, ImageStore, Platform, I18nManager } from "react-native";
import { Container, Content, Header, Right, Left, Label, } from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { ImageBrowser } from 'expo-image-picker-multiple';
import Modal from "react-native-modal";
import {connect} from "react-redux";
import {getStoreEvent} from "../actions";
import {NavigationEvents} from "react-navigation";
import {DoubleBounce} from "react-native-loader";


const height        = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';
let base64          = [];

class AddEventImage extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            userImage: null,
            ImgBase64: null,
            eventImg: '',
            imageBrowserOpen: false,
            cameraBrowserOpen: false,
            photos: [{ uri: null }],
            imageId: null,
            refreshed: false,
            modalEvent: false,
            isSubmitted: false
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        base64   = [];
        this.setState({ isSubmitted: false , modalEvent: false});
    }

    renderSubmit(){
        if (base64.length != 0 ){
            return (
                <TouchableOpacity onPress={() => console.log(base64.length)} style={[styles.blueBtn, styles.mt50 , styles.mb15 , { backgroundColor: '#999' }]}>
                    <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('sendButton') }</Text>
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
            <TouchableOpacity onPress={this._modalEvent} style={[styles.blueBtn , styles.mt50, styles.mb15]}>
                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('sendButton') }</Text>
            </TouchableOpacity>

        );
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.storeEvent) {
            this.setState({isSubmitted: false ,  modalEvent: !this.state.modalEvent});
        }

        console.log('nextProps.storeEvent' , nextProps.storeEvent)
    }

    _modalEvent = () =>{
        this.setState({ isSubmitted: true });


        console.log(this.props.navigation.state.params.ar_name ,
            this.props.navigation.state.params.en_name ,
            this.props.navigation.state.params.date ,
            this.props.navigation.state.params.time ,
            this.props.navigation.state.params.event_hours ,
            this.props.navigation.state.params.address ,
            this.props.navigation.state.params.latitude ,
            this.props.navigation.state.params.longitude ,
            this.props.navigation.state.params.ar_description,
            this.props.navigation.state.params.en_description,
            this.props.navigation.state.params.organization_id,
            this.props.navigation.state.params.category_id,
            this.props.navigation.state.params.tickets);

        this.props.getStoreEvent( this.props.lang ,
            this.props.navigation.state.params.ar_name ,
            this.props.navigation.state.params.en_name ,
            this.props.navigation.state.params.date ,
            this.props.navigation.state.params.time ,
            this.props.navigation.state.params.event_hours ,
            this.props.navigation.state.params.address ,
            this.props.navigation.state.params.latitude ,
            this.props.navigation.state.params.longitude ,
            this.props.navigation.state.params.ar_description,
            this.props.navigation.state.params.en_description,
            this.props.navigation.state.params.organization_id,
            this.props.navigation.state.params.category_id,
            this.props.navigation.state.params.tickets,
            base64,
            this.props.user.token,
            this.props
        )
    }

    backHome() {
        this.setState({ modalEvent: !this.state.modalEvent });
        this.props.navigation.navigate('home')
    };

    showTicket() {
        this.setState({ modalEvent: !this.state.modalEvent });
        this.props.navigation.navigate('showTicket', {eventType: this.props.storeEvent.eventType , event_id : this.props.storeEvent.event_id})
    };

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
    };

    _eventImg = async () => {

        this.askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true,
            quality:.1

        });
        base64.push(result.base64)
        let localUri = result.uri;
        let filename = localUri.split('/').pop();


        // check if there is image then set it and make button not disabled
        if (!result.cancelled) {
            this.setState({ userImage: result.uri ,ImgBase64:result.base64 ,eventImg:filename});
        }
    };

    async componentDidMount(){
        await Permissions.askAsync(Permissions.CAMERA);
        // await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }


    _keyExtractor = (item, index) => item.id;

    selectImage(md5){
        this.setState({ imageId: md5, refreshed: !this.state.refreshed })
    }

    deleteImage(item){
        let index = this.state.photos.indexOf(item);
        console.log('this is item ....', index)

        let photos = this.state.photos;
        photos.splice(index, 1);
        console.log('this is photos ....', photos)
        this.setState({ photos, refreshed: !this.state.refreshed, imageId: null })
    }

    renderItems = (item, imageId) => {

        const {ar_name, en_name, date, time, event_hours, address, latitude, longitude, ar_description,  en_description, organization_id, category_id, tickets } = this.props.navigation.state.params;

        if (item.uri === null){
            return(
                <TouchableOpacity onPress={() => this.props.navigation.navigate('imageBrowser', { routeName: 'addEventImage', ar_name, en_name, date, time, event_hours, address, latitude, longitude, ar_description, en_description, organization_id, category_id, tickets, eventImg: this.state.eventImg })} style={[styles.directionRowAlignCenter]}>
                    <Image source={require('../../assets/images/add_more.png')} style={[styles.addMore]} resizeMode={'contain'} />
                    <Text style={[styles.blueText , styles.normalText , {marginLeft:10}  ]}>{ i18n.t('addManyPhotos') }</Text>
                </TouchableOpacity>
            );
        }

        return(
            <View style={{ marginBottom:10 , marginHorizontal:5, flex: 1 }}>
                <TouchableOpacity onPress={() => this.deleteImage(item)} style={[styles.removeImg , {height: imageId === item.md5 ? 100 : 0}]}>
                    <Image source={require('../../assets/images/cancel_icon.png')} style={[styles.headerMenu , { height: imageId === item.md5 ? 25 : 0,  opacity: 1 }]} resizeMode={'contain'} />
                </TouchableOpacity>
                <TouchableOpacity style={{ height: 100 }} onPress={() => this.selectImage(item.md5)}>
                    <Image
                        style={{ height: 100, width: '100%', borderRadius: 3 }}
                        source={{uri: item.uri }}
                    />
                </TouchableOpacity>
            </View>
        );
    }

    imageBrowserCallback = (callback) => {
        callback.then((photos) => {
            let images =  this.state.photos;
            this.setState({
                imageBrowserOpen: false,
                photos: images.concat(photos)
            });

            const imgs = this.state.photos;
            for (var i =0; i < imgs.length; i++){
                if (imgs[i].uri != null) {
                    const imageURL = imgs[i].uri;
                    Image.getSize(imageURL, (width, height) => {
                        var imageSize = {
                            size: {
                                width,
                                height
                            },
                            offset: {
                                x: 0,
                                y: 0,
                            },
                        };

                        ImageEditor.cropImage(imageURL, imageSize, (imageURI) => {
                            ImageStore.getBase64ForTag(imageURI, (base64Data) => {
                                base64.push(base64Data);
                                ImageStore.removeImageForTag(imageURI);
                            }, (reason) => console.log(reason))
                        }, (reason) => console.log(reason))
                    }, (reason) => console.log(reason))
                }
            }
        }).catch((e) => console.log(e))
    };

    array_move(arr, old_index, new_index) {
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
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

    async onFocus(payload){
        this.componentWillMount()

        if (this.props.navigation.state.params && this.props.navigation.state.params.photos){
            this.setState({ photos: this.props.navigation.state.params.photos, eventImg: this.props.navigation.state.params.eventImg })
            let images =  this.state.photos;

            this.setState({ photos: images.concat(this.props.navigation.state.params.photos) });
            const imgs = images.concat(this.props.navigation.state.params.photos);
            for (var i =0; i < imgs.length; i++){
                if (imgs[i].uri != null) {
                    const imageURL = imgs[i].uri;
                    await FileSystem.readAsStringAsync(imageURL, { encoding: 'base64' }).then((base) => {
                        console.log('damn base', imageURL, base64.length)
                        base64.push(base);
                    })
                }
            }
        }
    }

    render() {

        const {ar_name, en_name, date, time, event_hours, address, latitude, longitude, ar_description,  en_description, organization_id, category_id, tickets } = this.props.navigation.state.params;
        console.log( 'ar_name :', ar_name, 'en_name :',en_name, 'date :' ,date, 'time :', time, 'event_hours :', event_hours, 'address :', address, 'latitude :' , latitude, 'longitude :' , 'longitude :', longitude, 'ar_description :', ar_description, 'en_description :', en_description, 'organization_id :', organization_id, 'category_id :', category_id, 'tickets :', tickets )

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        const oldIndex =  (this.state.photos).findIndex(x => x.uri === null );
        const photos   = this.array_move(this.state.photos, oldIndex, (this.state.photos).length - 1);
        console.log('image arr ..', photos);

        return (
            <Container>

                <Header style={[styles.header]} noShadow>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('addEventPrice', { ar_name, en_name, date, time, event_hours, address, latitude, longitude, ar_description,  en_description, organization_id, category_id, tickets })} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('addEvent') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20} ]}>
                            <View style={[styles.inputParent , styles.mb15]}>
                                <TouchableOpacity stackedLabel style={styles.item } bordered  onPress={this._eventImg}>
                                    <Label style={[styles.labelItem , {top: I18nManager.isRTL ?  -8 : -3.5 ,
                                        backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                        borderBottomColor:'#fff'}]}>{ i18n.t('eventPhotos') }</Label>
                                    <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform]}/>
                                    <Text style={[styles.whiteText , styles.normalText , styles.itemText, {backgroundColor:'#f5f5f5',  color: COLORS.gray } ]}>{this.state.eventImg}</Text>
                                </TouchableOpacity>
                                <Image source={require('../../assets/images/add_camera.png')} style={styles.mapMarker} resizeMode={'contain'} />
                            </View>

                            <FlatList
                                data={photos}
                                renderItem={({item}) => this.renderItems(item, this.state.imageId)}
                                numColumns={2}
                                keyExtractor={this._keyExtractor}
                                extraData={this.state.refreshed}
                            />

                            {
                                this.renderSubmit()
                            }

                        </View>
                    </ImageBackground>
                    <Modal onBackdropPress={()=> this.setState({ modalEvent : false })} isVisible={this.state.modalEvent}>
                        <View style={styles.modalEvent}>

                            <Image source={require('../../assets/images/calendar_blue.png')} resizeMode={'contain'} style={styles.sideImg}/>

                            <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('eventSent') }</Text>
                            <Text style={[styles.grayText , styles.normalText]}>{ i18n.t('willBeAnswered') }</Text>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this.showTicket()} style={[styles.centerBlock ,{width:'50%' , borderRightWidth:.5 , borderColor:COLORS.lightGray ,}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('seeEvent') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.backHome()} style={[styles.centerBlock ,{width:'50%'}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('home') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , profile , storeEvent }) => {
    return {
        lang: lang.lang,
        user: profile.user,
        storeEvent: storeEvent.storeEvent,
        key: storeEvent.key
    };
};
export default connect(mapStateToProps, {getStoreEvent})(AddEventImage);
