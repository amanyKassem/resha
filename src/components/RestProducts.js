import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    FlatList,
    ImageBackground, Platform
} from "react-native";
import {
    Container,
    Content,
    Header,
    Right,
    Left,
    Toast
} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Modal from "react-native-modal";
import {connect} from "react-redux";
import {getAuthProducts , getDeleteProduct} from "../actions";
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class RestProducts extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            loader: 1,
            search:'',
            deleteProduct: false,
            prodID:''
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        this.setState({ loader: 1});
        this.props.getAuthProducts( this.props.lang , this.props.user.token  )
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
    addProductNavigation(){
        if(this.props.navigation.state.params.backRoute == 'myCar' && this.props.navigation.state.params.category_id == null){
            Toast.show({
                text:  i18n.t('chooseCategoryName') ,
                type: "danger",
                duration: 3000
            });
        }
        else{
            this.props.navigation.navigate('addProduct', {backRoute:'restProducts', afterAdd: this.props.navigation.state.params.backRoute})
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.key });
    }

    _deleteProduct = (product_id) => {
        this.setState({ deleteProduct: !this.state.deleteProduct , prodID:product_id});
    }

    confirmDelete = () => {
        this.setState({ deleteProduct: !this.state.deleteProduct });
        this.props.getDeleteProduct( this.props.lang , this.state.prodID , this.props.user.token )
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <Animatable.View animation="fadeInUp" easing="ease-out" delay={600} style={[styles.notiBlock , styles.directionRow]}>

                <TouchableOpacity style={[styles.touchImg ]} onPress={ () => this.props.navigation.navigate('restProductDetails', {product_id:item.id , backRoute:'restProducts'})}>
                     <Image source={{ uri: item.thumbnail  }} resizeMode={'cover'} style={[styles.sideDrawerImg ]}/>
                </TouchableOpacity>

                <View style={[styles.directionColumn , {flex:1}]}>

                    <TouchableOpacity onPress={() => this._deleteProduct(item.id)} style={styles.deleteProduct}>
                        <Image source={require('../../assets/images/garbage_red.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                    </TouchableOpacity>

                    <Text style={[styles.headerText , styles.writing , styles.asfs , {color:'#272727'}]}>{item.name}</Text>

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
                            <Text style={[styles.whiteText , styles.normalText]}>{item.price}</Text>
                        </View>
                        <View style={[styles.eventBtn , {backgroundColor:'#f0ac3f' , flexDirection:'row' , marginLeft:10}]}>
                            <Image source={require('../../assets/images/star_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                            <Text style={[styles.whiteText , styles.normalText]}>{item.rates} / 5</Text>
                        </View>
                    </View>
                </View>
            </Animatable.View>
        );
    }

    renderNoData(){
        if (this.props.authProducts && (this.props.authProducts).length <= 0){
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
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-45 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.backRoute)} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('products') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>

                            {
                                this.renderNoData()
                            }
                            <FlatList
                                data={this.props.authProducts}
                                renderItem={({item}) => this.renderItems(item)}
                                numColumns={1}
                                keyExtractor={this._keyExtractor}
                            />

                        </View>
                    </ImageBackground>
                    <Modal onBackdropPress={()=> this.setState({ deleteProduct : false })} isVisible={this.state.deleteProduct}>
                        <View style={styles.modalEvent}>

                            <Text style={[styles.headerText , styles.mt15 , {color:'#272727'}]}>{ i18n.t('confirmDelete') }</Text>
                            <Text style={[styles.grayText , styles.mb15 , styles.normalText]}>{ i18n.t('deleteQues') }</Text>

                            <View style={styles.line}/>

                            <View style={styles.directionRowSpace}>
                                <TouchableOpacity onPress={() => this.confirmDelete()} style={[styles.centerBlock ,{width:'50%' , borderRightWidth:.5 , borderColor:COLORS.lightGray ,}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('confirm') }</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => this.setState({ deleteProduct: !this.state.deleteProduct })} style={[styles.centerBlock ,{width:'50%'}]}>
                                    <Text style={[styles.blueText , styles.normalText]}>{ i18n.t('cancel') }</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </Content>
				<TouchableOpacity style={[styles.floatingEdit, { bottom:60}]}
					onPress={() => this.addProductNavigation()}>
					{/*onPress={() => {this.props.navigation.navigate('addProduct', {backRoute:'restProducts'})}}>*/}
					<Image source={require('../../assets/images/add_floting.png')} style={styles.editImg} resizeMode={'contain'}/>
				</TouchableOpacity>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , authProducts , profile}) => {
    return {
        lang: lang.lang,
        authProducts: authProducts.authProducts,
        key: authProducts.key,
        user: profile.user,
    };
};
export default connect(mapStateToProps, {getAuthProducts , getDeleteProduct})(RestProducts);
