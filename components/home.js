import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
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
export default Home = (props) => (
  <View style={styles.container}>
    <Text>Hello World</Text>
    <Button
      onPress={() => props.navigation.navigate("My Account")}
      title="android button"
    ></Button>
  </View>
);
