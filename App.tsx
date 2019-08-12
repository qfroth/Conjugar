import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { verb } from './models/verb';
import { conjugation } from './models/conjugation';
import { pointOfViews } from './models/pointOfViews';
import { times } from './models/times';
import Landing from './components/landing';
import { createAppContainer, createStackNavigator} from 'react-navigation';
import AddVerb from './components/addVerb';
import Practice from './components/practice';
import Words from './components/words'

const appNavigator = createStackNavigator({
  Home: {screen: Landing},
  Add: {screen: AddVerb},
  Practice:{screen:Practice},
  Words:{screen:Words}
});
const Container = createAppContainer(appNavigator);
export default function App() {
  return (
    <Container></Container> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

const verbs = [
  new verb("cantar", "sing", [
    new conjugation(pointOfViews.first, times.present, "canto"),
    new conjugation(pointOfViews.first, times.past, "cante"),
    new conjugation(pointOfViews.first, times.future, "cantare"),
    new conjugation(pointOfViews.first, times.action, "cantando"),
  ]),
  new verb("tocar", "touch", [
    new conjugation(pointOfViews.first, times.present, "toco"),
    new conjugation(pointOfViews.first, times.past, "toce"),
    new conjugation(pointOfViews.first, times.future, "tocare"),
    new conjugation(pointOfViews.first, times.action, "tacando"),
  ])
]
