import * as firebase from 'firebase';
import firebaseRef from '../DB/firebase'
import React from 'react';
import { View, Image, ActivityIndicator, ListView, Text, AsyncStorage, TouchableOpacity, StyleSheet, AppRegistry, Button, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '../styles/style';
import { StackNavigator } from 'react-navigation';
import Header from '../component/header';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import mesStyles from '../styles/style'

export default class favoris extends React.Component {

    // Info TabNavigator
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        tabBarLabel = 'Favoris',
        tabBarIcon = <Icon size={24} color="white" name="favorite" />
        return { tabBarLabel, tabBarIcon };
    }
    
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }), userIdentifiant:'',
        };

    }

    componentWillMount()
    { var acces = this;
        var userID='';
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                userID= firebase.auth().currentUser.uid;
                acces.setState({userIdentifiant:userID});
                var  tasksRef = firebase.database().ref('users/' + userID).child('favoris');
                acces.listenForTasks(tasksRef,userID);
            } else {
                acces.setState({userIdentifiant:''})
                console.log('Vous n\'êtes pas connecté');
            }
        });
    }

    supressionFavoris(userID,itemKey){
        firebase.database().ref('users/' + userID+'/favoris/'+itemKey).remove();
    }
    listenForTasks(tasksRef,userID) {
        tasksRef = firebase.database().ref('users/' + userID).child('favoris');
        tasksRef.on('value', (dataSnapshot) => {
            var tasks = [];
            dataSnapshot.forEach((child) => {
                tasks.push({
                    titre: child.val().titreBD,
                    disponibilite: child.val().disponibilite,
                    imageBD: child.val().image,
                    image: child.val().imageUtilisateur,
                    key: child.key,
                    pseudo : child.val().pseudo,
                    dateAjout : child.val().dateAjout,
                    derniereCo:  child.val().derniereCo,
                    etat :  child.val().etat,
                    echange :  child.val().echange,
                    keyBD :  child.val().keyBD,
                    description: child.val().description,
                    commune: child.val().commune,
                    ville: child.val().ville,
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(tasks)
            });
        });
    }
    componentDidMount() {
        this.listenForTasks(this.tasksRef);
    }
    _renderItem(item) {
        return (
            <View>
                <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                    <Image source={{ uri: item.imageBD }}
                        style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, width: 80, height: 100 }} />
                    <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                        <Text style={[mesStyles.label, { marginTop: 10, paddingLeft: 0 }]}>{item.titre}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{flexDirection:'column',marginLeft:20}}>
                            <TouchableOpacity disabled style={{ padding: 10,height:35,width:130,borderRadius: 20, backgroundColor: '#26CA1A', alignSelf: 'flex-start' }}>
                                <Text> Disponibilités: {item.disponibilite}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.supressionFavoris.bind(this,this.state.userIdentifiant,item.keyBD)} style={{ padding: 10,marginTop:5,height:35,width:130, borderRadius: 20, backgroundColor: 'red', alignSelf: 'flex-start' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon size={20} color="black" name="delete" />
                                <Text> Supprimer </Text>
                            </View>
                            </TouchableOpacity>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('InfoUtilisateur', { ...item })}>
                                <Icon size={50} color="black" name="add-box" />
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={[mesStyles.label15,{fontWeight:'bold'}]}>Echangé par : </Text>
                        <Text style={mesStyles.label15}> {item.pseudo}</Text>
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
       if (this.state.userIdentifiant === '') {
            return (
                <View style={{ flex: 1 }}>
                     <Header nom="Ma liste d 'envie"/>
                </View>
            )
        }
        else
            return (
                <View style={{ flex: 1 }}>
                     <Header nom="Ma liste d 'envie"/>
                    <ListView enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} />
                </View>

            )


    }

}