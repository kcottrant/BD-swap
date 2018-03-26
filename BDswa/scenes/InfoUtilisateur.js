import * as firebase from 'firebase';
import React from 'react';
import { View,KeyboardAvoidingView, Image,ScrollView, TextInput, Text, AsyncStorage, TouchableOpacity, StyleSheet, AppRegistry, Button, Keyboard, Alert, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import mesStyles from '../styles/style';
import { StackNavigator } from 'react-navigation';
import Header from '../component/header';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

//TODO : garder en mémoire le fait d'avoir un coeur remplit ou non + la clé crée
export default class Deconnexion extends React.Component {

    // Info TabNavigator
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        tabBarLabel = 'Détails',
            tabBarIcon = <Icon size={24} color="white" name="favorite" />
        return { tabBarLabel, tabBarIcon };
    }
    constructor(props) {
        super(props);
        const{titre}=this.props.navigation.state.params;
        this.state = { contenuMessage: 'Je suis intéressé(e) par votre annonce. Un échange serait-t-il envisageable contre une ou plusieurs de mes BD?'
        ,objet:titre, icone: 'favorite-border', favorite: true };
        var user = firebase.auth().currentUser;
        this.newPostKey = firebase.database().ref().child('favoris').push().key;
        this.newMessageKey = firebase.database().ref().child('favoris').push().key;
    }
    sendMessage(){
        const{idUser}=this.props.navigation.state.params;
        var user = firebase.auth().currentUser;
        var today = new Date();
        var date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
        if(this.state.contenuMessage!='' && this.state.objet!='')
        {
        firebase.database().ref('users/' + user.uid+'/Messages/'+this.newMessageKey).set({
            date: date,
            emmeteur : user.uid,
            objet : this.state.objet,
            contenu : this.state.contenuMessage,
            nonlu : true,
            reception:true,
        });
       /* firebase.database().ref('users/' + user.uid+'/Messages/'+this.newMessageKey).set({
            date : date,
            objet : this.state.objet,
            contenu : this.state.contenuMessage,
            destinataire : idUser,
            nonlu: false,
            reception:false,
        })*/
        Alert.alert("Félicitations","Votre message a bien été envoyé")
        }
        else
        Alert.alert("Erreur","Veuillez remplir tous les champs");

    }
    onPress() {
        var user = firebase.auth().currentUser;
        const{titre,pseudo,disponibilite,imageBD,image,dateAjout, derniereCo, etat, echange, keyBD, description, commune, ville}=this.props.navigation.state.params;
        console.log(this.newPostKey)
        if (this.state.favorite) {
            this.setState({ icone: 'favorite', favorite: false })
            firebase.database().ref('users/' + user.uid+'/favoris/'+this.newPostKey).set({
                titreBD: titre,
                disponibilite: disponibilite,
                image : imageBD,
                imageUtilisateur: image,
                pseudo : pseudo,
                dateAjout : dateAjout,
                derniereCo: derniereCo,
                etat : etat,
                echange : echange,
                keyBD : this.newPostKey,
                description:description,
                commune:commune,
                ville:ville,
            });
        }
        else
        { 
            this.setState({ icone: 'favorite-border', favorite: true })
            firebase.database().ref('users/' + user.uid+'/favoris/'+this.newPostKey).remove();
        }
           

    }
    render() {
        const { dateAjout, derniereCo, etat, echange, keyBD, description, commune, ville, pseudo, image, titre } = this.props.navigation.state.params;
        return (
            <KeyboardAvoidingView behavior="padding">
            <ScrollView>
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'coral' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ marginTop: 30, marginLeft: 10 }} >
                        <Icon size={32} color="black" name="backspace" />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Header nom={pseudo} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 10, marginTop: 5, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={mesStyles.label15}>Vendu par : {pseudo}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon size={22} color="#F00180" name="location-on" />
                            <Text style={mesStyles.label15}> {ville + " " + commune}</Text>
                        </View>
                        <Text style={mesStyles.label15}>Etat : {etat}</Text>
                        <Text style={mesStyles.label15}>Echange : {echange}</Text>
                        <Text style={mesStyles.label15}>Annonce ajoutée le : {dateAjout} </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon size={25} color="black" name="access-time" />
                            <Text style={mesStyles.label15}> Denière Connexion le : {derniereCo}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Image source={{ uri: image }} style={{ marginTop: 5, width: 80, height: 80 }} />
                        <TouchableOpacity style={{ marginLeft: 12 }} onPress={this.onPress.bind(this)}>
                            <Icon size={50} color="black" name={this.state.icone} />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{ textDecorationLine: 'underline' }}>
                    Description :
                </Text>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity disabled style={{ flex: 1, padding: 10, marginTop: 10, borderRadius: 20, backgroundColor: '#7FDFD2' }}>
                        <Text style={{ fontStyle: 'italic', textShadowOffset: { width: 1, height: 1 }, textShadowColor: 'darkblue' }}>"{description}"</Text>
                    </TouchableOpacity>
                </View>
                <Text style={[mesStyles.label15, { color: '#FE01C3', textAlign: 'center', marginTop: 10, textDecorationLine: 'underline', fontWeight: 'bold' }]}>
                    Contacter le vendeur {pseudo}
                </Text>
                <Text style={[mesStyles.label20, { marginTop: 5 }]}>
                    Sujet du message :
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
                        maxLength={100}
                        value={this.state.objet}
                        multiline={true}
                        onChangeText={(text)=>this.setState({objet:text})}
                        returnKeyType="done"
                        blurOnSubmit={true}
                    />

                </View>
                <Text style={[mesStyles.label20, { marginTop: 5 }]}>
                    Message :
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
                        maxLength={100}
                        value={this.state.contenuMessage}
                        multiline={true}
                        onChangeText={(text)=>this.setState({contenuMessage:text})}
                        returnKeyType="done"
                        blurOnSubmit={true}
                        //nEndEditing={Keyboard.dismiss()}
                        //onTouchEnd={Keyboard.dismiss()}
                        //onSubmitEditing={Keyboard.dismiss()}
                    />

                </View>

                <TouchableOpacity onPress={this.sendMessage.bind(this)} style={[mesStyles.button, { marginTop: 15, backgroundColor: '#1EB4D9' }]}>
                    <View style={{ flexDirection: 'row' }}>
                        <Icon size={22} color="black" name="send" />
                        <Text style={mesStyles.label}>Envoyer un message</Text>
                    </View>
                </TouchableOpacity>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
        )
    }

}