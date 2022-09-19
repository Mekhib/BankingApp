import {Text, View, StyleSheet, Image, FlatList} from 'react-native';
import React from 'react';
import styles from '../Views/balance/balance.styles';

     const renderItem = ({item}) => {
      return (
        <View style={styles.row}>
          <Icon name={switchIcon(item.category[0])} size={30} />
          <View>
            <View style={styles.nameContainer}>
              <Text
                style={styles.nameTxt}
                numberOfLines={1}
                ellipsizeMode="tail">
                {item.name}
              </Text>
              <Text style={styles.mblTxt}>${item.amount}</Text>
            </View>
            <View style={styles.msgContainer}>
              <Text style={styles.msgTxt}>{item.date || 'N/A'}</Text>
              <Text style={styles.msgTxt}>{item.location.address || ''}</Text>
            </View>
          </View>
        </View>
      );
    };

    const RenderList = (props) => {
           return (
            <SafeAreaView style={{flex: 1}}>
               <FlatList
                 data={props.data}
                 renderItem={renderItem}
               />
             </SafeAreaView>
           )
             
    }

export default RenderList;
