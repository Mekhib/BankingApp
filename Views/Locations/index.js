import React, {Component, useState, useEffect} from 'react';
import { getLocation, makeURL, goToMaps } from "./locations";
import {retrieveUser} from '../../api/StorageHelper';
import AlertBox from "../../components/Dialog"
import styles from './locations.style';
// import {Linking} from 'expo';
// import {BarIndicator} from 'react-native-indicators';
import {
  Platform,
  StyleSheet,
  Text,
  Pressable,
  View,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';


export default function Locations({navigation, route}) {
  const [longLat, updateLongLat] = useState(undefined);
  const [data, updateData] = useState(undefined);
  const [bankName, updateBank] = useState(undefined);
  React.useEffect(() => {
    if (!bankName) {
      const getBankName = retrieveUser().then(data => {
       
        updateBank(data.bankName);
      });
    }
    if (!longLat) {
      const getLongLat = getLocation().then(coors => {
       
        coors === 404 ? updateLongLat(404) : updateLongLat(coors);
      });
    } else {
      if(!data){
       const url = makeURL(longLat, bankName);
    
      fetch(url)
        .then(response => response.json())
        .then(responseJSON => {
         
          updateData(responseJSON);
         
        });   
      }
    
    }
  }, [bankName, longLat, data]);

if (data){
 return (
   <ScrollView style={styles.backgroundDiv}>
     <View
       onPress={() => {
         goToMaps(longLat);
       }}
       style={{
         alignItems: 'center',
         marginBottom: 12,
         justifyContent: 'center',
       }}>
       <ImageBackground
         style={{
           width: 550,
           height: 60,
           justifyContent: 'center',
           alignItems: 'center',
         }}
         source={
           require('../../assets/locationsBanner.png')
         }>
         <Text style={{fontSize: 20, fontWeight: '500'}}>Locations</Text>
       </ImageBackground>
     </View>
     {data.results.map(bank => {
   
       var isOpen = bank.opening_hours?.open_now || 'Closing at 5';
       return (
         <View style={styles.bankDiv} key={bank.reference}>
           <Pressable
             onPress={() => {
               goToMaps(
                 `${bank.geometry.location.lat}, ${bank.geometry.location.lng} `,
                 bank.name,
               );
             }}
             style={styles.bankDiv2}>
             <Image
               style={styles.locationImage}
               source={
               require('../../assets/locationThumbnail.png')
               }
             />
             <View>
               <Text
                 style={styles.bankName}
                 ellipsizeMode="tail"
                 numberOfLines={1}>
                 {bank.permanently_closed
                   ? `${bank.name} - NON-OPERATIONAL`
                   : `${bank.name}`}
               </Text>
               <Text style={styles.formattedAddress}>
                 {bank.formatted_address}
               </Text>
               <Text style={styles.isOpen}>
                 {isOpen === true ? 'Now Open' : 'CLOSED'}
               </Text>
             </View>
           </Pressable>
         </View>
       );
     })}
   </ScrollView>
 );
}
 
}
