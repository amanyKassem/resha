import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , ScrollView, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;
const events =[
    {id:1 , name:'أمسيات رمضان', price:'144 ريال', image:require('../../assets/images/event_image_tean.jpg') , time:'3:30 AM' , date:'9/7/2020'},
    {id:2 , name:'أمسيات رمضان', price:'144 ريال', image:require('../../assets/images/events_pic_image.jpg') , time:'3:30 AM' , date:'9/7/2020'},
    {id:3 , name:'أمسيات رمضان', price:'144 ريال', image:require('../../assets/images/image_eleven.jpg') , time:'3:30 AM' , date:'9/7/2020'},
]

class MyEvents extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            events,
            activeType:0,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('myEvents') ,
        drawerIcon: (<Image source={require('../../assets/images/checklist_menu.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })


    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={ () => this.props.navigation.navigate('showTicket')} style={[styles.notiBlock , styles.directionRow]}>
                <Image source={item.image} resizeMode={'cover'} style={styles.eventImg}/>
                <View style={[styles.directionColumn , {flex:1}]}>
                    <Text style={[styles.headerText , styles.asfs , styles.writing , {color:'#272727' , lineHeight:23}]}>{item.name}</Text>
                    <View style={[styles.directionRowAlignCenter  ]}>
                        <Image source={require('../../assets/images/clock_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                        <Text style={[styles.blueText , styles.normalText]}>{item.time}</Text>
                    </View>
                    <View style={[styles.directionRowAlignCenter ]}>
                        <Image source={require('../../assets/images/calendar_icon_small.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                        <Text style={[styles.blueText , styles.normalText]}>{item.date}</Text>
                    </View>
                    <View style={[styles.eventBtn]}>
                        <Text style={[styles.whiteText , styles.normalText]}>{item.price}</Text>
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
                        <Text style={[styles.headerText , {right:20}]}>فاعلياتي</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>


                        <View style={styles.mainScroll}>
                            <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity onPress={ () => this.setState({activeType:0})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 0 ? COLORS.rose : COLORS.gray}]}>{i18n.t('underConfirmation')}</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 0 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.setState({activeType:1})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 1 ? COLORS.rose : COLORS.gray}]}>{i18n.t('approved')}</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 1 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.setState({activeType:2})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 2 ? COLORS.rose : COLORS.gray}]}>{i18n.t('executed')}</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 2 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.setState({activeType:3})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.activeType === 3 ? COLORS.rose : COLORS.gray}]}>{i18n.t('cancelled')}</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.activeType === 3 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>

                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:0 ,  marginTop:15}]}>

                            <FlatList
                                data={this.state.events}
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

export default MyEvents;