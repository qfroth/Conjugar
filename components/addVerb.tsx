import React, { Component } from 'react';
import { ScrollView, Text, TextInput, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import { times } from '../models/times';
import { pointOfViews } from '../models/pointOfViews';
import { verb } from '../models/verb';
import { conjugation } from '../models/conjugation';
import { dataPersistence } from '../helpers/dataPersistence';

export default class AddVerb extends Component {
    static navigationOptions = {
        title: 'Add Verb'
    }
    public newVerb: verb = new verb(new Date().getTime(), "", "", []);
    render() {
        const items = [];
        let i = 0;
        for (let pov in pointOfViews) {
            if (isNaN(Number(pov))) {
                items.push(<Text style={styles.header} key={i}>{pov.toString()}</Text>);
                i++;
                for (let time in times) {
                    if (isNaN(Number(time))) {
                        items.push(<TextInput style={styles.input} placeholder={time.toString()} key={i} onChangeText={(text) => this.UpdateModel(text, pov, time)}></TextInput>);
                        i++;
                    }
                }
            };
        };
        dataPersistence.getVerbs().then((data) => console.log(data));
        return (
            <KeyboardAvoidingView style={styles.topContainer} behavior="padding" enabled keyboardVerticalOffset={100}>
                <ScrollView style={styles.container}>
                    <TextInput style={styles.input} placeholder='Verb' onChangeText={(text) => this.newVerb.name = text}></TextInput>
                    <TextInput style={styles.input} placeholder='Translation' onChangeText={(text) => this.newVerb.translation = text}></TextInput>
                    {items}
                    <Text style={[styles.button]} onPress={() => this.SaveVerb()}>Add</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }

    UpdateModel(text: string, pov: string, time: string) {
        let p: pointOfViews = pointOfViews[pov];
        let t: times = times[time];
        let verb = this.newVerb.conjugations.find((item: conjugation) => item.pointOfView == p && item.time == t);
        if (verb === undefined) {
            this.newVerb.conjugations.push(new conjugation(p, t, text));
        } else {
            verb.conjugacion = text;
        }
    }

    SaveVerb() {
        //show loading 
        dataPersistence.addOrUpdateVerb(this.newVerb).then((result) => {
            if(!result.success){
                Alert.alert("", "This verb already exists, overwrite?",
                [{text: 'OK', onPress: () => {
                    this.newVerb.id = result.id;
                    dataPersistence.addOrUpdateVerb(this.newVerb).then((result) => {
                        if(result.success){
                            this.exitPage();
                        }
                    });
                }},
                {text: 'Cancel', onPress: () => console.log('Cancel clicked')}])
            }else{
                this.exitPage();
            }
        }) //stop loading
    }

    exitPage(){
        this.props.navigation.navigate('Home');
    }
}

const styles = StyleSheet.create({
    topContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#BFB3E0',
    },
    input: {
        fontSize: 22,
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 10,
        backgroundColor: 'white',
    },
    header: {

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
});