import React, { Component } from 'react';
import { View, ScrollView, Text, ActivityIndicator, StyleSheet, Dimensions, TouchableNativeFeedback, Alert } from 'react-native';
import { dataPersistence } from '../helpers/dataPersistence';
import { verb } from '../models/verb';

export default class Words extends Component {
    public navigationListener : any;
    constructor() {
        super();
        this.state = {
            verbs: [],
            fetching: false
        };
    }
 
    static navigationOptions = {
        title: 'Words'
    }
    componentDidMount() {
        this.navigationListener = this.props.navigation.addListener(
            'willFocus',
            (payload) => {
                this.loadData();
            });
    }

    componentWillUnmount(){
        this.navigationListener.remove();
    }
    
    loadData(){
        this.setState({ fetching: true });
        dataPersistence.getVerbs().then((verbs) => {
            this.setState({ verbs, fetching: false });
        });
    }
    render() {

        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" style={styles.spinner} animating={this.state.fetching}></ActivityIndicator>
                <ScrollView>
                    {this.state.verbs.map((item: verb, index: number) => <Text key={index} style={[styles.verb, { 'backgroundColor': rowColors[index % 2] }]}>{item.name} : {item.translation}</Text>)}
                </ScrollView>
                
                <View style={styles.bottom}>
                <TouchableNativeFeedback onPress={() => {this.props.navigation.navigate('Add')}} background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={[styles.btn, styles.btnAdd]}>
                        <Text style={styles.btnText}>Add</Text>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => {dataPersistence.clearData().then(() => {this.loadData(); Alert.alert('Data has been cleared.');})}} background={TouchableNativeFeedback.SelectableBackground()}>
                    <View style={[styles.btn, styles.btnClear]}>
                        <Text style={styles.btnText}>Clear</Text>
                    </View>
                </TouchableNativeFeedback>
                </View>
            </View>
        )
    }
}
const rowColors = ['#BFB3E0', '#d9d1eb'];
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BFB3E0',
    },
    spinner: {
        position: 'absolute',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    verb: {
        fontSize: 22,
        padding: 15,
    },
    btn: {
        width: Dimensions.get('window').width / 2.5,
        margin: 10,
        height: 60,
        borderRadius: 3
    },
    btnAdd: {
        backgroundColor: '#41545B',
    },
    btnClear: {
        backgroundColor: '#ad2424',
    },
    bottom: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    btnText:{
        color: 'white',
        fontSize: 22,
        padding: 15,
        textAlign: 'center',
    }
});