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
    KeyboardAvoidingView ,  ImageEditor,ImageStore
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
    Form,
    Label,
    Picker,
    Icon
} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {ImageBrowser, CameraBrowser} from 'expo-multiple-imagepicker';
import Modal from "react-native-modal";


const height = Dimensions.get('window').height;
let base64   = [];
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
            photos: [{ file: null }],
            imageId: null,
            refreshed: false,
            modalEvent: false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _modalEvent = () => this.setState({ modalEvent: !this.state.modalEvent });

    backHome() {
        this.setState({ modalEvent: !this.state.modalEvent });
        this.props.navigation.navigate('drawerNavigator')
    };
    showTicket() {
        this.setState({ modalEvent: !this.state.modalEvent });
        this.props.navigation.navigate('showTicket')
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

        });

        let localUri = result.uri;
        let filename = localUri.split('/').pop();
        console.log(result);

        // check if there is image then set it and make button not disabled
        if (!result.cancelled) {
            this.setState({ userImage: result.uri ,ImgBase64:result.base64 ,eventImg:filename});
        }
    };

    async componentDidMount(){
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
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

        if (item.file === null){
            return(
                <TouchableOpacity onPress={() => this.setState({imageBrowserOpen: true})} style={[styles.directionRowAlignCenter]}>
                    <Image source={require('../../assets/images/add_more.png')} style={[styles.addMore]} resizeMode={'contain'} />
                    <Text style={[styles.blueText , styles.normalText , {marginLeft:10}  ]}>اضافة العديد من الصور</Text>
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
                        source={{uri: item.file}}
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
                if (imgs[i].file != null) {
                    const imageURL = imgs[i].file;
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


    render() {

        const backgroundColor = this.state.backgroundColor.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(0, 0, 0, 0)', '#00000099']
        });

        if (this.state.imageBrowserOpen) {
            return(<ImageBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }else if (this.state.cameraBrowserOpen) {
            return(<CameraBrowser base64={true} max={10} callback={this.imageBrowserCallback}/>);
        }
        const oldIndex =  (this.state.photos).findIndex(x => x.file === null );
        const photos   = this.array_move(this.state.photos, oldIndex, (this.state.photos).length - 1);
        console.log('image arr ..', photos);


        return (
            <Container>

                <Header style={[styles.header]} noShadow>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>اضافة فاعلية</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20} ]}>
                                    <View style={[styles.inputParent , styles.mb15]}>
                                        <TouchableOpacity stackedLabel style={styles.item } bordered  onPress={this._eventImg}>
                                            <Label style={[styles.labelItem , {top:-8 , borderBottomColor:'#fff'}]}>صور للفاعلية</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
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


                            <TouchableOpacity onPress={this._modalEvent} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('sendButton') }</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                    <Modal onBackdropPress={()=> this.setState({ modalEvent : false })} isVisible={this.state.modalEvent}>
                        <View style={styles.modalEvent}>

                            <Image source={require('../../assets/images/calendar_blue.png')} resizeMode={'contain'} style={styles.sideImg}/>

                            <Text style={[styles.headerText , {color:'#272727'}]}>نجح ارسال الفاعلية</Text>
                            <Text style={[styles.grayText , styles.normalText]}>سيتم الرد عليك من قبل الادارة</Text>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this.showTicket()} style={[styles.centerBlock ,{width:'50%' , borderRightWidth:.5 , borderColor:COLORS.lightGray ,}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>رؤية الفاعلية</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.backHome()} style={[styles.centerBlock ,{width:'50%'}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>العوده للرئيسية</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}

export default AddEventImage;