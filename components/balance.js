import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
} from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  balanceContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 12,
    height: 200,
    marginTop: 25,
    width: 375,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  balance: {},
  rightBalance: {
    width: 190,
    textAlign: "center",
    alignContent: "center",
    alignSelf: "flex-start",
    paddingLeft: 23,
  },
  rightBalanceText: {
    fontSize: 18,
    marginBottom: 12,
  },
  leftBalanceText: {},
});
export default Balance = (props) => (
  <ScrollView style={styles.container}>
    <View style={styles.balanceContainer}>
      <View style={styles.balance}>
        <Text style={styles.leftBalanceText}>Available Funds:</Text>
        <Text style={styles.leftBalanceText}>$369.98</Text>
      </View>
      <View style={styles.rightBalance}>
        <Text style={styles.rightBalanceText}>Spent Yesterday:</Text>
        <Text style={styles.rightBalanceText}>$38.94</Text>
        <Text style={styles.rightBalanceText}>Balance Yesterday:</Text>
        <Text style={styles.rightBalanceText}>$345.98</Text>
      </View>
    </View>
    <View>
      <Text>Routing Number:</Text>
      <Text>098123578905543</Text>
    </View>
    <View>
      <Text>Account Number:</Text>
      <Text>13468765329980</Text>
    </View>
    <View>
      <Text>Call : 1800997653</Text>
    </View>
  </ScrollView>
);
