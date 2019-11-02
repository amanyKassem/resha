import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , ScrollView, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;
const products =[
    {id:1 , product:'اسم المنتج', family:'اسم الأسرة', category:'تصنيف حلويات', image:require('../../assets/images/event_image_tean.jpg') , price:'144 ريال' , rate:'3/5'},
    {id:1 , product:'اسم المنتج', family:'اسم الأسرة', category:'تصنيف حلويات', image:require('../../assets/images/events_pic_image.jpg') , price:'144 ريال' , rate:'3/5'},
    {id:1 , product:'اسم المنتج', family:'اسم الأسرة', category:'تصنيف حلويات', image:require('../../assets/images/image_eleven.jpg') , price:'144 ريال' , rate:'3/5'},
]

class Products extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            products,
            search:'',
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('productDetails')} style={[styles.notiBlock , styles.directionRow]}>
                <Image source={item.image} resizeMode={'cover'} style={[styles.eventImg ]}/>
                <View style={[styles.directionColumn , {flex:1}]}>
                    <Text style={[styles.headerText , styles.asfs, styles.writing  , {color:'#272727'}]}>{item.product}</Text>
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
            </TouchableOpacity>
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
                        <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText]}>{ i18n.t('products') }</Text>
                        <TouchableOpacity onPress={ () => this.props.navigation.navigate('productFilter')} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/filter_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>

                            <View style={[styles.inputView , {marginHorizontal:10}]}>
                                <Item  style={styles.inputItem} bordered>
                                    <Input autoCapitalize='none' onSubmitEditing={() => this.submitSearch() } onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('search') } placeholderTextColor={'#acabae'} style={styles.modalInput}   />
                                </Item>
                                <TouchableOpacity style={[styles.searchToch]} onPress={() => this.submitSearch()}>
                                    <Image source={require('../../assets/images/search_floting.png')} style={[styles.searchImg , styles.transform]} resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={this.state.products}
                                renderItem={({item}) => this.renderItems(item)}
                                numColumns={1}
                                keyExtractor={this._keyExtractor}
                            />

                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default Products;