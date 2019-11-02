import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    TouchableHighlight,
    FlatList,
    ImageBackground,
    StyleSheet
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Modal from "react-native-modal";


const height = Dimensions.get('window').height;
const products =[
    {key:1 , product:'اسم المنتج', family:'اسم الأسرة', category:'تصنيف حلويات', image:require('../../assets/images/event_image_tean.jpg') , price:'144 ريال' , rate:'3/5'},
    {key:2 , product:'اسم المنتج', family:'اسم الأسرة', category:'تصنيف حلويات', image:require('../../assets/images/events_pic_image.jpg') , price:'144 ريال' , rate:'3/5'},
    {key:3 , product:'اسم المنتج', family:'اسم الأسرة', category:'تصنيف حلويات', image:require('../../assets/images/image_eleven.jpg') , price:'144 ريال' , rate:'3/5'},
    {key:4 , product:'اسم المنتج', family:'اسم الأسرة', category:'تصنيف حلويات', image:require('../../assets/images/event_image_tean.jpg') , price:'144 ريال' , rate:'3/5'},
    {key:5 , product:'اسم المنتج', family:'اسم الأسرة', category:'تصنيف حلويات', image:require('../../assets/images/events_pic_image.jpg') , price:'144 ريال' , rate:'3/5'},
    {key:6 , product:'اسم المنتج', family:'اسم الأسرة', category:'تصنيف حلويات', image:require('../../assets/images/image_eleven.jpg') , price:'144 ريال' , rate:'3/5'},
]

class RestProducts extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            products,
            search:'',
            deleteProduct: false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    _deleteProduct = () => this.setState({ deleteProduct: !this.state.deleteProduct });

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <View style={[styles.notiBlock , styles.directionRow]}>

                <TouchableOpacity style={[styles.touchImg ]} onPress={ () => this.props.navigation.navigate('restProductDetails')}>
                     <Image source={item.image} resizeMode={'cover'} style={[styles.sideDrawerImg ]}/>
                </TouchableOpacity>

                <View style={[styles.directionColumn , {flex:1}]}>

                    <TouchableOpacity onPress={this._deleteProduct} style={styles.deleteProduct}>
                        <Image source={require('../../assets/images/garbage_red.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Text style={[styles.headerText , styles.writing , styles.asfs , {color:'#272727'}]}>{item.product}</Text>

                    <View style={[styles.directionRowAlignCenter]}>
                        <Image source={require('../../assets/images/category.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                        <Text style={[styles.blueText , styles.normalText , {color:COLORS.gray}]}>{item.category}</Text>
                    </View>
                    <View style={[styles.directionRowAlignCenter]}>
                        <Image source={require('../../assets/images/identification.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                        <Text style={[styles.blueText , styles.normalText , {color:COLORS.gray}]}>{item.family}</Text>
                    </View>
                    <View style={styles.directionRowAlignCenter}>
                        <View style={[styles.eventBtn]}>
                            <Text style={[styles.whiteText , styles.normalText]}>{item.price}</Text>
                        </View>
                        <View style={[styles.eventBtn , {backgroundColor:'#f0ac3f' , flexDirection:'row' , marginLeft:10}]}>
                            <Image source={require('../../assets/images/star_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                            <Text style={[styles.whiteText , styles.normalText]}>{item.rate}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
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

    submitSearch(){
        // this.props.navigation.navigate('searchResult', { search : this.state.search } );
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
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('products') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>



                            <FlatList
                                data={this.state.products}
                                renderItem={({item}) => this.renderItems(item)}
                                numColumns={1}
                                keyExtractor={this._keyExtractor}
                            />

                            <TouchableOpacity style={[styles.floatingEdit, { bottom:60}]} onPress={() => this.props.navigation.navigate('addProduct')}>
                                <Image source={require('../../assets/images/add_floting.png')} style={styles.editImg} resizeMode={'contain'}/>
                            </TouchableOpacity>

                        </View>
                    </ImageBackground>
                    <Modal onBackdropPress={()=> this.setState({ deleteProduct : false })} isVisible={this.state.deleteProduct}>
                        <View style={styles.modalEvent}>

                            <Text style={[styles.headerText , styles.mt15 , {color:'#272727'}]}>{ i18n.t('confirmDelete') }</Text>
                            <Text style={[styles.grayText , styles.mb15 , styles.normalText]}>{ i18n.t('deleteQues') }</Text>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this._deleteProduct()} style={[styles.centerBlock ,{width:'50%' , borderRightWidth:.5 , borderColor:COLORS.lightGray ,}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this._deleteProduct()} style={[styles.centerBlock ,{width:'50%'}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('cancel') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
            </Container>

        );
    }
}


export default RestProducts;