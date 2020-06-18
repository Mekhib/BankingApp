import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from "react-native-cards";
import { cos } from "react-native-reanimated";
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
export default Home = ({ navigation, route }) => {
  const [banks, updateBanks] = React.useState(undefined);
  var retriveData = route.params.data.retriveBanks;
  useFocusEffect(
    React.useCallback(() => {
      if (retriveData.length != 0);
      updateBanks(retriveData);
      return () => {
        console.log("unmounted!");
      };
    }, [navigation])
  );
  var handleOnClick = (index) => {
    var passIndex = route.params.data.storeIndex(index);
    if (passIndex === true) {
      console.log("worked!");
      navigation.push("My Account");
    }
  };
  console.log("route", route);
  console.log("navigation", navigation);
  if (banks != undefined && banks.length != 0) {
    console.log("banks!", banks);
    return banks.map((bank, index) => {
      var imgSrc = bank.bank.replace(/\s+/g, "").concat(".com");
      console.log("accessKey", bank.accessToken);
      console.log("imgSRC!", imgSrc);
      return (
        <View>
          <Card isDark={true}>
            <CardImage
              source={{ uri: `https://logo.clearbit.com/${imgSrc}?size=200` }}
              title={`${bank.bank} Account`}
            />
            <CardTitle
              subtitle={
                bank.account != null
                  ? `your ${bank.account} account`
                  : `Your Bank Account`
              }
            />
            <CardContent
              text={
                bank.accountType != null ? bank.accountType : `Checking/Savings`
              }
            />
            <CardAction separator={true} inColumn={true} />
            <CardButton
              onPress={() => {
                handleOnClick(index);
              }}
              title="View"
              color="#FEB557"
            />
            <CardButton
              onPress={() => {
                alert("Feature Coming Soon!");
              }}
              title="Delete"
              color="#FEB557"
            />
          </Card>
        </View>
      );
    });
  } else {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri:
              "https://cdn.iconscout.com/icon/free/png-256/bank-1850789-1571030.png",
          }}
          style={{ height: 130, width: 130 }}
        />
        <Text>Add an Account to view all bank instituitons.</Text>
        <Button
          onPress={() =>
            navigation.navigate("My Account", {
              screen: "location",
            })
          }
          title="android button"
        ></Button>
      </View>
    );
  }
};
