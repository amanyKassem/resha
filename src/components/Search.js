import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;

class Search extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            search:'',
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
    submitSearch(){
        this.props.navigation.navigate('searchResult', { search : this.state.search } );
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
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('search') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20} ]}>
                            <View style={styles.inputView}>
                                <Item  style={styles.inputItem} bordered>
                                    <Input autoCapitalize='none' onSubmitEditing={() => this.submitSearch() } onChangeText={(search) => this.setState({ search })} placeholder={ i18n.t('search') } placeholderTextColor={'#acabae'} style={styles.modalInput}   />
                                </Item>
                                <TouchableOpacity style={[styles.searchToch]} onPress={() => this.submitSearch()}>
                                    <Image source={require('../../assets/images/search_floting.png')} style={[styles.searchImg , styles.transform]} resizeMode={'contain'}/>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity style={[styles.directionRowAlignCenter, styles.mb15]}>
                                <Image source={require('../../assets/images/image_one_search.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                <Text style={[styles.grayText , styles.normalText , {fontSize:15} ]}>الايفينتات المقترحة</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.directionRowAlignCenter, styles.mb15]}>
                                <Image source={require('../../assets/images/image_two_search.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                <Text style={[styles.grayText , styles.normalText , {fontSize:15} ]}>الايفينتات الشائعة</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.directionRowAlignCenter, styles.mb15]}>
                                <Image source={require('../../assets/images/image_three_search.png')} style={[styles.overImg , {marginRight:10}]} resizeMode={'contain'} />
                                <Text style={[styles.grayText , styles.normalText , {fontSize:15} ]}>الايفينتات المفضلة</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={() => this.props.navigation.navigate('reservations')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default Search;