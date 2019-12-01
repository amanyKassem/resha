import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , ScrollView, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getFoodTrucks} from "../actions";
import {NavigationEvents} from "react-navigation";


const height = Dimensions.get('window').height;

class Cars extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    componentWillMount() {
        this.props.getFoodTrucks( this.props.lang )
    }

    renderLoader(){
        if (this.state.loader == 1){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <DoubleBounce size={20} color={COLORS.mov} />
                </View>
            );
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.key });
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate(this.props.user ? 'carDetails' : 'login' , { user_id: item.user_id, backRoute:'cars' ,catType:this.props.navigation.state.params.catType})} style={[styles.eventTouch ]}>
                <Image source={{ uri: item.thumbnail }} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                <View style={[styles.eventCont , { backgroundColor: '#b1aba940'}]}>
                    <Text style={[styles.whiteText , styles.BoldText , {top:-5}]}>{item.name}</Text>
                    <View style={styles.familiesEvent}>
                        <Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:12 , lineHeight:18}]}>{ i18n.t('prodNo') } : {item.products_count}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    renderNoData(){
        if (this.props.trucks && (this.props.trucks).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 20, alignSelf: 'center', width: 200, height: 200 }} />
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
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('cars') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <NavigationEvents onWillFocus={payload => this.onFocus(payload)} />
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground2}>

                        <View style={[styles.directionRowSpace , styles.w100  , styles.mt70, {paddingHorizontal:20 , paddingVertical:15}]}>
                            <View style={[styles.directionColumn , {flex: 1}]}>
                                <Text style={[styles.whiteText, styles.normalText  , styles.asfs, styles.writing ]}>{ i18n.t('foodTrack') }</Text>
                                <Text style={[styles.whiteText, styles.normalText  , styles.asfs, styles.writing , {fontSize:14}]}>{ i18n.t('number') } : {this.props.count}</Text>
                                <Text style={[styles.whiteText, styles.normalText  , styles.asfs, styles.writing , {fontSize:13} ]}>{this.props.desc}</Text>
                            </View>
                            <Image source={require('../../assets/images/undraw_car.png')} style={{ width:135, height:135}} resizeMode={'contain'} />
                        </View>

                        <View style={[styles.homeSection , styles.whiteHome , {padding:15 ,  marginTop:15}]}>
                            {this.renderNoData()}
                            <FlatList
                                data={this.props.trucks}
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


const mapStateToProps = ({ lang , profile , foodTrucks }) => {
    return {
        lang: lang.lang,
        trucks: foodTrucks.trucks,
        user: profile.user,
        desc: foodTrucks.desc,
        count: foodTrucks.count,
        key: foodTrucks.key
    };
};
export default connect(mapStateToProps, {getFoodTrucks})(Cars);