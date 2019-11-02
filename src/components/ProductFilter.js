import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    Animated,
    Slider,
    ImageBackground,
    KeyboardAvoidingView,
    Platform, I18nManager
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Label, Form, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;


class ProductFilter extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            category: null,
            value: null,
            max: 2500,
            step: 500,
            min: 0,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    change(value){
        this.setState({value})
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
                        <Text style={[styles.headerText]}>{ i18n.t('searchFilter') }</Text>
                        <TouchableOpacity style={styles.headerBtn}>
                            <Image source={require('../../assets/images/reload_white.png')} style={[styles.headerMenu]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>
                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={{padding:20}}>

                                    <View style={styles.inputParent}>
                                        <Item style={styles.itemPicker} regular >
                                            <Label style={[styles.labelItem , {top:I18nManager.isRTL ? -18.5 : -16.5 ,
                                                paddingLeft:I18nManager.isRTL ?Platform.OS === 'ios' ?20 : 10 : 20 ,
                                                paddingRight:I18nManager.isRTL ?Platform.OS === 'ios' ?10:20 : 10,
                                                backgroundColor :Platform.OS === 'ios' ?'#fff' : 'transparent' ,
                                                borderBottomColor:'#fff'}]}>{ i18n.t('category') }</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , styles.transform , {top:-19}]}/>
                                            <Picker
                                                mode="dropdown"
                                                style={[styles.picker , { color: COLORS.gray , backgroundColor: '#f5f5f5',}]}
                                                placeholderStyle={{ color: COLORS.gray}}
                                                placeholderIconColor={{color: COLORS.gray}}
                                                selectedValue={this.state.category}
                                                onValueChange={(value) => this.setState({ category: value })}
                                            >
                                                <Picker.Item label={'حلويات'} value={1} />
                                                <Picker.Item label={'مشروبات'}  value={2} />
                                            </Picker>
                                            <Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                        </Item>
                                    </View>

                                    <View style={[styles.directionRowAlignCenter , styles.mt15]}>
                                        <Image source={require('../../assets/images/feather_color.png')} style={[styles.resha , styles.transform]} resizeMode={'contain'} />
                                        <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('price') }</Text>
                                    </View>


                                    <View style={styles.sliderParent}>
                                        <Slider
                                            step={this.state.step}
                                            maximumValue={this.state.max}
                                            onValueChange={(value) => this.change(value)}
                                            // value={this.state.value}
                                            thumbTintColor={COLORS.rose}
                                            style={styles.slider}
                                            maximumTrackTintColor={"#000"}
                                            minimumTrackTintColor={COLORS.blue}
                                        />
                                        <View style={styles.range}>
                                            <Left><Text style={[styles.headerText , {color:'#272727'}]}>{this.state.min}</Text></Left>
                                            <Text style={[styles.headerText , {color:'#272727'}]}>{this.state.value}</Text>
                                            <Right><Text style={[styles.headerText , {color:'#272727'}]}>{this.state.max}</Text></Right>
                                        </View>
                                    </View>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('products')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                        <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('confirm') }</Text>
                                    </TouchableOpacity>

                                </Form>
                            </KeyboardAvoidingView>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

export default ProductFilter;