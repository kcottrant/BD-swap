import * as firebase from 'firebase';
import React, { Component } from 'react';
import { Image,ListView, AppRegistry, View, Text, TouchableOpacity } from 'react-native';
import BarreRecherche from '../component/barreRecherche';
import Icon from 'react-native-vector-icons/MaterialIcons';
import mesStyles from '../styles/style';

class ListItems extends Component{

  constructor(props){
    super(props);
  }
render() {
    // Affichage des BD (données dans Firebase)
    return (
      <View>
        <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
          <Image source={{ uri: this.props.item.image }}
            style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, width: 80, height: 100 }} />
          <View style={{ marginLeft: 10, flexDirection: 'column' }}>
            <Text style={[mesStyles.label, { marginTop: 10, paddingLeft: 0 }]}>{this.props.item.titre}</Text>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={{ padding: 10, marginTop: 20, borderRadius: 20, backgroundColor: '#26CA1A', alignSelf: 'flex-start' }}>
                <Text> Disponibilités: {this.props.item.disponibilite}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Connexion')}>
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


    )
  }
}
module.exports=ListItems;