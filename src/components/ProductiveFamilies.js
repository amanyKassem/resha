import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , FlatList, ImageBackground, Platform, SafeAreaView} from "react-native";
import {Container, Content, Header} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import {connect} from "react-redux";
import {getFamiliesCategories} from "../actions";
import * as Animatable from 'react-native-animatable';
import ProgressImg from 'react-native-image-progress';


const height = Dimensions.get('window').height;
const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class ProductiveFamilies extends Component {
    constructor(props){
        super(props);

        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            loader: 1
        }
    }

    static navigationOptions = () => ({
        drawerLabel: () => null
    });


    componentWillMount() {
        this.setState({ loader: 1});
        this.props.getFamiliesCategories( this.props.lang )
    }

    renderLoader(){
        if (this.state.loader == 1){
            return(
                <View style={{ alignItems: 'center', justifyContent: 'center', height: height , alignSelf:'center' , backgroundColor:'#fff' , width:'100%' , position:'absolute' , zIndex:1  }}>
                    <Animatable.View animation="zoomIn" easing="ease-out" iterationCount="infinite">
                        <Image source={require('../../assets/images/icon.png')} style={[styles.logoImg]} resizeMode={'contain'} />
                    </Animatable.View>
                </View>
            );
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('damn loader', nextProps.key)
        this.setState({ loader: nextProps.key });
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <Animatable.View animation="fadeInUp" easing="ease-out" delay={600} >
                <TouchableOpacity onPress={() => this.props.navigation.navigate('families' , { category_id: item.id, backRoute:'productiveFamilies' , catType:this.props.navigation.state.params.catType})} style={[styles.eventTouch ]}>
                    <ProgressImg source={{ uri: item.icon  }} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                    <View style={[styles.familiesCont ]}>
                       <View style={styles.directionColumn}>
                           <Text style={[styles.whiteText , styles.BoldText , styles.asfs , styles.writing , {fontSize:16}]}>{item.name}</Text>
                           <View style={styles.whiteLine}/>
                       </View>
                        {/*<View style={styles.familiesEvent}>*/}
                            {/*<Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:12 , lineHeight:18}]}>{ i18n.t('familiesNumber') } : {item.families_count}</Text>*/}
                        {/*</View>*/}
                    </View>
                </TouchableOpacity>
            </Animatable.View>
        );
    }

    renderNoData(){
        if (this.props.categories && (this.props.categories).length <= 0){
            return(
                <Image source={require('../../assets/images/no_data.png')} resizeMode={'contain'} style={{ marginTop: 20, alignSelf: 'center', width: 200, height: 200 }} />
            );
        }

        return <View />
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

                { this.renderLoader() }

                <Header style={[styles.header]} noShadow>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={{zIndex: -1,position:'absolute' , top :-50 , height:350 , width:'100%'}}/>
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>


                <Content bounces={false} scrollEnabled={false} contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={[styles.imageBackground2, { height: height-110 }]}>

                        <View style={[styles.directionRowSpace , styles.w100  , styles.mt25, {paddingHorizontal:20 , paddingVertical:15}]}>
                            <View style={[styles.directionColumn , {flex: 1}]}>
                                <Text style={[styles.whiteText, styles.normalText , styles.asfs , styles.writing ]}>{ i18n.t('productiveFamilies') }</Text>
                                {/*<Text style={[styles.whiteText, styles.normalText , styles.asfs , styles.writing , {fontSize:14}]}>{ i18n.t('familiesNumber') } : {this.props.count}</Text>*/}
                                <Text style={[styles.whiteText, styles.normalText , styles.asfs , styles.writing , {fontSize:13} ]}>{this.props.desc}</Text>
                            </View>
                            <Animatable.View animation="fadeInLeft" easing="ease-out" delay={600}>
                                <Image source={require('../../assets/images/undraw_department.png')} style={{ width:135, height:135}} resizeMode={'contain'} />
                            </Animatable.View>
                        </View>

                        <View style={[styles.homeSection , styles.whiteHome , {padding:15 ,  marginTop:15, }]}>
                            { this.renderNoData() }
                            <FlatList
                                data={this.props.categories}
                                renderItem={({item}) => this.renderItems(item)}
                                numColumns={1}
                                keyExtractor={this._keyExtractor}
                                style={{ height: 200 }}
                            />
                        </View>
                    </ImageBackground>
                </Content>
            </Container>

        );
    }
}

const mapStateToProps = ({ lang , familiesCategories }) => {
    return {
        lang: lang.lang,
        categories: familiesCategories.categories,
        desc: familiesCategories.desc,
        count: familiesCategories.count,
        key: familiesCategories.key
    };
};
export default connect(mapStateToProps, {getFamiliesCategories})(ProductiveFamilies);
