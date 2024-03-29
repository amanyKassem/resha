import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , FlatList, ImageBackground, Platform,} from "react-native";
import {Container, Content, Header,Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import {connect} from "react-redux";
import {getProfileProducts , getFilterProducts} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class Products extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            search:'',
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        this.setState({ loader: 1});
        this.props.getProfileProducts( this.props.lang , this.props.navigation.state.params.user_id )
    }

    renderLoader(){
        if (this.state.loader == 1){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <Animatable.View animation="zoomIn" easing="ease-out" iterationCount="infinite">
                        <Image source={require('../../assets/images/icon.png')} style={[styles.logoImg]} resizeMode={'contain'} />
                    </Animatable.View>
                </View>
            );
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.key });
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item , i) => {
        return(
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('productDetails' , {product_id:item.id, backRoute:'products', index: i})} style={[styles.notiBlock , styles.directionRow]}>
                <Image source={{ uri: item.thumbnail  }} resizeMode={'cover'} style={[styles.eventImg ]}/>
                <View style={[styles.directionColumn , {flex:1}]}>
                    <Text style={[styles.headerText , styles.asfs, styles.writing  , {color:'#272727'}]}>{item.name}</Text>
                    <View style={[styles.directionRowAlignCenter]}>
                        <Image source={require('../../assets/images/category.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                        <Text style={[styles.blueText , styles.normalText , {color:COLORS.gray}]}>{item.category}</Text>
                    </View>
                    <View style={[styles.directionRowAlignCenter]}>
                        <Image source={require('../../assets/images/identification.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                        <Text style={[styles.blueText , styles.normalText , {color:COLORS.gray}]}>{item.profile_name}</Text>
                    </View>
                    <View style={styles.directionRowAlignCenter}>
                        <View style={[styles.eventBtn]}>
                            <Text style={[styles.whiteText , styles.normalText]}>{item.price} { i18n.t('RS') }</Text>
                        </View>
                        <View style={[styles.eventBtn , {backgroundColor:'#f0ac3f' , flexDirection:'row' , marginLeft:10}]}>
                            <Image source={require('../../assets/images/star_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                            <Text style={[styles.whiteText , styles.normalText]}>{item.rates} / 5</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderNoData(){
        if (this.props.profileProducts && (this.props.profileProducts).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 60, alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
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
        this.props.getFilterProducts( this.props.lang , this.props.navigation.state.params.user_id ,this.state.search , null , null , this.props , 'products' , this.props.navigation.state.params.catType)
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

                { this.renderLoader() }
                <Header style={[styles.header]} noShadow>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.backRoute)} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText]}>{ i18n.t('products') }</Text>
                        <TouchableOpacity onPress={ () => this.props.navigation.navigate('productFilter' ,{user_id: this.props.navigation.state.params.user_id, backRoute:'products' , catType:this.props.navigation.state.params.catType})} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/filter_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>

                            <View style={[styles.inputView , {marginHorizontal:10}]}>
                                <Item  style={styles.inputItem} bordered>
                                    <Input autoCapitalize='none' onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('search') } placeholderTextColor={'#acabae'} style={styles.modalInput}   />
                                </Item>
                                <TouchableOpacity style={[styles.searchToch]} onPress={() => this.submitSearch()}>
                                    <Image source={require('../../assets/images/search_floting.png')} style={[styles.searchImg , styles.transform]} resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>
                            {
                                this.renderNoData()
                            }
                            <FlatList
                                data={this.props.profileProducts}
                                renderItem={({item , index}) => this.renderItems(item , index)}
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

const mapStateToProps = ({ lang , profileProducts , filterProducts}) => {
    return {
        lang: lang.lang,
        profileProducts: profileProducts.profileProducts,
        filterProducts: filterProducts.filterProducts,
        key: profileProducts.key,
        filterKey: filterProducts.key,
    };
};
export default connect(mapStateToProps, {getProfileProducts , getFilterProducts})(Products);
