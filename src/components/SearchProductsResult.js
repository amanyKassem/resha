import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , ScrollView, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {NavigationEvents} from "react-navigation";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;


class SearchProductsResult extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            searchResult : []
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        this.setState({searchResult : this.props.navigation.state.params.searchResult})
        console.log(' this.props.navigation.state.params.searchResult' ,  this.props.navigation.state.params.searchResult)
    }


    renderLoader(){
        if (this.props.key === 0){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <DoubleBounce size={20} color={COLORS.mov} />
                </View>
            );
        }
    }
    renderNoData(){
        if (this.state.searchResult && (this.state.searchResult).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 60, alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <Animatable.View animation="fadeInUp" easing="ease-out" delay={600}>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('productDetails' , {product_id:item.id , backRoute:'searchProductsResult'})} style={[styles.notiBlock , styles.directionRow]}>
                    <Image source={{ uri: item.thumbnail }} resizeMode={'cover'} style={[styles.eventImg ]}/>
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
            </Animatable.View>
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
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.navigate(this.props.navigation.state.params.backRoute)} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText]}>{ i18n.t('searchResult') }</Text>
                        <TouchableOpacity disabled onPress={ () => this.props.navigation.navigate('productFilter' ,{ user_id: this.props.navigation.state.params.user_id , backRoute:'searchProductsResult' , catType:this.props.navigation.state.params.catType})} style={styles.headerBtn}>
                            {/*<Image source={require('../../assets/images/filter_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />*/}
                        </TouchableOpacity>
                    </Animated.View>
                </Header>

                <Content bounces={false} contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground2}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>
                            {
                                this.renderNoData()
                            }
                            <FlatList
                                data={this.state.searchResult}
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


export default SearchProductsResult;