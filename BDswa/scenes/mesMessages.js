import * as firebase from 'firebase';
import React from 'react';
import { View, Text, ListView, AsyncStorage, TouchableOpacity, StyleSheet, AppRegistry, Button, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import style from '../styles/style';
import { StackNavigator } from 'react-navigation';
import Header from '../component/header';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';
import IconBadge from 'react-native-icon-badge';
import TabNavigator from '../routes/tabNavigator';

export default class Deconnexion extends React.Component {

    // Info TabNavigator
    //static navigationOptions = ({ navigation}) => {
    //const { params = {} } = navigation.state;
    //tabBarLabel = 'Mes messages';
    // tabBarIcon = <Icon size={24} color="white" name="email" />
    //iconStyle: { width: 70 }

    // navigation.screenProps={ unreadMessagesCount: 8 }
    //return  <TabNavigator screenProps={{unreadMessagesCount: 8 }}/>;
    // }
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }), userIdentifiant: '', pseudo: '',
        };

    }

    componentWillMount() {
        var acces = this;
        var userID = '';
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                userID = firebase.auth().currentUser.uid;
                acces.setState({ userIdentifiant: userID });
                var tasksRef = firebase.database().ref('users/' + userID + '/Messages');
                acces.listenForTasks(tasksRef, userID);
            } else {
                acces.setState({ userIdentifiant: '' })
                console.log('Vous n\'êtes pas connecté');
            }
        });
    }
    supressionFavoris(userID, itemKey) {
        firebase.database().ref('users/' + userID + '/Messages/' + itemKey).remove();
    }
    listenForTasks(tasksRef, userID) {

        tasksRef.orderByChild('reception').equalTo(true).on('value', (dataSnapshot) => {
            var tasks = [];
            var gras='normal';
            dataSnapshot.forEach((child) => {
                firebase.database().ref('users/' + child.val().emmeteur + '/nomUtilisateur').on("value", snapshot => {
                    this.setState({ pseudo: snapshot.val() })
                })
                if(child.val().nonlu)
                    {gras='bold'}
                tasks.push({
                    contenu: child.val().contenu,
                    objet: child.val().objet,
                    key: child.key,
                    emmeteur : child.val().emmeteur,
                    nonlu: child.val().nonlu,
                    date: child.val().date,
                    bold:gras,
                });
            });
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(tasks)
            });
        });
    }

    _renderItem(item) {
        console.log(item.bold)
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <View>
                        <TouchableOpacity onPress={() =>  this.props.navigation.navigate('Discussions',{...item})} style={{ padding: 10}}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                                <Text style={{ fontFamily: 'Avenir Next', fontSize: 19, fontWeight: 'bold' }}>{this.state.pseudo}</Text>
                                <View style={{flexDirection:'row',marginTop:6}}>
                                    <Text style={{fontFamily: 'Courier New', fontSize: 13, fontWeight: 'bold' }}>Reçu le:</Text>
                                    <Text style={{fontFamily: 'Courier New', fontSize: 13}}>{item.date}</Text>
                                </View>
                                <Icon size={30} color="black" name="arrow-forward" />
                            </View>
                            <Text style={{ textDecorationLine: 'underline', fontFamily: 'Courier New', fontSize: 15 }}>Objet : {item.objet}</Text>
                            <Text numberOfLines={2} style={{ fontWeight:item.bold,fontFamily: 'Avenir Next', fontSize: 14 }}>{item.contenu}</Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity onPress={this.supressionFavoris.bind(this, this.state.userIdentifiant, item.key)} style={{ padding: 10, marginTop: 5, borderWidth: 2, borderColor: 'black', height: 35, width: 130, borderRadius: 20, alignSelf: 'flex-start' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Icon size={20} color="black" name="delete" />
                                        <Text> Supprimer </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
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
        if (this.state.userIdentifiant === '') {
            return (
                <View style={{ flex: 1 }}>
                    <Header nom="Mes messages" />
                </View>
            )
        }
        else
            return (
                <View>
                    <Header nom="Mes messages" />
                    <ListView backgroundColor='floralwhite' enableEmptySections={true} dataSource={this.state.dataSource} renderRow={this._renderItem.bind(this)} />
                </View>

            )


    }

}