import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated, FlatList, ImageBackground, Platform } from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, CheckBox, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getRules} from "../actions";
import * as Animatable from 'react-native-animatable';


const height = Dimensions.get('window').height;

const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class Terms extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            checkTerms:false,
        }
    }

    static navigationOptions = () => ({
        drawerLabel: i18n.t('terms') ,
        drawerIcon: (<Image source={require('../../assets/images/balance_menu.png')} style={styles.drawerImg} resizeMode={'contain'} /> )
    })


    componentWillMount() {
        this.props.getRules( this.props.lang )
    }

    renderLoader(){
        if (this.props.loader == 0){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <Animatable.View animation="zoomIn" easing="ease-out" iterationCount="infinite">
                        <Image source={require('../../assets/images/icon.png')} style={[styles.logoImg]} resizeMode={'contain'} />
                    </Animatable.View>
                </View>
            );
        }
    }

    // _keyExtractor = (item, index) => item.id;
    //
    // renderItems = (item) => {
    //     return(
    //         <View style={styles.faqBlock}>
    //             <Text style={[styles.headerText , styles.asfs , styles.writing , {color:'#272727'}]}>{item.rules}</Text>
    //             {/*<Text style={[styles.grayText , styles.asfs , styles.writing , styles.normalText]}>{item.answer}</Text>*/}
    //         </View>
    //     );
    // }


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
					{
						IS_IPHONE_X ?
							<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :0 , height:100 , width:'100%'}}/>
							:
							<View/>
					}
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <Right style={styles.flex0}>
                            <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                                <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </Right>
                        <Text style={[styles.headerText , {right:20}]}>{ i18n.t('terms') }</Text>
                        <Left style={styles.flex0}/>
                    </Animated.View>
                </Header>

                <Content   contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    { this.renderLoader() }
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>
                        <Image source={require('../../assets/images/rules_undraw.png')} style={[styles.faqImg]} resizeMode={'contain'} />
                        <View style={[styles.homeSection , styles.whiteHome , {paddingHorizontal:20 , paddingVertical:20 , marginTop:15}]}>
                            <ImageBackground source={require('../../assets/images/bg_feather.png')} resizeMode={'cover'} style={styles.imageBackground}>
                                {/*<FlatList*/}
                                    {/*data={this.props.rules}*/}
                                    {/*renderItem={({item}) => this.renderItems(item)}*/}
                                    {/*numColumns={1}*/}
                                    {/*keyExtractor={this._keyExtractor}*/}
                                {/*/>*/}

                                <View style={styles.faqBlock}>
                                    <Text style={[styles.headerText , styles.asfs , styles.writing , {color:'#272727'}]}>{this.props.rules}</Text>
                                    {/*<Text style={[styles.grayText , styles.asfs , styles.writing , styles.normalText]}>{item.answer}</Text>*/}
                                </View>

                                <View style={[styles.directionRowAlignCenter , styles.mb15 ]}>
                                    <CheckBox onPress={() => this.setState({checkTerms: !this.state.checkTerms})} checked={this.state.checkTerms} color={'#2f9694'} style={styles.checkBox} />
                                    <Text style={[styles.headerText , {color:'#272727'}]}>{ i18n.t('acceptTerms') }</Text>
                                </View>

                            </ImageBackground>
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}


const mapStateToProps = ({ lang , rules }) => {
    return {
        lang: lang.lang,
        rules: rules.rules,
        loader: rules.key
    };
};
export default connect(mapStateToProps, {getRules})(Terms);
