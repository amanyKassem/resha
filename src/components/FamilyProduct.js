import React, { Component } from 'react';
import {Text, Image, View, TouchableOpacity, Animated} from 'react-native';
import {Right, Left, ListItem, CheckBox, Icon} from 'native-base';
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import Swiper from 'react-native-swiper';
import StarRating from 'react-native-star-rating';
import {connect} from "react-redux";
import {SetFavouriteEvent, getRateProduct} from "../actions";
import {NavigationEvents} from "react-navigation";
import ProgressImg from 'react-native-image-progress';


class FamilyProduct extends Component{
    constructor(props){
        super(props);
        this.state={
            backgroundColor: new Animated.Value(0),
            availabel: 0,
            starsCount:this.props.data.rates,
            savedEvent: this.props.data.is_save ,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loader: 0 , savedEvent: this.props.data.is_save ,
            starsCount:this.props.data.rates});

        if (nextProps.ratekey == 1  && (nextProps.rateProduct.product_id === this.props.data.product_id)){
            this.setState({starsCount : nextProps.rateProduct.product_rates })
        }
    }

    onStarRatingPress(rating) {

        this.props.getRateProduct( this.props.lang , this.props.data.product_id , rating , this.props.user.token)
        this.setState({
            starsCount: rating
        });
    }
    savedEvent() {
        this.setState({savedEvent: !this.state.savedEvent})
        this.props.SetFavouriteEvent( this.props.lang , this.props.data.product_id , this.props.user.token)
    }

    renderImage() {
        let source = '';
        if (this.state.savedEvent) {
            source = require('../../assets/images/bookmark_bink.png')
        } else {
            source = require('../../assets/images/heart_gray.png')
        }
        return source;
    }

    render(){
        return(
            <TouchableOpacity style={{marginBottom:7 , width:'100%'}} onPress={() => this.props.navigation.navigate('productDetails', {product_id:this.props.data.product_id , backRoute:'familyDetails'})}>
                <Swiper key={this.props.data.images.length} dotStyle={[styles.eventdoteStyle , {backgroundColor:'#ccc' , bottom:-50}]}
                        activeDotStyle={[styles.eventactiveDot,{bottom:-50}]}
                        containerStyle={[styles.eventswiper2]} showsButtons={false} autoplay={true}>
                    {
                        this.props.data.images.map((img, i) =>{
                            return (
                                <ProgressImg key={i} source={{ uri: img.image  }} style={styles.swiperImg} resizeMode={'cover'}/>
                            )
                        })
                    }
                </Swiper>
                <View style={[styles.directionRowSpace, styles.mb10]}>
                    <Text style={[styles.boldGrayText , styles.normalText]}>{this.props.data.name}</Text>
                    <TouchableOpacity onPress={() =>  this.props.user ? this.savedEvent() : this.props.navigation.navigate('login')} style={styles.headerBtn}>
                        <Image source={this.renderImage()} style={[styles.headerMenu]} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.directionRowSpace , styles.mb10]}>
                    <View style={[styles.directionRowAlignCenter , {marginRight:10} ]}>
                        <Image source={require('../../assets/images/star_border_blue.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                        <Text style={[styles.blueText , styles.normalText]}>{this.props.data.rates}/5</Text>
                    </View>
                    {
                        this.props.user ?
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                rating={this.props.data.rates}
                                fullStarColor={'#f0aa0b'}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                starSize={18}
                                starStyle={styles.starStyle}
                            />
                            :
                            null
                    }

                </View>
                <View style={[styles.directionRowAlignCenter]}>
                    <Image source={require('../../assets/images/ticket.png')} style={[styles.notiImg]} resizeMode={'contain'} />
                    <Text style={[styles.blueText , styles.normalText]}>{this.props.data.price} { i18n.t('RS') }</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = ({ lang ,rateProduct , profile }) => {
    return {
        lang: lang.lang,
        rateProduct: rateProduct.rateProduct,
        user: profile.user,
        ratekey: rateProduct.key
    };
};
export default connect(mapStateToProps, {SetFavouriteEvent , getRateProduct})(FamilyProduct);