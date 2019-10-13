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
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Textarea, Left, Form, Label, Picker} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;

class AddEventDesc extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            arabicDesc: '',
            englishDesc: '',
            category: null,
            organization: null,

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
                        <Text style={[styles.headerText , {right:20}]}>اضافة فاعلية</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <View style={[styles.homeSection , styles.whiteHome ]}>
                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={{padding:20}}>

                                    <View style={[styles.inputParent , {height:133}]}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {borderBottomColor:'#fff'}]}>
                                               وصف عربي
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Textarea autoCapitalize='none' value={this.state.arabicDesc} onChangeText={(arabicDesc) => this.setState({arabicDesc})} style={[styles.textarea]}  />
                                        </Item>
                                    </View>
                                    <View style={[styles.inputParent , {height:133}]}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={[styles.labelItem , {borderBottomColor:'#fff'}]}>
                                               وصف انجليزي
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Textarea autoCapitalize='none' value={this.state.englishDesc} onChangeText={(englishDesc) => this.setState({englishDesc})} style={[styles.textarea]}  />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item style={styles.itemPicker} regular >
                                            <Label style={[styles.labelItem , {top:-18.5 , paddingRight:20 , borderBottomColor:'#fff'}]}>القسم</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , {top:-19}]}/>
                                            <Picker
                                                mode="dropdown"
                                                style={[styles.picker , { color: COLORS.gray , backgroundColor:'#f5f5f5',}]}
                                                placeholderStyle={{ color: COLORS.gray}}
                                                placeholderIconColor={{color: COLORS.gray}}
                                                selectedValue={this.state.category}
                                                onValueChange={(value) => this.setState({ category: value })}
                                            >
                                                <Picker.Item label={'قسم ١'} value={1} />
                                                <Picker.Item label={'قسم ٢'}  value={2} />
                                                <Picker.Item label={'قسم ٣'} value={3} />
                                            </Picker>
                                            <Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                        </Item>
                                    </View>

                                    <View style={styles.inputParent}>
                                        <Item style={styles.itemPicker} regular >
                                            <Label style={[styles.labelItem , {top:-18.5 , paddingRight:20 , borderBottomColor:'#fff'}]}>الهيئة</Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={[styles.labelImg , {top:-19}]}/>
                                            <Picker
                                                mode="dropdown"
                                                style={[styles.picker , { color: COLORS.gray , backgroundColor:'#f5f5f5',}]}
                                                placeholderStyle={{ color: COLORS.gray}}
                                                placeholderIconColor={{color: COLORS.gray}}
                                                selectedValue={this.state.organization}
                                                onValueChange={(value) => this.setState({ organization: value })}
                                            >
                                                <Picker.Item label={'الهيئة ١'} value={1} />
                                                <Picker.Item label={'الهيئة ٢'}  value={2} />
                                                <Picker.Item label={'الهيئة ٣'} value={3} />
                                            </Picker>
                                            <Image source={require('../../assets/images/down_arrow.png')} style={styles.pickerImg} resizeMode={'contain'} />
                                        </Item>
                                    </View>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('addEventPrice')} style={[styles.blueBtn, styles.mt50 , styles.mb15]}>
                                        <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('next') }</Text>
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

export default AddEventDesc;