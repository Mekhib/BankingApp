import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Image } from "react-native";
import { grabLocationData } from "./hookComponent";
import { ScrollView } from "react-native-gesture-handler";
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
  bankDiv: {
    flexDirection: "row",
    alignContent: "space-between",
  },
  locationImage: {
    width: 90,
    height: 80,
    borderRadius: 15,
    marginRight: 12,
  },
});
export default Locations = (props) => {
  const apiKey = "AIzaSyD3o3hDRwSZTVhlUIDOjGQ1ZqevG6fnWII";
  const data = grabLocationData();
  console.log(data);
  return (
    <ScrollView>
      {data.results.map((bank) => {
        return <View>{bank.name}</View>;
      })}
    </ScrollView>
  );
};
