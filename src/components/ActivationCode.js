import React, { Component } from "react";
import {View, Text, Image, TouchableOpacity, Dimensions,  ImageBackground , KeyboardAvoidingView} from "react-native";
import {Container, Content, Form, Icon, Input, Item, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from '../../locale/i18n'
import COLORS from '../../src/consts/colors'


const height = Dimensions.get('window').height;

class ActivationCode extends Component {
    constructor(props){
        super(props);

        this.state={
            code: '',
        }
    }


    render() {


        return (
            <Container>
                <Content contentContainerStyle={styles.flexGrow} >
                    <TouchableOpacity style={styles.authBack} onPress={() => this.props.navigation.goBack()}>
                        <Image source={require('../../assets/images/back_white.png')} resizeMode={'contain'}  style={[styles.authImg , styles.transform]}/>
                    </TouchableOpacity>
                    <ImageBackground source={require('../../assets/images/bg_app.png')} resizeMode={'cover'} style={styles.imageBackground}>

                        <View style={[styles.langView ]}>

                            <Image source={require('../../assets/images/logo.png')} resizeMode={'contain'} style={[styles.logo , styles.mb10]}/>

                            <KeyboardAvoidingView behavior={'padding'} style={styles.keyboardAvoid}>
                                <Form style={{}}>
                                    <View style={styles.inputParent}>
                                        <Item stackedLabel style={styles.item } bordered>
                                            <Label style={styles.labelItem}>
                                                { i18n.t('activationCode') }
                                            </Label>
                                            <Image source={require('../../assets/images/Feather_blue.png')} resizeMode={'contain'} style={styles.labelImg}/>
                                            <Input value={this.state.code} onChangeText={(code) => this.setState({code})} keyboardType={'number-pad'} style={styles.itemInput}  />
                                        </Item>
                                    </View>

                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('login')} style={[styles.blueBtn, styles.mt50]}>
                                        <Text style={[styles.whiteText , styles.normalText ]}>{ i18n.t('sendButton') }</Text>
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

export default ActivationCode;