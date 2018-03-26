import * as firebase from 'firebase';
import React,{Component} from 'react';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import { AppRegistry,View,Text} from 'react-native';
import BarreRecherche from '../component/barreRecherche.js';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Connexion from '../scenes/Connexion'
import {StackNavigator} from 'react-navigation';
import EcranAccueil from '../scenes/EcranAccueil.js'
//import Profil from '../scenes/Profil' 
import Favoris from '../scenes/favoris'
import Messages from '../scenes/mesMessages';
import DetailsBD from '../scenes/DetailsBD'
// Menu situé en bas de l'application 
import InfoUtilisateur from '../scenes/InfoUtilisateur'
import IconBadge from 'react-native-icon-badge';
import Discussions from '../scenes/Discussions'

export const stackNav2=StackNavigator(
  {
    DetailsBD:{screen:DetailsBD},
    InfoUtilisateur:{screen:InfoUtilisateur}
  },
  {
    headerMode:'none',
    cardStyle: { backgroundColor: 'white'}
  }
)
export const stackNav1=StackNavigator(
  {
    EcranAccueil:{screen:EcranAccueil,},
    DetailsBD: {screen :stackNav2}
  },
  {
    headerMode:'none',
    cardStyle: { backgroundColor: 'white'}
  }
)
export const stackNav3=StackNavigator(
  {
    Favoris : {screen:Favoris,},
    InfoUtilisateur:{screen:InfoUtilisateur},
  },
  {
    headerMode:'none',
    cardStyle: { backgroundColor: 'white'}
  }
)
export const stackNav4=StackNavigator(
  {
    Messages : {screen : Messages,},
    Discussions : {screen : Discussions},
  },
  {
    headerMode:'none',
    cardStyle: { backgroundColor: 'white'}
  }
)

export default TabNavigator(
    {
      EcranAccueil: { screen: stackNav1 },
      Favoris: { screen: stackNav3 },
      Messages: { screen: stackNav4,
        navigationOptions: ({ screenProps }) => ({
          tabBarLabel : 'Mes messages',
          tabBarIcon: ({tintColor}) =>
            <IconBadge
              MainElement={<Icon name='email' size={24} color='white' />}
              BadgeElement={<Text style={{ color: 'white' }}>{screenProps.unreadMessagesCount}</Text>}
              Hidden={screenProps.unreadMessagesCount === 0}
            />
        }) },
      MonCompte: { screen: Connexion },
    }, 
    {
      tabBarComponent: NavigationComponent,
      tabBarPosition: 'bottom',
      swipeEnabled: true,
      tabBarOptions: {
        bottomNavigationOptions: {
          labelColor: 'white',
          rippleColor: 'white',
          backgroundColor: '#37474F',
          tabs: {
            EcranAccueil: {
              activeIcon: <Icon size={24} color="lightcoral" name="home" />
            },
            Favoris: {
              activeIcon: <Icon size={24} color="lightcoral" name="favorite" />
            },
            Messages: {
                activeIcon:  <Icon size={24} color="lightcoral" name="email" />
                  //<IconBadge
                  //  MainElement={<Icon name='email' size={24} color='lightcoral' />}
                   // BadgeElement={<Text style={{ color: 'white' }}>{2}</Text>}
                   // Hidden={2 === 0}
                  //>
            },
            MonCompte: {
              activeIcon: <Icon size={24} color="lightcoral" name="person" />
            }
          }
        }
      }
    })
    
  
    
