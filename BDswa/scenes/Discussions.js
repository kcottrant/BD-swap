import * as firebase from 'firebase';
import firebaseRef from '../DB/firebase'
import React from 'react';
import { View, Image,ScrollView, ActivityIndicator, ListView, Text, AsyncStorage, TouchableOpacity, StyleSheet, AppRegistry, Button, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '../styles/style';
import { StackNavigator } from 'react-navigation';
import Header from '../component/header';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import mesStyles from '../styles/style'
import { database } from 'firebase';

export default class Discussions extends React.Component {

    constructor(props) {
        super(props);
        var userID = firebase.auth().currentUser.uid;
        this.tasksRef = firebase.database().ref('users/' + userID + '/Messages');
        this.state = {pseudo:'',
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }), userIdentifiant: '', pseudo: '',
        };

    }

    listenForTasks(tasksRef) {
        const { key,emmeteur} = this.props.navigation.state.params;
        firebase.database().ref('users/' + emmeteur + '/nomUtilisateur').on("value", snapshot => {
            this.setState({ pseudo: snapshot.val() })});
        tasksRef.child(key).update({
            nonlu: false,
        });
    }
    componentWillMount() {
        this.listenForTasks(this.tasksRef);
    }
    render() {
        const { contenu, objet, key, nonlu, date, bold } = this.props.navigation.state.params;
        return (
            <View>
                <View style={{ flexDirection: 'row', backgroundColor: 'coral' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginTop: 30, marginLeft: 10 }} >
                        <Icon size={32} color="black" name="backspace" />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Header nom={"Discussion"} />
                    </View>
                </View>
                <ScrollView>
                <Text style={{marginTop:10,fontFamily: 'Avenir Next', fontSize: 15, fontWeight: 'bold' }}>De : {this.state.pseudo}</Text>
                <Text style={{marginTop:10, textDecorationLine: 'underline', fontFamily: 'Courier New', fontSize: 15 }}>Objet : {objet}</Text>
                <TouchableOpacity disabled style={{marginTop:10, padding: 10, borderRadius: 20, backgroundColor: 'darkturquoise' }}>
                    <Text style={{fontFamily: 'Avenir Next', fontSize: 14}}>{contenu}</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        )


    }

}