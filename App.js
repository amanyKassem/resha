import React from 'react';
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import {AppLoading} from 'expo';
import { Asset } from 'expo-asset';
import AppNavigator from './src/routes';
import {Root} from "native-base";
import {Platform} from "react-native";
import './ReactotronConfig';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistedStore} from './src/store';
import { Notifications } from 'expo';
import imagesArr from './src/consts/images'


  // Keystore password: a8a03061b1604aa281cd86143371afb1
  // Key alias:         QG1fc2hhbXMvUmVlc2g=
  // Key password:      890d090cbbba4bdab88d00ce353e6f04

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isReady: false,
        };

        // I18nManager.forceRTL(true)
        // AsyncStorage.clear();

    }

    handleNotification = (notification) => {
        if (notification && notification.origin !== 'received') {
            this.props.navigation.navigate('notifications');
        }
    }

    componentDidMount() {
		console.disableYellowBox = true;

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('orders', {
                name: 'Chat messages',
                sound: true,
            });
        }

        Notifications.addListener(this.handleNotification);
        this.loadAssetsAsync()
    }


    loadAssetsAsync = async () => {
        await Font.loadAsync({
            cairo: require('./assets/fonts/Cairo-Regular.ttf'),
            cairoBold: require('./assets/fonts/Cairo-Bold.ttf'),
            openSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
            openSans: require('./assets/fonts/OpenSans-Regular.ttf'),
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });

        await Asset.loadAsync(imagesArr);
        this.setState({isReady: true});
    };

    render() {
        if (!this.state.isReady) {
            return <AppLoading/>;
        }

        return (
            <Provider store={store}>
                <PersistGate persistor={persistedStore}>
                    <Root>
                        <AppNavigator />
                    </Root>
                </PersistGate>
            </Provider>
        );
    }
}

