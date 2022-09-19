//Npm Component for Plaid API
import * as React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {clearStorage} from '../api/StorageHelper';

function ReAuth() {
const navigation = useNavigation();
React.useEffect(()=>{
    clearStorage()
})
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image source={require('../assets/error.jpeg')} style={style.bankImage} />
      <View style={{flex: 1, alignContent: 'center', alignSelf: 'center'}}>
        <Text
          style={{
            alignContent: 'center',
            alignSelf: 'center',
            marginTop: 10,
            fontWeight: 'bold',
            fontSize: 20,
          }}>
          Re-Authorization Required
        </Text>
        <Text
          style={{marginTop: 9, alignContent: 'center', alignSelf: 'center'}}>
          You May Need to Login Again
        </Text>
      </View>
      <View style={{marginBottom: 75}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('My Banks')}
          style={style.button}>
          <Text style={style.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ReAuth;

const style = StyleSheet.create({
  bankImage: {
    width: 390,
    height: 300,
    alignSelf: 'center',
    marginTop: 20,
  },
  connectedText: {
    fontWeight: '200',
    alignSelf: 'center',
    marginTop: 14,
  },

  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: '600',
  },
});
