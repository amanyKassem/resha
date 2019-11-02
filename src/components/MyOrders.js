import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    FlatList,
    ImageBackground,
    ScrollView,
    StyleSheet
} from "react-native";
import {Container, Content,  Header, Button, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'

const height = Dimensions.get('window').height;

const orders =[
    {id:1 , name:'أمسيات رمضان', image:require('../../assets/images/event_image_tean.jpg') , date:'15 مايو'},
    {id:2 , name:'مؤتمرات عالمية',  image:require('../../assets/images/events_pic_image.jpg')  , date:'15 مايو'},
    {id:3 , name:'حفلات موسيقية',  image:require('../../assets/images/image_eleven.jpg')  , date:'15 مايو'},
]


class MyOrders extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            activeType:0,
            tabActiveType:0,
            orders,

        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('myOrders'),
        drawerIcon: (<Image source={require('../../assets/images/organizer.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })




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

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('orderDetails')} style={[styles.eventTouch ]}>
                <Image source={item.image} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                <View style={[styles.eventCont ]}>
                    <Text style={[styles.whiteText , styles.BoldText]}>{item.name}</Text>
                    <View style={styles.dateEvent}>
                        <Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:12 , lineHeight:18}]}>{item.date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
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
                        <TouchableOpacity  onPress={() => this.props.navigation.openDrawer()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.headerText , {right:-20}]}>{ i18n.t('myOrders') }</Text>
                        <View style={styles.directionRowAlignCenter}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('qrScan')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/black_qr.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/bell_active.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>


                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={styles.mainScroll}>
                            <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                <TouchableOpacity onPress={ () => this.setState({tabActiveType:0})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.tabActiveType === 0 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('newOrders') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.tabActiveType === 0 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.setState({tabActiveType:1})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.tabActiveType === 1 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('accepted') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.tabActiveType === 1 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.setState({tabActiveType:2})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.tabActiveType === 2 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('executed') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.tabActiveType === 2 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={ () => this.setState({tabActiveType:3})} style={styles.scrollView}>
                                    <Text style={[styles.scrollText,{color:this.state.tabActiveType === 3 ? COLORS.rose : COLORS.gray}]}>{ i18n.t('refused') }</Text>
                                    <View style={[styles.activeLine , {backgroundColor:this.state.tabActiveType === 3 ? COLORS.rose : 'transparent'}]} />
                                </TouchableOpacity>
                            </ScrollView>
                        </View>


                        <View style={[styles.homeSection  , {paddingHorizontal:0 , marginTop:20}]}>

                            <View style={styles.reservationScroll}>
                                <ScrollView style={{}} horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <TouchableOpacity onPress={ () => this.setState({activeType:0})} style={[styles.reservationScrollView ,  {backgroundColor:this.state.activeType === 0 ?'#6b4d6b' : 'transparent'}]}>
                                        <Text style={[styles.reservationScrollText]}>15</Text>
                                        <Text style={[styles.reservationScrollText]}>مايو</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => this.setState({activeType:1})} style={[styles.reservationScrollView ,  {backgroundColor:this.state.activeType === 1 ?'#6b4d6b' : 'transparent'}]}>
                                        <Text style={[styles.reservationScrollText]}>16</Text>
                                        <Text style={[styles.reservationScrollText]}>مايو</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => this.setState({activeType:2})} style={[styles.reservationScrollView ,  {backgroundColor:this.state.activeType === 2 ?'#6b4d6b' : 'transparent'}]}>
                                        <Text style={[styles.reservationScrollText ]}>17</Text>
                                        <Text style={[styles.reservationScrollText ]}>مايو</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => this.setState({activeType:3})} style={[styles.reservationScrollView ,  {backgroundColor:this.state.activeType === 3 ?'#6b4d6b' : 'transparent'}]}>
                                        <Text style={[styles.reservationScrollText ]}>18</Text>
                                        <Text style={[styles.reservationScrollText ]}>مايو</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => this.setState({activeType:4})} style={[styles.reservationScrollView ,  {backgroundColor:this.state.activeType === 4 ?'#6b4d6b' : 'transparent'}]}>
                                        <Text style={[styles.reservationScrollText ]}>19</Text>
                                        <Text style={[styles.reservationScrollText ]}>مايو</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={ () => this.setState({activeType:5})} style={[styles.reservationScrollView ,   {backgroundColor:this.state.activeType === 5 ?'#6b4d6b' : 'transparent'}]}>
                                        <Text style={[styles.reservationScrollText ]}>20</Text>
                                        <Text style={[styles.reservationScrollText ]}>مايو</Text>
                                    </TouchableOpacity>
                                </ScrollView>
                            </View>




                            <View style={{paddingHorizontal:10}}>
                                <FlatList
                                    data={this.state.orders}
                                    renderItem={({item}) => this.renderItems(item)}
                                    numColumns={1}
                                    keyExtractor={this._keyExtractor}
                                />
                            </View>

                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }

}

export default MyOrders;