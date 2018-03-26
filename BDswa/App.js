import * as firebase from 'firebase';
import React,{Component} from 'react';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import { AppRegistry,View} from 'react-native';
import BarreRecherche from './component/barreRecherche.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StackNavigator} from 'react-navigation';
import EcranAccueil from './scenes/EcranAccueil.js'
import TabBarre from './routes/tabNavigator'


// On retourne TabNavigator 
//UPDATE POUR NOTIFICATIONS
export default class App extends Component{
  constructor(props) {
    super(props);
    this.state = {nbNonlus:0};
}

componentWillMount()
    { var acces = this;
        var userID='';
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                userID= firebase.auth().currentUser.uid;
                acces.setState({userIdentifiant:userID});
                var tasksRef = firebase.database().ref('users/'+userID+'/Messages');
                console.log(tasksRef)
                acces.listenForTasks(tasksRef,userID);
            } else {
                console.log('Vous n\'êtes pas connecté');
            }
        });
    }
listenForTasks(tasksRef,userID) { 
  var nbNonlus=0;
  tasksRef.orderByChild('nonlu').equalTo(true).on('value', (dataSnapshot) => {
    dataSnapshot.forEach((child) => {
      nbNonlus= nbNonlus+1;
    });
    console.log(nbNonlus)
    this.setState({
      nbNonlus:nbNonlus
    });
  });
}

  render()
  {
    return(<TabBarre screenProps={{ unreadMessagesCount: this.state.nbNonlus}}/>)
  }

};