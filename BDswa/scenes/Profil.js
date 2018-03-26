import * as firebase from 'firebase';
import React,{Component} from 'react';
import { TextInput, View, Text, AsyncStorage, TouchableOpacity, StyleSheet, AppRegistry, Button, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import style from '../styles/style';
import { TabNavigator } from 'react-navigation';
import Header from '../component/header';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import mesStyles from '../styles/style'
import { database } from 'firebase';
import { StackNavigator } from 'react-navigation';
import Profil_Deconnexion from './Profil_Deconnexion'
import Favoris from './favoris'

export default class Profil extends Component {

    constructor(props) {
        super(props);
        var email, mdp;
        var database = firebase.database();
        this.state = {user :firebase.auth().currentUser,retour:false, editable: false, error: '', nomUtilisateur:'', 
        adresse: '', ville: '', commune: '', visible: true, iconeVisible: false };
    }
    // Permet de pouvoir modifier les propriétés des text input
    
    onPress() {
        this.setState({ editable: !this.state.editable });
    }
    componentDidMount(){
        this.setState({user:firebase.auth().currentUser});
        firebase.database().ref('users/' + this.state.user.uid+'/adresse').on("value", snapshot => {
            this.setState({adresse: snapshot.val()})});
        firebase.database().ref('users/' + this.state.user.uid+'/nomUtilisateur').on("value", snapshot => {
            this.setState({nomUtilisateur: snapshot.val()})});
        firebase.database().ref('users/' + this.state.user.uid+'/ville').on("value", snapshot => {
            this.setState({ville: snapshot.val()})});
        firebase.database().ref('users/' + this.state.user.uid+'/commune').on("value", snapshot => {
            this.setState({commune: snapshot.val()})});

    }
    componentWillMount(){
        this.setState({user:firebase.auth().currentUser});
        firebase.database().ref('users/' + this.state.user.uid+'/adresse').on("value", snapshot => {
            this.setState({adresse: snapshot.val()})});
        firebase.database().ref('users/' + this.state.user.uid+'/nomUtilisateur').on("value", snapshot => {
            this.setState({nomUtilisateur: snapshot.val()})});
        firebase.database().ref('users/' + this.state.user.uid+'/ville').on("value", snapshot => {
            this.setState({ville: snapshot.val()})});
        firebase.database().ref('users/' + this.state.user.uid+'/commune').on("value", snapshot => {
            this.setState({commune: snapshot.val()})});
    }
    onPressMdp() {
        this.setState({ iconeVisible: true });
        this.setState({ editable: !this.state.editable });
    }
    // Permet de rendre visible le mot de passe de l'utilisateur 
    onPressVisible() {
        this.setState({ visible: !this.state.visible })
    }
    // Affiche l'icone uniquement si l'utilisateur change son mot de passe
    AfficherIcone() {
        if (this.state.iconeVisible) {
            return (
                <TouchableOpacity onPress={this.onPressVisible.bind(this)}>
                    <Icon style={{ paddingRight: 5 }} size={24} color="black" name="remove-red-eye" />
                </TouchableOpacity>
            )
        }
        else
            return null;
    }
    updateLesChamps() {
       // user.updateProfile({ displayName: this.state.nomUtilisateur }).then(() => { this.setState({ error: '' }) })
          //  .catch(() => { this.setState({ error: 'Erreur les données n\'ont pas pu être enregistrées' }) })
          // Enregistrement de données dans Firebase => SET
        firebase.database().ref('users/' + this.state.user.uid).set({
            nomUtilisateur: this.state.nomUtilisateur,
            adresse: this.state.adresse,
            ville : this.state.ville,
            commune: this.state.commune,
        });

    }
    //TODO comment naviguer jusqu'à la page 'Login" ? 
    /*onPressButton() {
        this.props.navigation.navigate('login');
        }*/
    onPressRetour(){
        this.setState({retour:true});
    }
    render() {
        if(this.state.retour===false)
        {
        return (
            <View>
                <View style={{ flexDirection: 'row', backgroundColor: 'coral' }}>
                    <TouchableOpacity onPress={this.onPressRetour.bind(this)} style={{ marginTop: 30, marginLeft: 10 }} >
                        <Icon size={32} color="black" name="backspace" />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Header nom="Email" />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 10 }}>
                    <Icon size={22} color="black" name="mail" />
                    <Text style={styles.label}>{this.state.retour}</Text>
                </View>
                <View style={styles.flowRight}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.largeurTextInput, { fontSize: 18 }]}
                            editable={this.state.editable}
                            value={this.state.user.email}
                        />
                        <TouchableOpacity onPress={this.onPress.bind(this)}>
                            <Icon style={{ paddingRight: 5 }} size={24} color="black" name="create" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 15 }}>
                    <Icon size={22} color="black" name="person" />
                    <Text style={styles.label}>Nom d'utilisateur:</Text>
                </View>
                <View style={styles.flowRight}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.largeurTextInput, { fontSize: 18 }]}
                            placeholder='jdupont65'
                            editable={this.state.editable}
                            value={this.state.nomUtilisateur}
                            onChangeText={nomUtilisateur => this.setState({ nomUtilisateur })}
                        />
                        <TouchableOpacity onPress={this.onPress.bind(this)}>
                            <Icon style={{ paddingRight: 5 }} size={24} color="black" name="create" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 15 }}>
                    <Icon size={22} color="black" name="lock" />
                    <Text style={styles.label}>Mot de passe:</Text>
                </View>
                <View style={styles.flowRight}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.largeurTextInput, { fontSize: 18 }]}
                            secureTextEntry={this.state.visible}
                            editable={this.state.editable}
                            value={this.state.user.providerId}//Comment récupérer le mot de passe ? 
                        />
                        <View style={{ flexDirection: 'row' }} >
                            {this.AfficherIcone()}
                            <TouchableOpacity onPress={this.onPressMdp.bind(this)}>
                                <Icon style={{ paddingRight: 5 }} size={24} color="black" name="create" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 15 }}>
                    <Icon size={22} color="black" name="location-on" />
                    <Text style={styles.label}>Adresse:</Text>
                </View>
                <View style={styles.flowRight}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.largeurTextInput, { fontSize: 18 }]}
                            placeholder='5 rue du Hamel'
                            editable={this.state.editable}
                            value={this.state.adresse}
                            onChangeText={adresse => this.setState({ adresse })}
                        />
                        <TouchableOpacity onPress={this.onPress.bind(this)}>
                            <Icon style={{ paddingRight: 5 }} size={24} color="black" name="create" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 15 }}>
                    <Icon size={22} color="black" name="map" />
                    <Text style={styles.label}>Ville:</Text>
                </View>
                <View style={styles.flowRight}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.largeurTextInput, { fontSize: 18 }]}
                            placeholder='Bordeaux'
                            editable={this.state.editable}
                            value={this.state.ville}
                            onChangeText={ville => this.setState({ville})}
                        />
                        <TouchableOpacity onPress={this.onPress.bind(this)}>
                            <Icon style={{ paddingRight: 5 }} size={24} color="black" name="create" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingLeft: 10, marginTop: 15 }}>
                    <Text style={styles.label}>Commune:</Text>
                </View>
                <View style={styles.flowRight}>
                    <View style={styles.container}>
                        <TextInput
                            style={[styles.largeurTextInput, { fontSize: 18 }]}
                            placeholder='33000'
                            editable={this.state.editable}
                            value={this.state.commune}
                            onChangeText={commune => this.setState({commune })}
                        />
                        <TouchableOpacity onPress={this.onPress.bind(this)}>
                            <Icon style={{ paddingRight: 5 }} size={24} color="black" name="create" />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity onPress={this.updateLesChamps.bind(this)} style={[mesStyles.button, { marginTop: 15, backgroundColor: '#1EB4D9' }]}>
                    <Text style={mesStyles.label}>Confirmer</Text>
                </TouchableOpacity>
            </View>
        )

    }
    else
      {return (<Profil_Deconnexion/>)}
    }
}

// TODO : mettre les styles dans le fichier "style"
const styles = StyleSheet.create({
    flowRight: {
        marginTop: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //alignItems:'stretch'
    },
    largeurTextInput: {
        height: 25,
        width: 200,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        marginLeft: 10,
        borderBottomWidth: 1,
        borderColor: '#000',
        paddingBottom: 5,
        justifyContent: 'space-between',
        marginRight: 15,
    },
    inputStyle: {
        flex: 1,
    },
    label: {
        fontFamily: 'Avenir Next',
        fontSize: 17,
        paddingLeft: 5,
    },
})