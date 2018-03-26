
import {
  StyleSheet,
  Text,
  AppRegistry,
} from 'react-native';

// Definition de styles
export default StyleSheet.create({
    
        container: {
          flex: 1, 
        },
        container3:{
          flex:1,
          flexDirection:'row'
        },
        container2: {
          padding: 20,
          alignItems: 'center',
          backgroundColor: 'coral',
        },
        flowRight: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'stretch',
          },
          searchInput: {
            height: 36,
            padding: 4,
            marginRight: 5,
            marginTop : 10,
            flexGrow: 1,
            fontSize: 18,
            borderWidth: 2,
            borderColor: '#FE2E2E',
            borderRadius: 8,
            color: 'black',
            backgroundColor : 'white',
          },
        header: {
            flexDirection:'row',
            padding : 22,
            backgroundColor: 'coral',
            justifyContent: 'center',
        },
        text: {
            fontFamily: 'Times New Roman',
            fontSize: 28,
            marginTop:10,
            alignItems: 'center',
        },
        label: {
            fontFamily: 'Avenir Next',
            fontSize: 19,
            paddingLeft:15,
            justifyContent: 'center',
        },
        label15: {
          fontFamily: 'Avenir Next',
          fontSize: 15,
      },
      label20: {
        fontFamily: 'Avenir Next',
        fontSize: 18,
    },
        labelPetitGris: {
          fontFamily: 'Avenir Next',
          fontSize: 15,
          justifyContent: 'center',
          backgroundColor:'#D3D3D3',
          borderColor:'black',
          borderWidth:0.5
      },
      labelPetitBlanc: {
        fontFamily: 'Avenir Next',
        fontSize: 15,
        paddingLeft:10,
        paddingRight:10,
        justifyContent: 'center',
        borderColor:'black',
        borderWidth:0.5
    },
        textInput: {
            height: 35,
            marginLeft : 15,
            marginTop:5,
            marginRight :15,
            fontSize: 18,
            borderWidth: 2,
            borderColor: 'grey',
            color: 'black',
          },
          button: {
            alignItems: 'center',
            backgroundColor: '#DDDDDD',
            padding: 15,
            marginTop:10,
          },
  });