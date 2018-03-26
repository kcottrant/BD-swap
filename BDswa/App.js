import * as firebase from 'firebase';
import React,{Component} from 'react';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import { AppRegistry,View} from 'react-native';
import BarreRecherche from './component/barreRecherche.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Login from './scenes/connexion'
import {StackNavigator} from 'react-navigation';
import EcranAccueil from './scenes/EcranAccueil.js'
import Profil from './scenes/profil' 
import Favoris from './scenes/favoris'
import Messages from './scenes/mesMessages'
import TabBarre from './routes/tabNavigator'

// On retourne TabNavigator 
export default class App extends Component{
  render()
  {
    return(<TabBarre/>)
  }

};