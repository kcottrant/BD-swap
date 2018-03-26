import * as firebase from 'firebase';
import firebaseRef from '../DB/firebase'
import React, { Component } from 'react';
import { Image, ActivityIndicator,ListView, AppRegistry, View, Text, TouchableOpacity } from 'react-native';
import BarreRecherche from '../component/barreRecherche';
import Icon from 'react-native-vector-icons/MaterialIcons';
import mesStyles from '../styles/style';
const ListItems = require('../component/ListItems');

//TODO : Mettre des couleurs différentes en fonction des disponibilités
//TODO : Disponibilité à calculer en fonction des utilisateurs
export default class EcranAccueil extends Component {

  // Info tabNavigator
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    tabBarLabel = 'Accueil',
    tabBarIcon = <Icon size={24} color="white" name="home" />
    return { tabBarLabel, tabBarIcon };
  }

  constructor(props) {

    // On récupère des informations de la base de données
    // TODO récuperer les données sous forme de tableau
    /*
    firebase.database().ref('BD/1/titre').on("value", snapshot => {
      this.setState({ titreBD: snapshot.val() })
    });
    firebase.database().ref('BD/2/titre').on("value", snapshot => {
      this.setState({ titreBD2: snapshot.val() })
    });

    firebase.database().ref('BD/1/Disponibilité').on("value", snapshot => {
      this.setState({ disponibilite: snapshot.val() })
    });
    firebase.database().ref('BD/2/Disponibilité').on("value", snapshot => {
      this.setState({ disponibilite2: snapshot.val() })
    });
    firebase.database().ref('BD/1/image').on("value", snapshot => {
      this.setState({ Lienimage: snapshot.val() })
    });
    firebase.database().ref('BD/2/image').on("value", snapshot => {
      this.setState({ Lienimage2: snapshot.val() })
    });

    
    this.state = { Lienimage: 'image', disponibilite: '', titreBD: '', Lienimage2: 'image', disponibilite2: '', titreBD2: '' }
   
    */
    super(props);
    this.tasksRef = firebase.database().ref().child('BD');
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    };

  }

  listenForTasks(tasksRef) { 
    tasksRef.on('value', (dataSnapshot) => {
      var tasks = [];
      dataSnapshot.forEach((child) => {
        tasks.push({
          titre: child.val().titre,
          disponibilite: child.val().disponibilite,
          image: child.val().image,
          key: child.key,
          collection : child.val().collection,
          date:child.val().dateParution,
          editeur:child.val().editeur,
          format:child.val().format,
          nbPages:child.val().nbPages,
        });
      });

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(tasks)
      });
    });
  }
  componentDidMount() {
    // start listening for firebase updates
    this.listenForTasks(this.tasksRef);
  }
  _renderItem(item) {
    return (
      <View>
        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
          <Image source={{ uri: item.image }}
            style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, width: 80, height: 100 }} />
          <View style={{ marginLeft: 10, flexDirection: 'column' }}>
            <Text style={[mesStyles.label, { marginTop: 10, paddingLeft: 0 }]}>{item.titre}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity disabled style={{padding: 10, marginTop: 20, borderRadius: 20, backgroundColor: '#26CA1A', alignSelf: 'flex-start' }}>
                <Text> Disponibilités: {item.disponibilite}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  this.props.navigation.navigate('DetailsBD',{...item})}>
                <Icon size={50} color="black" name="add-box" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 2,
          }}
        />
      </View>
    );
  }

  render() {
    // Affichage des BD (données dans Firebase)
    // TODO : mettre plusieurs BD 
    // TODO : Affiche unique pour un nombre de BD donné
    if (this.state.dataSource.getRowCount() === 0) {
      return (
        <View style={{position:'absolute',top: 0, left: 0, right: 0, bottom: 0,justifyContent:'center'}}>
          <ActivityIndicator size="large" color="black" />
        </View>
      )
    }
    else
      return (
        <View style={{ flex: 1 }}>
          <BarreRecherche />
          <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} />
        </View>

      )
  };
}
