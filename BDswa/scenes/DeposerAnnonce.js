import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, Text,ListView, AsyncStorage, TextInput, TouchableOpacity, StyleSheet, AppRegistry, Button, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '../styles/style';
import { StackNavigator } from 'react-navigation';
import Header from '../component/header';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import Connexion from '../scenes/Connexion';
import { Dropdown } from 'react-native-material-dropdown';
import mesStyles from '../styles/style';
import { jsonEval } from '@firebase/util/dist/esm/src/json';

// On fait le choix qu'un utilisateur ne peut pas exhanger 2 fois la même BD
// TODO : diponibilité BD +1
export default class DeposerAnnonce extends Component {

    constructor(props) {
        super(props);
        this.tasksRef = firebase.database().ref().child('BD');
        this.state = {dataSource: [],dataSource2:[],retour: false,text2:'',etat:'',echange:'',
             text: "Je souhaite échanger cette BD contre n'importe quelle autre  BD :) Contactez moi !" };
        this.newPostKey = firebase.database().ref().child('favoris').push().key;
    }
    onPress(){
        var today = new Date();
        var date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
        var user = firebase.auth().currentUser;
        if(this.state.text2!='' && this.state.etat!='' && this.state.echange!='')
        {
            var id = this.state.dataSource2.find(x=>x.value===this.state.text2).key;
            firebase.database().ref('users/' + user.uid+'/Annonce/'+id).set({
                dateAjout: date,
                description :this.state.text ,
                echange :this.state.echange ,
                etat : this.state.etat ,
                id_BD: parseInt(id),
            });
            Alert.alert("Félicitations","Votre annonce a bien été deposée")
        }
        else
        Alert.alert("Erreur","Veuillez remplir tous les champs");


    }

    onPressRetour() {
        this.setState({ retour: true });
    }
    listenForTasks(tasksRef) { 
        tasksRef.on('value', (dataSnapshot) => {
          var tasks = [];
          var tasks2=[];
          dataSnapshot.forEach((child) => {
            tasks.push({value :child.val().titre});
            tasks2.push({value :child.val().titre,key: child.key});
          });
          
         
          this.setState({
            dataSource: tasks,
            dataSource2:tasks2
          });
        });
    }
    componentWillMount(){
        this.listenForTasks(this.tasksRef);
    }

    render() {
        let etat = [{ value: 'Neuf', }, { value: 'Excellent', }, { value: 'Occasion', }, { value: 'Abimé', }];
        let echange = [{ value: 'Main propre', }, { value: 'Collissimo', }, { value: 'Point Relais', }];
        if (this.state.retour === false) {
            return (
                <View>
                    <View style={{ flexDirection: 'row', backgroundColor: 'coral' }}>
                        <TouchableOpacity onPress={this.onPressRetour.bind(this)} style={{ marginTop: 30, marginLeft: 10 }} >
                            <Icon size={32} color="black" name="backspace" />
                        </TouchableOpacity>
                        <View style={{ flex: 1 }}>
                            <Header nom="Mon annonce" />
                        </View>
                    </View>
                    <View style={{ paddingLeft: 5 }}>
                        <Dropdown label='Nom de la BD' value={this.state.text2}
                         onChangeText={(text2) => this.setState({ text2 })} data={this.state.dataSource} />
                        <View style={{flexDirection:'row',alignItems: 'center' }}>
                        <Icon size={30} name="info" color='#1EB4D9' />
                        <Text style={[mesStyles.label15,{marginLeft:5,textAlign: 'center', fontSize: 17, marginTop: 5 }]}>
                            Si votre BD ne figure pas dans cette liste veuillez nous contacter
                        </Text>
                        </View>
                        <Dropdown  onChangeText={(etat) => this.setState({ etat })} label='Etat' data={etat} />
                        <Dropdown  onChangeText={(echange) => this.setState({ echange })} label='Echange' data={echange} />
                        <Text style={[mesStyles.label20, { marginTop: 5 }]}>
                            Description :
                        </Text>
                        <View style={{
                            backgroundColor: '#EAEAEA',
                            borderColor: 'black',
                            borderWidth: 0.5,
                            borderWidth: 1,
                            padding: 3,
                            borderRadius: 3,

                        }}
                        >
                            <TextInput
                                maxLength={150}
                                editable={true}
                                multiline={true}
                                onChangeText={(text) => this.setState({ text })}
                                value={this.state.text}
                            />

                        </View>
                        <TouchableOpacity onPress={this.onPress.bind(this)} style={[mesStyles.button, { marginTop: 20, backgroundColor: '#1EB4D9' }]}>
                            <Text style={mesStyles.label}>Ajouter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        else
            return (<Connexion />)


    }

}