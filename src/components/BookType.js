import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import Modal from "react-native-modal";


const height = Dimensions.get('window').height;


class BookType extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            type:'vip'
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

    selectType(type){
        this.setState({type})
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
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>نوع التذكرة</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20} ]}>

                            <TouchableOpacity onPress={() => this.selectType('vip')} style={[styles.ticketViewType , styles.mb15, {backgroundColor:this.state.type === 'vip' ? '#deeeee' : 'transparent'}]}>
                                <Image source={require('../../assets/images/ticket_vip.png')} style={[styles.ticketType]} resizeMode={'contain'} />
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'30%'} ]}>تذكره vip</Text>
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'50%'} ]}>السعر 133 ريال</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.selectType('gold')} style={[styles.ticketViewType , styles.mb15, {backgroundColor:this.state.type === 'gold' ? '#deeeee' : 'transparent'}]}>
                                <Image source={require('../../assets/images/ticket_yellow_big.png')} style={[styles.ticketType]} resizeMode={'contain'} />
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'30%'} ]}>تذكره ذهبية</Text>
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'50%'} ]}>السعر 133 ريال</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.selectType('normal')} style={[styles.ticketViewType , {backgroundColor:this.state.type === 'normal' ? '#deeeee' : 'transparent'}]}>
                                <Image source={require('../../assets/images/ticket_gray.png')} style={[styles.ticketType]} resizeMode={'contain'} />
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'30%'} ]}>تذكره عادية</Text>
                                <Text style={[styles.whiteText , styles.normalText , styles.ticketText, { top:'50%'} ]}>السعر 133 ريال</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={ () => this.props.navigation.navigate('continueBooking')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                <Text style={[styles.whiteText , styles.normalText ]}>حجز</Text>
                            </TouchableOpacity>

                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default BookType;