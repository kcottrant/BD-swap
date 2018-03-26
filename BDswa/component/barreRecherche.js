import React, { Component } from 'react';
import BottomNavigation, { Tab } from 'react-native-material-bottom-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  AppRegistry,
  StyleSheet,
  TextInput,
  View,
  Button,
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import style from '../styles/style.js';

// Mise en place de la barre de recherche 

export default class BarreRecherche extends Component{
  render() {
    return (
      <View style={[style.container2,style.flowRight]}>
        <TextInput
            style={style.searchInput}
            placeholder='Rechercher une BD'/>
        <TouchableOpacity style={{marginTop:10}} >
                <Icon size={25} color="black" name="search" />
        </TouchableOpacity>
     </View>
    )
  }
}