import * as firebase from 'firebase';
import React, { Component } from 'react';
import { View, ListView, Text, AsyncStorage, TouchableOpacity, StyleSheet, AppRegistry, Button, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '../styles/style';
import { StackNavigator } from 'react-navigation';
import Profil from './Profil';
import DeposerAnnonce from './DeposerAnnonce'

export default class Profil_Deconnexion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            profil: false,
            deposerAnnonce: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            userIdentifiant: '', titre: 'jpjp', image: '',
        };
    }

    componentWillMount() {
        var acces = this;
        var userID = '';
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userID = firebase.auth().currentUser.uid;
                acces.setState({ userIdentifiant: userID });
                var tasksRef = firebase.database().ref('users/' + userID).child('Annonce');
                acces.listenForTasks(tasksRef, userID);
            }
        });
    }
    supressionFavoris(userID, itemKey) {
        firebase.database().ref('users/' + userID + '/Annonce/' + itemKey).remove();
        this.componentWillMount();
    }

    listenForTasks(tasksRef, userID) {
        tasksRef = firebase.database().ref('users/' + userID).child('Annonce');
        var tasks = [];
        tasksRef.on('value', (dataSnapshot) => {
            dataSnapshot.forEach((child) => {

                firebase.database().ref('BD/' + child.val().id_BD + '/titre').on("value", snapshot => {
                    this.setState({ titre: snapshot.val() })
                })
                tasks.push({
                    dateAjout: child.val().dateAjout,
                    description: child.val().description,
                    echange: child.val().echange,
                    key: child.key,
                    etat: child.val().etat,
                    id_BD: child.val().id_BD,
                    titre: this.state.titre,
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

    // Vue modifié en fonction de l'action de l'utilisateur 
    onPress() {
        this.setState({ profil: true });
    }
    onPress2() {
        this.setState({ deposerAnnonce: true });
    }

    _renderItem(item) {
        return (
            <View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    <View>
                        <Text style={{ fontFamily: 'Avenir Next', fontSize: 19, textAlign: 'center', marginTop: 10 }}>{item.titre}</Text>
                        <TouchableOpacity disabled style={{ padding: 10, borderRadius: 20, backgroundColor: 'lightsalmon' }}>
                            <Text style={{ fontStyle: 'italic', textShadowOffset: { width: 1, height: 1 }, textShadowColor: 'gray' }}>"{item.description}"</Text>
                        </TouchableOpacity>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                <Text style={[style.label15, { fontWeight: 'bold' }]}>Echange :</Text>
                                <Text style={style.label15}>{item.echange }</Text>
                                </View>
                                <View>
                                <Text style={[style.label15, { fontWeight: 'bold' }]}>Etat : </Text>
                                <Text style={style.label15}>{item.etat}</Text>
                                </View>
                                <TouchableOpacity onPress={this.supressionFavoris.bind(this, this.state.userIdentifiant, item.key)} style={{ padding: 10, marginTop: 5, borderWidth: 2, borderColor: 'black', height: 35, width: 130, borderRadius: 20, alignSelf: 'flex-start' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon size={20} color="black" name="delete" />
                                        <Text> Supprimer </Text>
                                    </View>
                                </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        marginTop: 5,
                        borderBottomColor: 'black',
                        borderBottomWidth: 2,
                    }}
                />
            </View>

        );
    }

    render() {
        // Switch entre les vues 
        // non profil
        if (!this.state.profil) {
            if (this.state.deposerAnnonce === false) {
                if (this.state.dataSource.getRowCount() === 0) {
                    return (
                        <View>
                            <View style={style.header}>
                                <View style={{ marginTop: 12, marginRight: 65 }}>
                                    <TouchableOpacity onPress={this.onPress.bind(this)}>
                                        <Icon size={32} color="black" name="account-circle" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={style.text}>Mon Compte</Text>
                                <View style={{ marginTop: 12, marginLeft: 65 }}>
                                    <TouchableOpacity onPress={() => { firebase.auth().signOut() }}>
                                        <Icon size={32} color="black" name="input" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ marginLeft: 10, marginRight: 10, marginTop: 125, alignItems: 'center' }}>
                                <Icon size={50} color="black" name="info" color='#1EB4D9' />
                                <Text style={{ textAlign: 'center', fontSize: 17, marginTop: 5 }}>
                                    <Text style={{ color: 'orange' }}>Déposer une annonce </Text>
                                    en
                <Text style={{ color: 'orange' }}> quelques clics</Text>
                                    , grâce à notre formulaire simplifié. Vous retrouverez ensuite toutes vos annonces déposées dans
                <Text style={{ color: 'orange' }}> cette section.</Text>
                                </Text>
                            </View>
                            <TouchableOpacity onPress={this.onPress2.bind(this)} style={[style.button, { marginTop: 20, backgroundColor: '#1EB4D9' }]}>
                                <Text style={style.label}>Déposer une annonce</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                else {
                    return (
                        <View>
                            <View style={style.header}>
                                <View style={{ marginTop: 12, marginRight: 65 }}>
                                    <TouchableOpacity onPress={this.onPress.bind(this)}>
                                        <Icon size={32} color="black" name="account-circle" />
                                    </TouchableOpacity>
                                </View>
                                <Text style={style.text}>Mes annonces</Text>
                                <View style={{ marginTop: 12, marginLeft: 65 }}>
                                    <TouchableOpacity onPress={() => { firebase.auth().signOut() }}>
                                        <Icon size={32} color="black" name="input" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <ListView backgroundColor='cornsilk' enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} />
                            <TouchableOpacity onPress={this.onPress2.bind(this)} style={[style.button, { marginTop: 20, backgroundColor: '#1EB4D9' }]}>
                                <Text style={style.label}>Déposer une annonce</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
            }
            else
                return (<DeposerAnnonce />)
        }
        else
            return (<Profil />) // profil

    }

}