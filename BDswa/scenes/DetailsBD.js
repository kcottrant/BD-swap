import * as firebase from 'firebase';
import React from 'react';
import { View, Image, Text, ActivityIndicator, AsyncStorage, ListView, TouchableOpacity, StyleSheet, AppRegistry, Button, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '../styles/style';
import { StackNavigator } from 'react-navigation';
import Header from '../component/header';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import mesStyles from '../styles/style';
import CheckBox from 'react-native-check-box'
import PropTypes from 'prop-types';

export default class DetailsBD extends React.Component {

    // Info TabNavigator
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        tabBarLabel = 'Détails',
            tabBarIcon = <Icon size={24} color="white" name="favorite" />
        return { tabBarLabel, tabBarIcon };
    }

    constructor(props) {
        super(props);
        var user = firebase.auth().currentUser;
        this.tasksRef = firebase.database().ref().child('users');
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };

    }

    listenForTasks(tasksRef, key) {
        var key = this.props.navigation.state.params.key;
        var titre = this.props.navigation.state.params.titre;
        var disponibilite = this.props.navigation.state.params.disponibilite;
        var image = this.props.navigation.state.params.image;
        tasksRef.orderByChild('Annonce/'+key+'/id_BD').equalTo(parseInt(key)).on('value', (dataSnapshot) => {
            var tasks = [];
            dataSnapshot.forEach((child) => {
                tasks.push({
                    etat: child.child('Annonce/'+key).val().etat,
                    echange: child.child('Annonce/'+key).val().echange,
                    keyBD: child.child('Annonce/'+key).val().id_BD,
                    description: child.child('Annonce/'+key).val().description,
                    dateAjout : child.child('Annonce/'+key).val().dateAjout,
                    commune: child.val().commune,
                    ville: child.val().ville,
                    pseudo: child.val().nomUtilisateur,
                    image: child.val().image,
                    derniereCo : child.val().derniereCo,
                    titre : titre,
                    idUser : child.key,
                    disponibilite: disponibilite,
                    imageBD : image,
                    
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
    componentWillMount(){
        this.listenForTasks(this.tasksRef);
    }
    //TODO : mettre le plus à la fin de la ligne
    _renderItem(item) {

        return (
                <TouchableOpacity disabled style={{ flex: 1,flexDirection:'row',justifyContent:'space-between', marginTop: 10, borderRadius: 20, backgroundColor: '#D7D7D7' }}>
                        <Image source={{ uri: item.image }}
                            style={{ marginLeft: 10, marginTop: 10, marginBottom: 10, width:80, height: 80 }} />
                        <View style={{ marginTop:20,flexDirection: 'column' }}>
                            <Text style={mesStyles.label15}> Pseudo: {item.pseudo}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Icon size={22} color="#F00180" name="location-on" />
                                <Text style={mesStyles.label15}> Ville: {item.ville + " " + item.commune}</Text>
                            </View>
                            <Text style={mesStyles.label15}> Etat: {item.etat}</Text>
                        </View>
                        <TouchableOpacity style={{marginTop:20,marginRight:10}} onPress={() => this.props.navigation.navigate('InfoUtilisateur', { ...item })}>
                            <Icon size={40} color="black" name="add-circle-outline" />
                        </TouchableOpacity>
                </TouchableOpacity>
        );
    }

    render() {/*
        if (this.state.dataSource.getRowCount() === 0) {
            return (
                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="black" />
                </View>
            )
        }
        else*/
        const { image, key, date, collection, editeur, format, nbPages, titre, disponibilite } = this.props.navigation.state.params;

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', backgroundColor: 'coral' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{ marginTop: 30, marginLeft: 10 }} >
                        <Icon size={32} color="black" name="backspace" />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Header nom={"Détails"} />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={{ uri: image }} style={{ marginLeft: 5, marginTop: 10, marginBottom: 10, width: 100, height: 130 }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, paddingLeft: 10, alignContent: 'center' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={mesStyles.labelPetitGris}>Date de parution</Text>
                            <Text style={mesStyles.labelPetitGris}>Editeur</Text>
                            <Text style={mesStyles.labelPetitGris}>Collection</Text>
                            <Text style={mesStyles.labelPetitGris}>Format</Text>
                            <Text style={mesStyles.labelPetitGris}>Nombre de pages</Text>
                        </View>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={mesStyles.labelPetitBlanc}>{date}</Text>
                            <Text style={mesStyles.labelPetitBlanc}>{editeur}</Text>
                            <Text style={mesStyles.labelPetitBlanc}>{collection}</Text>
                            <Text style={mesStyles.labelPetitBlanc}>{format}</Text>
                            <Text style={mesStyles.labelPetitBlanc}>{nbPages}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity disabled style={{ padding: 10, borderRadius: 20, backgroundColor: '#26CA1A' }}>
                        <Text> Disponibilités: {disponibilite}</Text>
                    </TouchableOpacity>
                    <Text style={mesStyles.label}> tris: </Text>
                    <CheckBox
                        rightText='Par état'
                        onClick={() => this.isChecked = false}
                        isChecked={true}
                    />
                    <CheckBox
                        rightText='Par date'
                        onClick={() => this.isChecked = false}
                        isChecked={false}
                    />
                </View>

                <View style={{ flex: 1 }}>
                    <ListView dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} />
                </View>
            </View>
        )
    }

}