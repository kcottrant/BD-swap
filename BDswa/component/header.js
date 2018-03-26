import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  Text,
  View,
  Button,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';
import style from '../styles/style.js';

//Header qui s'adapte en fonction des noms des pages
export default class BarreRecherche extends Component{
    render() {
      return (
    <View style={style.header}>
        <Text style={style.text}>{this.props.nom}</Text>
    </View>
      )
    }
  }