import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
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
});
export default Transactions = (props) => (
  <View style={styles.container}>
    <Text>Transactions</Text>
    <Button
      onPress={() => props.navigation.navigate("Home")}
      title="android button"
    ></Button>
  </View>
);
