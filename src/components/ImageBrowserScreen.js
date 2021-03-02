import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import {ImageBrowser} from 'expo-image-picker-multiple';
export default class ImageBrowserScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            photos: [],
        }
    }
    static navigationOptions = ({ navigation }) => {
        const headerTitle = navigation.getParam('headerTitle');
        const right = navigation.getParam('headerRight');
        const loading = navigation.getParam('loading');
        const headerLeft = () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text>
                    Back
                </Text>
            </TouchableOpacity>
        );
        const headerRight = () => (
            <TouchableOpacity title={'Done'} onPress={right}>
                <Text>
                    Done
                </Text>
            </TouchableOpacity>
        );
        const headerLoader = (
            <View style={styles.headerLoader}>
                <ActivityIndicator size="small" color={'#0580FF'}/>
            </View>
        );
        // if (loading) return { headerTitle, headerLeft, headerRight: headerLoader };
        // return { headerTitle,
        //     headerLeft: () =>
        //         <TouchableOpacity onPress={() => navigation.goBack()}>
        //             <Text>
        //                 Back
        //             </Text>
        //         </TouchableOpacity>
        //     ,
        //     headerRight: () =>
        //         <TouchableOpacity title={'Done'} onPress={right}>
        //             <Text>
        //                 Done
        //             </Text>
        //         </TouchableOpacity>
        //
        // };
    };
    imagesCallback = (callback) => {
        const { navigation } = this.props;
        navigation.setParams({ loading: true });
        callback.then(async (photos) => {
            const cPhotos = [];
            for(let photo of photos) {
                const pPhoto = await this._processImageAsync(photo.uri);
                cPhotos.push({
                    uri: pPhoto.uri,
                    name: photo.filename,
                    type: 'image/jpg'
                })
            }
            this.setState({ photos: cPhotos })
        })
            .catch((e) => console.log(e))
            .finally(() => navigation.setParams({ loading: false }));
    };
    navigateWithPhotos(){
        const { routeName, ar_name, en_name, date, time, event_hours, address, latitude, longitude, ar_description, en_description, organization_id, category_id, tickets, eventImg } = this.props.navigation.state.params;
        return this.props.navigation.navigate(routeName, {photos: this.state.photos, ar_name, en_name, date, time, event_hours, address, latitude, longitude, ar_description, en_description, organization_id, category_id, tickets, eventImg});
    }
    async _processImageAsync(uri) {
        const file = await ImageManipulator.manipulateAsync(
            uri,
            [{resize: { width: 1000 }}],
            { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
        );
        return file;
    }
    updateHandler = (count, onSubmit) => {
        this.props.navigation.setParams({
            headerTitle: `Selected ${count} files`,
            headerRight: onSubmit,
        });
    };
    renderSelectedComponent = (number) => (
        <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{number}</Text>
        </View>
    );

    render() {
        const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;
        return (
            <View style={[styles.flex, styles.container]}>
                <View style={{ backgroundColor: '#000', width: '100%', height: 80, top: 0, flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' }}>
                    <TouchableOpacity title={'Done'} onPress={() => this.navigateWithPhotos()} style={{ margin: 10 }}>
                        <Text style={{ color: '#fff' }}>Done</Text>
                    </TouchableOpacity>
                </View>
                <ImageBrowser
                    max={4}
                    onChange={this.updateHandler}
                    callback={this.imagesCallback}
                    renderSelectedComponent={this.renderSelectedComponent}
                    emptyStayComponent={emptyStayComponent}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    flex: {
        flex: 1
    },
    container: {
        position: 'relative'
    },
    emptyStay:{
        textAlign: 'center',
    },
    countBadge: {
        paddingHorizontal: 8.6,
        paddingVertical: 5,
        borderRadius: 50,
        position: 'absolute',
        right: 3,
        bottom: 3,
        justifyContent: 'center',
        backgroundColor: '#0580FF'
    },
    countBadgeText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 'auto',
        color: '#ffffff'
    }
});
