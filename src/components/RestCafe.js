import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , ScrollView, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;
const restCafe =[
    {id:1 , name:'اسم المطعم', image:require('../../assets/images/event_image_tean.jpg') , families:'200'},
    {id:2 , name:'اسم الكافيه',  image:require('../../assets/images/factory.jpg')  , families:'200'},
    {id:3 , name:'اسم المطعم',  image:require('../../assets/images/image_eleven.jpg')  , families:'200'},
]

class RestCafe extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            restCafe,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('restCafeDetails')} style={[styles.eventTouch ]}>
                <Image source={item.image} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                <View style={[styles.eventCont , { backgroundColor: '#b1aba940'}]}>
                    <Text style={[styles.whiteText , styles.BoldText , {top:-5}]}>{item.name}</Text>
                    <View style={styles.familiesEvent}>
                        <Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:12 , lineHeight:18}]}>{ i18n.t('prodNo') } : {item.families}</Text>
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

                        <TouchableOpacity onPress={ () => this.props.navigation.navigate('familyFilter')} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/filter_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.directionRowSpace , styles.w100  , styles.mt70, {paddingHorizontal:20 , paddingVertical:15}]}>
                            <View style={[styles.directionColumn , {flex: 1}]}>
                                <Text style={[styles.whiteText, styles.normalText  , styles.asfs, styles.writing ]}>{ i18n.t('rest&cafe') }</Text>
                                <Text style={[styles.whiteText, styles.normalText  , styles.asfs, styles.writing , {fontSize:14}]}>{ i18n.t('number') } : 512</Text>
                                <Text style={[styles.whiteText, styles.normalText  , styles.asfs, styles.writing , {fontSize:13} ]}>هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى،</Text>
                            </View>
                            <Image source={require('../../assets/images/resturant_undraw.png')} style={{ width:135, height:135}} resizeMode={'contain'} />
                        </View>

                        <View style={[styles.homeSection , styles.whiteHome , {padding:15 ,  marginTop:15}]}>

                            <FlatList
                                data={this.state.restCafe}
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

export default RestCafe;