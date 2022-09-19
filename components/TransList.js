
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import styles from '../Views/balance/balance.styles';

const TransList = (props) => {

          var renderIcon = category => {
            switch (category) {
              case 'Deposit':
                return require('../assets/deposit.png');
              case 'Payment':
                return require('../assets/payment.jpg');
              case 'Travel':
                return require('../assets/travel.png');
              case 'Transer':
                return require('../assets/transfer.jpeg');
              case 'Recreation':
                return  require('../assets/recreation.png');
              case 'Food and Drink':
 return require('../assets/foodDrink.jpeg');              case 'Shops':
                return require('../assets/shops.png');
              default:
                return require('../assets/defaultMoney.png');
            }
          };

      const renderItem = ({item}) => {
        const asset = renderIcon(item.category[0]);
        return (
          <View style={styles.row}>
            <Image
              source={renderIcon(item.category[0])}
              style={styles.pic}
            />

            <View>
              <View style={styles.nameContainer}>
                <Text
                  style={styles.nameTxt}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {item.name}
                </Text>
                <Text style={styles.mblTxt}>${item.amount.toFixed(2)}</Text>
              </View>
              <View style={styles.msgContainer}>
                <Text style={styles.msgTxt}>{item.date || 'N/A'}</Text>
                <Text style={styles.msgTxt}>{item.location.address || ''}</Text>
              </View>
            </View>
          </View>
        );
      };

  return (
<FlatList data={props.transactions.data.transactions} renderItem={renderItem} />

  );
};


export default TransList;
