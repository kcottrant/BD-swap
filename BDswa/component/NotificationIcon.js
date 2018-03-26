// NotificationIcon.js
import React from 'react';
import { Text, Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class NotificationIcon extends React.Component {

    render() {
        const { notifications } = this.props;

        // below is an example notification icon absolutely positioned 
        return (
            <View style={{
                zIndex: 0,
                flex: 1,
                alignSelf: 'stretch',
                justifyContent: 'space-around',
                alignItems: 'center'
            }}>
                {tabBarLabel = 'Mes messages'}
                {tabBarIcon = <Icon size={24} color="white" name="email" />}
                    <View style={{
                        position: absolute,
                        top: 5,
                        right: 5,
                        borderRadius: 50,
                        backgroundColor: 'red',
                        zIndex: 2
                    }}>
                        <Text>3</Text>
                    </View>
            </View>
        );
    }
}