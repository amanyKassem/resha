import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Share, ImageBackground, Dimensions} from "react-native";
import {Container, Content, Icon} from 'native-base';
import {DrawerItems} from 'react-navigation';
import styles from "../../assets/styles";


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
                    'React Native | A framework for building native apps using React',
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
        this.props.navigation.closeDrawer();
        this.props.navigation.navigate('login');
    }



    render() {
        return (
            <Container>
                <Content  >
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={[styles.imageBackground , {minHeight:height}]}>
                        <TouchableOpacity style={styles.authBack} onPress={() => this.props.navigation.closeDrawer()}>
                            <Image source={require('../../assets/images/cancel_white.png')} resizeMode={'contain'}  style={[styles.authImg]}/>
                        </TouchableOpacity>
                         <View style={styles.sideImgView}>
                            <View style={styles.cutCircle}>
                                <View style={styles.sideProfileImg}>
                                    <Image source={require('../../assets/images/profile_pic.png')} resizeMode={'cover'} style={styles.drawImg}/>
                                </View>
                            </View>
                            <Text style={styles.sideName}>اماني قاسم</Text>
                         </View>


                        <DrawerItems {...this.props}
                                     onItemPress={
                                         (route, focused) => {
                                             if (route.route.key === 'logout') {
                                                 this.logout()
                                             }else {
                                                 route.route.key === 'shareApp' ? this.onShare(): this.props.navigation.navigate(route.route.key)
                                             }
                                         }
                                     }


                                     activeBackgroundColor='transparent' inactiveBackgroundColor='transparent' activeLabelStyle={{color:'#5d5d5d'}}
                                     labelStyle={styles.drawerLabel} iconContainerStyle ={styles.drawerIcon}
                                     itemStyle  = {styles.drawerItemStyle} itemsContainerStyle ={styles.drawerContainer}
                        />
                    </ImageBackground>
                </Content>

            </Container>
        );
    }
}


export default DrawerCustomization;