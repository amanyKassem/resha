import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Share, ImageBackground, Dimensions, Platform} from "react-native";
import {Container, Content, Icon} from 'native-base';
import {DrawerItems} from 'react-navigation';
import styles from "../../assets/styles";
import {connect} from "react-redux";
import { logout, tempAuth } from '../actions'
import i18n from "../../locale/i18n";


const height = Dimensions.get('window').height;
class DrawerCustomization extends Component {
    constructor(props){
        super(props);
        this.state={
            user: [],
        }
    }


    onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    Platform.OS === 'ios'? 'https://apps.apple.com/us/app/reesh-ريش/id1490248883?ls=1' : 'https://play.google.com/store/apps/details?id=com.app.reesh',
            })

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    logout(){
        this.props.logout({ token: this.props.user.token })
        this.props.tempAuth();
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('login');
    }

    filterItems(item){
        if (this.props.user == null)
            return item.routeName !== 'logout' && item.routeName !== 'myEvents' && item.routeName !== 'addEvent'
            && item.routeName !== 'myResturant' && item.routeName !== 'myCar' && item.routeName !== 'myFamily' && item.routeName !== 'myOrders' && item.routeName !== 'complaints';
        else if(this.props.user.type == 0 )
            return  item.routeName !== 'signIn' && item.routeName !== 'myEvents' && item.routeName !== 'addEvent' && item.routeName !== 'myResturant' && item.routeName !== 'myCar' && item.routeName !== 'myFamily' && item.routeName !== 'myOrders' ;
        else if(this.props.user.type == 1 )
            return  item.routeName !== 'signIn' && item.routeName !== 'myResturant' && item.routeName !== 'myCar' && item.routeName !== 'myFamily' && item.routeName !== 'myOrders' ;
        else if(this.props.user.type == 2 )
            return  item.routeName !== 'signIn' && item.routeName !== 'myResturant' && item.routeName !== 'myCar' && item.routeName !== 'myFamily' && item.routeName !== 'myEvents' && item.routeName !== 'addEvent' ;
        else if(this.props.user.type == 3 )
            return  item.routeName !== 'signIn' && item.routeName !== 'myCar' && item.routeName !== 'myFamily' && item.routeName !== 'myEvents' && item.routeName !== 'addEvent'  && item.routeName !== 'myOrders' ;
        else if(this.props.user.type == 4 )
            return  item.routeName !== 'signIn' && item.routeName !== 'myEvents' && item.routeName !== 'addEvent' && item.routeName !== 'myResturant' && item.routeName !== 'myCar' && item.routeName !== 'myOrders' ;
        else if(this.props.user.type == 5 )
            return  item.routeName !== 'signIn' && item.routeName !== 'myEvents' && item.routeName !== 'addEvent' && item.routeName !== 'myResturant' && item.routeName !== 'myFamily' && item.routeName !== 'myOrders' ;
    }

    returnItems(){
        return this.props.items.filter((item) =>  this.filterItems(item) )
    }

    render() {

        let { user } = this.props;
        console.log('ban user', user);
        if (user === null || user === undefined)
            user = {
                avatar:  'https://www.timeshighereducation.com/sites/default/files/default_images/default-avatar_1.png',
                name: i18n.t('guest')
            }

        return (
            <Container>
				<ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={[styles.imageBackground , {minHeight:height}]}>
                    <Content  >
                            <TouchableOpacity style={styles.authBack} onPress={() => this.props.navigation.closeDrawer()}>
                                <Image source={require('../../assets/images/cancel_white.png')} resizeMode={'contain'}  style={[styles.authImg]}/>
                            </TouchableOpacity>
                             <View style={styles.sideImgView}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('profile')} style={styles.cutCircle}>
                                    <View style={styles.sideProfileImg}>
                                        <Image  source={{ uri: user.avatar }} resizeMode={'cover'} style={styles.drawImg}/>
                                    </View>
                                </TouchableOpacity>
                                <Text style={styles.sideName}>{ user.name }</Text>
                             </View>


                            <DrawerItems {...this.props}
                                         onItemPress={
                                             (route, focused) => {
                                                 if (route.route.key === 'logout') {
                                                     this.logout()
                                                 } else if (route.route.key === 'signIn') {
                                                     this.props.navigation.navigate('login');
                                                 }else {
                                                     route.route.key === 'shareApp' ? this.onShare(): this.props.navigation.navigate(route.route.key)
                                                 }
                                             }
                                         }

                                         items={this.returnItems()}
                                         activeBackgroundColor='transparent' inactiveBackgroundColor='transparent' activeLabelStyle={{color:'#5d5d5d'}}
                                         labelStyle={styles.drawerLabel} iconContainerStyle ={styles.drawerIcon}
                                         itemStyle  = {styles.drawerItemStyle} itemsContainerStyle ={styles.drawerContainer}
                            />
                    </Content>
				</ImageBackground>

            </Container>
        );
    }
}

const mapStateToProps = ({ profile }) => {
    return {
        user: profile.user
    };
};

export default connect(mapStateToProps, { logout, tempAuth })(DrawerCustomization);
