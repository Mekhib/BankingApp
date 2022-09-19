import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import React from 'react';

export default function Card(props)  {

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
         <TouchableHighlight>
           <Image
             source={{
               uri: 'https://cdn-icons-png.flaticon.com/512/1303/1303152.png',
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
     </View>
   </View>
 );
  }
   



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

