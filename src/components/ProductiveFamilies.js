import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Animated , ScrollView, FlatList, ImageBackground} from "react-native";
import {Container, Content, Header, Button, Item, Input, Right, Icon, Left, Form, Label, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'
import { DoubleBounce } from 'react-native-loader';
import {connect} from "react-redux";
import {getFamiliesCategories} from "../actions";


const height = Dimensions.get('window').height;
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
                    <DoubleBounce size={20} color={COLORS.mov} />
                </View>
            );
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ loader: nextProps.key });
    }

    _keyExtractor = (item, index) => item.id;

    renderItems = (item) => {
        return(
            <TouchableOpacity onPress={() => this.props.navigation.navigate('families' , { category_id: item.id, backRoute:'productiveFamilies' , catType:this.props.navigation.state.params.catType})} style={[styles.eventTouch ]}>
                <Image source={{ uri: item.icon }} resizeMode={'cover'} style={{width:'100%' , height:'100%' , borderRadius:15}}/>
                <View style={[styles.familiesCont ]}>
                   <View style={styles.directionColumn}>
                       <Text style={[styles.whiteText , styles.BoldText , styles.asfs , styles.writing , {fontSize:16}]}>{item.name}</Text>
                       <View style={styles.whiteLine}/>
                   </View>
                    <View style={styles.familiesEvent}>
                        <Text style={[ styles.whiteText , styles.BoldText , styles.tac ,{fontSize:12 , lineHeight:18}]}>{ i18n.t('familiesNumber') } : {item.families_count}</Text>
                    </View>
                </View>
            </TouchableOpacity>
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
                    <Animated.View style={[ styles.animatedHeader ,{ backgroundColor: backgroundColor}]}>
                        <TouchableOpacity  onPress={() => this.props.navigation.goBack()} style={styles.headerBtn}>
                            <Image source={require('../../assets/images/back_white.png')} style={[styles.headerMenu, styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </Animated.View>
                </Header>


                <Content  contentContainerStyle={styles.flexGrow} style={styles.homecontent}  onScroll={e => this.headerScrollingAnimation(e) }>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground2}>

                        <View style={[styles.directionRowSpace , styles.w100  , styles.mt70, {paddingHorizontal:20 , paddingVertical:15}]}>
                            <View style={[styles.directionColumn , {flex: 1}]}>
                                <Text style={[styles.whiteText, styles.normalText , styles.asfs , styles.writing ]}>{ i18n.t('productiveFamilies') }</Text>
                                <Text style={[styles.whiteText, styles.normalText , styles.asfs , styles.writing , {fontSize:14}]}>{ i18n.t('familiesNumber') } : {this.props.count}</Text>
                                <Text style={[styles.whiteText, styles.normalText , styles.asfs , styles.writing , {fontSize:13} ]}>{this.props.desc}</Text>
                            </View>
                            <Image source={require('../../assets/images/undraw_department.png')} style={{ width:135, height:135}} resizeMode={'contain'} />
                        </View>

                        <View style={[styles.homeSection , styles.whiteHome , {padding:15 ,  marginTop:15}]}>
                            {
                                this.renderNoData()
                            }
                            <FlatList
                                data={this.props.categories}
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