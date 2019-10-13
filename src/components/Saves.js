import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , ScrollView, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import FooterSection from './FooterSection';


const height = Dimensions.get('window').height;
const events =[
    {id:1 , name:'أمسيات رمضان', image:require('../../assets/images/event_image_tean.jpg') , date:'15 مايو'},
    {id:2 , name:'مؤتمرات عالمية',  image:require('../../assets/images/events_pic_image.jpg')  , date:'15 مايو'},
    {id:3 , name:'حفلات موسيقية',  image:require('../../assets/images/image_eleven.jpg')  , date:'15 مايو'},
]

class Saves extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            events,
            activeType:0,
            savedEvent: true,
            refreshed: false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });



    savedEvent() {
        this.setState({savedEvent: !this.state.savedEvent , refreshed: !this.state.refreshed})
    }

    renderImage() {
        let source = '';
        if (this.state.savedEvent) {
            source = require('../../assets/images/bookmark_bink.png')
        } else {
            source = require('../../assets/images/bookmark_white.png')
        }
        return source;
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('bookTicket')} style={[styles.eventTouch , {marginTop :20 , marginBottom:0}]}>
                <TouchableOpacity onPress={() => this.savedEvent()} style={styles.saveBtn}>
                    <Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />
                </TouchableOpacity>
                <Image source={item.image} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                <View style={[styles.eventCont]}>
                    <Text style={[styles.whiteText , styles.BoldText]}>{item.name}</Text>
                    <View style={styles.dateEvent}>
                        <Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:12 , lineHeight:18}]}>{item.date}</Text>
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
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>المحفوظات</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>


                        <View style={styles.mainScroll}>
                            <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity onPress={ () => this.setState({activeType:0})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 0 ? COLORS.rose : COLORS.gray}]}>الفاعليات</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 0 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.setState({activeType:1})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 1 ? COLORS.rose : COLORS.gray}]}>الأسر المنتجة</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 1 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.setState({activeType:2})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 2 ? COLORS.rose : COLORS.gray}]}>المطاعم والكافيهات</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 2 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        <View style={[styles.homeSection , {paddingHorizontal:10 ,   marginTop:15}]}>

                            <FlatList
                                data={this.state.events}
                                renderItem={({item}) => this.renderItems(item)}
                                numColumns={1}
                                keyExtractor={this._keyExtractor}
                                extraData={this.state.refreshed}
                            />

                        </View>
                    </ImageBackground>
                </Content>
                <FooterSection routeName={'saves'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

export default Saves;