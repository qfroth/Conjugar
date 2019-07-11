import React, { Component } from 'react';
import { Image, Button, View, Alert, StyleSheet, Text, Dimensions } from 'react-native';
import logo from '../assets/Conjugar_Logo.png';
export default class Landing extends Component {
    static navigationOptions = {
        title: 'Conjugar'
    }
    render() {
        const {navigate} = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image style={styles.logo} source={logo}></Image>
                <Text style={[styles.button]} onPress={() => navigate('Practice')}>Practice</Text>
                <View style={styles.bottom}>
                    <Text style={[styles.button]} onPress={() => navigate('Add')}>Add</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BFB3E0',
    },
    logo: {
        alignSelf: 'center',
        width: Dimensions.get('window').width - 20,
        marginTop: 40,
        resizeMode: 'contain'
    },
    button: {
        borderRadius: 4,
        backgroundColor: '#41545B',
        color: 'white',
        margin: 10,
        padding: 10,
        fontSize: 22,
        textAlign: 'center',
    },
    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10
    }
});