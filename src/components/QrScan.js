import React, { Component } from "react";
import {Text, View, StyleSheet, Button, Dimensions, Platform,} from 'react-native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { BarCodeScanner } from 'expo-barcode-scanner';

const height = Dimensions.get('window').height;


const IS_IPHONE_X 	= (height === 812 || height === 896) && Platform.OS === 'ios';

class QrScan extends Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />

            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.props.navigation.navigate('qrConfirmTicket',{id:data})
    };
}

export default QrScan;
