import React from 'react';
import { retrieveUser, clearStorage } from '../api/StorageHelper';
import Card from '../components/Card';
import Plaid from './Plaid';
import {TouchableHighlight, TouchableOpacity, View, Text, StyleSheet, Image, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';




export default Start = ({route}) => {
  const navigation = useNavigation();
  const [user, updateUser] = React.useState(false);
   const [reloadView, updateReload] = React.useState(false);
  const logOut = () => {
    clearStorage()
    updateUser(false)
  }
  const reload = () => {
      updateReload(!reloadView)
  }
  React.useEffect(() => {
    if (!user) {
      retrieveUser().then(res => {
       
        res.access_token
          ? updateUser({
              access_token: res.access_token.token,
              bank:
                res.bankName === 'Navy Federal Credit Union'
                  ? 'Navy Federal'
                  : res.bankName,
            })
          : navigation.navigate('Login');
      });
     
    } 
  }, [user, reloadView]);

  if(user){
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: '#eee',
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <TouchableHighlight
              onPress={() => {
                navigation.navigate('Home');
              }}>
              <Image
                source={{
                  uri:
                    `https://logo.clearbit.com/${user.bank.replace(
                      /\s/g,
                      '',
                    )}.com?size=500` ||
                    'https://cdn-icons-png.flaticon.com/512/1303/1303152.png',
                }}
                style={{
                  height: 135,
                  width: 155,
                  resizeMode: 'contain',
                }}
              />
            </TouchableHighlight>
            <View style={{padding: 10, width: 155, backgroundColor: '#e1ecf4'}}>
              <Text
                style={{
                  color: 'black',
                  paddingTop: 5,
                  fontSize: 20,
                  fontWeight: '600',
                }}>
                {user.bank}
              </Text>
            </View>
            <View
              style={{
                paddingBottom: 10,
                paddingLeft: 10,
                width: 155,
                backgroundColor: '#e1ecf4',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  fontWeight: '300',
                }}>
                Checking/Savings
              </Text>
            </View>
          </View>
          <View style={{padding: 20}}>
            <Button onPress={() => logOut()} title="Sign Out"></Button>
          </View>
        </View>
      </View>
    );
   
  }
else {
  return (
    <View style={{flex: 1, alignContent: "center", justifyContent: "center", alignItems: "center"}}>
      <Button onPress={()=>{reload()}} title="Click To Reload Banks"></Button>
    </View>
  ); 
}
  
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,

    alignContent: 'center',

    alignSelf: 'center',
  },
});