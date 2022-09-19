import { getAllTransactions, renderIcon, switchIcon,switchColor, biggestPurchase,categoryArray, categoryPercent } from "./transactions";
import { retrieveUser } from "../../api/StorageHelper";
import React, { Component } from "react";
import chartConfigs from "../Stats/chartsConfig";
import TransList from "../../components/TransList";
import styles from "./transactions.styles";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  FlatList,
  ScrollView,
  SafeAreaView,
  Image,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
// import { ScrollView } from "react-native-gesture-handler";

const Transactions = ({ route, navigation }) => {
const [transactions, updateTransactions] = React.useState(null);
const [totalByCat, updateCatTotal] = React.useState(null);
const [access_token, updateToken] = React.useState(false); 
const [percentByCat, updatePercentByCat] = React.useState(false);
  
React.useEffect(() => {
    if (!access_token) {
     const access_token = retrieveUser().then((data)=>{
      updateToken(data.access_token.token)
     });
    }
    else {
          if (!transactions) {
            const transactionData = getAllTransactions(access_token).then(
              res => {
                updateTransactions(res);
              },
            );
          }
          else {
       
              if(totalByCat){
                if(!percentByCat) {
                const percentscore =  categoryPercent(totalByCat);
                const percentscoreObj = percentscore[(percentscore.length) - 1]
                const percentages = Object.values(percentscoreObj)
                updatePercentByCat({percentscore, percentages})
                }
              
              } 
              else {
                const cats = categoryArray(transactions.data.transactions);
                if(cats) updateCatTotal(cats);

              }
                // const purchase = biggestPurchase(transactions.data.transactions);
          }
    }

  }, [access_token, transactions, totalByCat,percentByCat]);


  if (!transactions) {

    // return <BarIndicator color="green" count={5}></BarIndicator>;
    return  <BallIndicator color='black' />
  } else {
    
    return (
      <View style={{backgroundColor: '#fff', flex: 1}}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ImageBackground
            style={{
              width: 550,
              height: 60,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            source={
               require("../../assets/transBanner.jpg")
            }>
            <Text style={styles.title}>Transactions</Text>
          </ImageBackground>
        </View>
        <TransList transactions={transactions} />
      </View>
    );
  }
};

export default  Transactions