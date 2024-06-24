import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { dataPersistence } from '../helpers/dataPersistence';
import { verb } from '../models/verb';
import { randomizer } from '../helpers/randomizer';
import { pointOfViews } from '../models/pointOfViews';
import { times } from '../models/times';
import { conjugation } from '../models/conjugation';

export default class Practice extends Component {
    constructor() {
        super();
        this.state = {
            verb: null,
            verbList: [],
            answer: '',
            conjIndex: null
        };
    }
    static navigationOptions = {
        title: 'Practice'
    }

    componentDidMount() {
        dataPersistence.getVerbs().then(result => {
            let verbList = result.slice(0);
            this.setState({ verbList })
            this.getQuiz();
        })
    }

    getQuiz() {
        const verbList = this.state.verbList;
        if (verbList.length < 1) {
            Alert.alert('You have completed all the words!');
            this.props.navigation.goBack();
            return;
        }
        const index = randomizer.random(0, verbList.length - 1);
        //get one verb at the index and remove it from the array
        const verb: verb = JSON.parse(JSON.stringify(verbList.splice(index, 1)[0]));
        const end = verb.conjugations.length - 1;
        if (end < 0) {
            this.getQuiz();
            return;
        }
        let conjIndex = randomizer.random(0, end);
        this.setState({ verb: verb, conjIndex })
    }

    checkAnswer() {
        const verb: verb = this.state.verb;
        let conjugation: conjugation = verb.conjugations[this.state.conjIndex];
        const answer: string = this.state.answer;
        let message = '';
        if (answer.toLowerCase() == conjugation.conjugacion.toLowerCase()) {
            message = "Correct!";
        } else {
            message = "Incorrect, the answer is " + conjugation.conjugacion;
        }
        Alert.alert("", message,
                [{text: 'OK', onPress: () => {
                    if (verb.conjugations.length > 0) {
                        verb.conjugations.splice(this.state.conjIndex, 1);
                        this.state.verbList.push(verb);
                    }
                    this.setState({ answer: '' });
                    this.getQuiz();
                }},
                ])
       
    }

    render() {
        let verb = this.state.verb;
        let conjugation = verb ? verb.conjugations[this.state.conjIndex] : null;
        return (
            <View style={styles.container}>
                <Text style={styles.h1}>{verb ? verb.name : 'loading'}</Text>
                <Text style={styles.h2}>{conjugation && conjugation.pointOfView} {conjugation && Object.keys(times).find(k => times[k] === conjugation.time)}</Text>
                <TextInput value={this.state.answer} style={styles.input} onChangeText={(answer) => { this.setState({ answer }) }}></TextInput>
                <Text style={styles.button} onPress={() => this.checkAnswer()}>Answer</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BFB3E0',
    },
    input: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        margin: 10,
        backgroundColor: 'white'
    },
    h1: {
        padding: 12,
        fontSize: 32,
        textAlign: 'center'
    },
    h2: {
        padding: 10,
        fontSize: 28,
        textAlign: 'center',
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
})