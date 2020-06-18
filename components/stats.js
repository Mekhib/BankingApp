import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
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
export default Stats = (props) => (
  <View style={styles.container}>
    <Text>Stats Page</Text>
    <Button
      onPress={() => props.navigation.navigate("Home")}
      title="Stats Page"
    ></Button>
  </View>
);
