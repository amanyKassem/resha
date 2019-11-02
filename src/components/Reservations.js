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
    ScrollView
} from "react-native";
import {Container, Content,  Header, Button, Item, Input} from 'native-base'
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


class Reservations extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            activeType:0,
            events,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });

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
            <TouchableOpacity onPress={() => this.props.navigation.navigate('showTicketQr')} style={[styles.eventTouch ]}>
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
                        <Text style={[styles.headerText]}>{ i18n.t('reservations') }</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('notifications')}   style={styles.headerBtn}>
                            <Image source={require('../../assets/images/bell_active.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>


                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection  , {paddingHorizontal:0}]}>

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
                                   data={this.state.events}
                                   renderItem={({item}) => this.renderItems(item)}
                                   numColumns={1}
                                   keyExtractor={this._keyExtractor}
                               />
                           </View>

                        </View>
                    </ImageBackground>
                </Content>
                <FooterSection routeName={'reservations'} navigation={this.props.navigation}/>
            </Container>

        );
    }
}

export default Reservations;