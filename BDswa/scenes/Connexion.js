import * as firebase from 'firebase';
import { Button, ActivityIndicator, View, Text, TouchableOpacity, AppRegistry } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '../styles/style'
import Header from '../component/header'; 7
import Deconnexion from './Profil_Deconnexion';

export default class Connexion extends Component {

    // Info tabNavigator
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        tabBarLabel = 'Mon compte',
            //TODO : Mettre 'Mon profil' quand l'utilisateur connecté
            tabBarIcon = <Icon size={24} color="white" name="person" />
        return { tabBarLabel, tabBarIcon };
    }

    constructor(props) {
        super(props);
        // Informations de connexion de l'utilisateur
        this.state = { email: '', password: '', error: '', loading: false, user: firebase.auth().currentUser };
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            this.setState({ user });
        });
    }

    // Connexion avec mot de passe et email à Firebase
    onLoginPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false })
            }).catch(() => { this.setState({ error: '*Erreur dans votre identifiant ou mot de passe', loading: false }) });
    }
    // TODO gérer les différentes erreurs : mdp<8/email pas incorrrect ...

    // Inscription avec email et mot de passe 
    onSignUpPress() {
        this.setState({ error: '', loading: true });
        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ error: '', loading: false })
            }).catch(() => { this.setState({ error: '*Cet adresse mail exite déjà', loading: false }) });
    }
    // TODO gérer les différentes erreurs

    // charge la connexion ou retourne les boutons d'inscription/connexion
    renderButtonOrLoading() {
        if (this.state.loading) {
            return <ActivityIndicator size="large" color="black" />
        }
        return <View>
            <TouchableOpacity
                style={style.button}
                onPress={this.onLoginPress.bind(this)}
            >
                <Text> Se connecter </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={style.button}
                onPress={this.onSignUpPress.bind(this)}><Text>S'inscrire</Text>
            </TouchableOpacity>
        </View>
    }

    render() {
        // Si l'utilisateur n'est pas connecté 
        if (this.state.user === null) {
            return (
                <View>
                    <Header nom='Connexion' />
                    <View style={{ marginTop: 20 }}>
                        <FormLabel>Email</FormLabel>
                        <FormInput
                            placeholder='jdupont@mail.com'
                            onChangeText={email => this.setState({ email })}
                            value={this.state.email} />
                        <FormValidationMessage>
                            {'Champ obligatoire'}
                        </FormValidationMessage>
                        <FormLabel>Password</FormLabel>
                        <FormInput
                            secureTextEntry
                            placeholder='mdp'
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password} />
                        <FormValidationMessage>
                            {'Champ obligatoire'}
                        </FormValidationMessage>
                        <Text>{this.state.error}</Text>
                        {this.renderButtonOrLoading()}
                    </View>
                </View>
            )
        }
        else
            return (<Deconnexion />) // Cas ou l'utilisateur est connecté 
    }

}