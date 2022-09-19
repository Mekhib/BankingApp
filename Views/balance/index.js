import React, { Component } from "react";
import { useFocusEffect } from "@react-navigation/native";
import TransList from "../../components/TransList";
import { getBalances, getTransactions, switchIcon,switchColor } from "./balance";
import { retrieveUser } from "../../api/StorageHelper";
import styles from "./balance.styles";
import {useNavigation} from '@react-navigation/native';
import ReAuth from "../ReAuth";
import {
  DotIndicator,
} from 'react-native-indicators';
import { BallIndicator } from "react-native-indicators";
import {
  Text,
  View,
  Image
} from "react-native";




export default Balance = ({}) => {
  const navigation = useNavigation();
  const [balance, updateBlance] = React.useState(false);
  const [access_token, updateToken] = React.useState(false); 
  const [transactions, updateTransactions] = React.useState(false);
  React.useEffect(() => {
    if (!access_token) {
     const access_token = retrieveUser().then((data)=>{

      updateToken(data.access_token.token)
     });
    
    }
    else {
      if(!transactions){
      
      const transactionData = getTransactions(access_token).then((res)=>{
       
        res === 'ERROR' ? updateTransactions(402) : updateTransactions(res);
      })
      }
      if(!balance) {
  const balanceData = getBalances(access_token).then(res => {

 res === 'ERROR' ? updateBalance(402) : updateBlance(res);
  });
      }
     

    }

  }, [access_token, transactions]);
  if (transactions && balance) {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={styles.container}>
          <View style={styles.balanceContainer}>
            <View style={styles.image}>
              <View style={styles.balance}>
                <View
                  style={{
                    alignContent: 'flex-start',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.balanceText}>Available Balance</Text>
                  <Text style={styles.money}>
                    $
                    {balance.data[0].balances.available
                      ? balance.data[0].balances.available
                      : balance.data[0].balances.current}
                  </Text>
                </View>
                <View style={{marginTop: 4}}>
                  <View style={styles.metaBalanceContainer}>
                    <View style={styles.metaBalance}>
                      <Text style={styles.rightBalanceText}>
                        Current Balance
                      </Text>
                      <Text style={[styles.money2]}>
                        ${balance.data[0].balances.current.toFixed(2)}
                      </Text>
                    </View>
                    <View style={styles.metaBalance2}>
                      <Text style={styles.rightBalanceText}>
                        {' '}
                        Last Transaction
                      </Text>
                      <Text style={[styles.money2]}>
                        $
                        {transactions.data?.transactions[0].amount.toFixed(2) ||
                          'N/A'}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.routingNumber}>
            <Text style={styles.routingTitle}>Account Number</Text>
            <Text style={styles.routingDigits}>
              xxxx-xxxx-{balance.data[0].mask}
            </Text>
          </View>
          <View style={{flexDirection: 'row', padding: 10}}>
            <Text style={styles.depositTitle}>Recent Transactions</Text>
          </View>
        </View>
        {transactions === 'N/A' ? (
        <View>
          <Image
            source={require('../../assets/nothingFound.png')}
            style={styles.bankImage}
          />
          <Text style={{alignSelf: "center", paddingTop: 20, fontWeight: "500"}}>No Recent Transactions</Text>    
        </View>
      
        ) : (
          <TransList transactions={transactions} />
        )}
      </View>
    );
  } 
  else if (transactions === 402) {
    return <ReAuth/>
  }
  else {
        return <BallIndicator color="black" />;
  }
};



