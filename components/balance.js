import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  ImageBackground,
} from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    borderRadius: 12,
  },
  balanceContainer: {
    flexDirection: "row",
    backgroundColor: "#359ce6",
    borderRadius: 12,
    height: 220,
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
  balance: {
    marginTop: 25,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "center",
    width: 375,
  },
  rightBalanceText: {
    fontWeight: "300",
    alignSelf: "flex-start",
    fontSize: 10,
    marginLeft: 31,
    justifyContent: "flex-start",
    position: "relative",
    top: 46,
  },
  leftBalanceText: {
    fontWeight: "300",
    marginLeft: 259,
    fontSize: 10,
  },
  balanceText: {
    fontWeight: "300",
    fontSize: 15,
    marginLeft: 75,
    padding: 1,
  },
  money: {
    fontSize: 50,
    paddingRight: 3,
    color: "white",
  },
  money2: {
    alignSelf: "flex-start",
    fontSize: 30,
    paddingLeft: 10,
    position: "relative",
    top: 47,
    color: "white",
  },
  money3: {
    alignSelf: "flex-end",
    fontSize: 30,
    paddingRight: 10,
    color: "white",
  },
  accountType: {
    fontWeight: "300",
    fontSize: 10,
    fontStyle: "italic",
  },
  logoImage: {
    // height: 20,
    // resizeMode: "contain",
    width: 60,
    height: 60,
    position: "absolute",
    alignSelf: "flex-start",
    top: -28,
    zIndex: 2,
  },
  routingNumber: {
    alignSelf: "center",
    padding: 20,
    marginTop: 15,
  },
  routingTitle: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 3,
  },
  routingDigits: {
    fontSize: 20,
  },
  accountNumber: {
    alignSelf: "center",
  },
  accountTitle: {
    fontSize: 20,
    alignSelf: "center",
    marginBottom: 3,
  },
  accountDigits: {
    fontSize: 20,
  },
  phoneNumber: {
    alignSelf: "center",
    marginTop: 25,
  },
  phoneNumberText: {
    fontSize: 20,
  },
});
const image = {
  uri:
    "https://static.vecteezy.com/packs/media/components/home/masthead-vectors/img/lavakidneys_800x400@2x-2db5e5a0c944e2b16a11a18674570f76.jpg",
};
const logoImage = {
  uri:
    "https://yt3.ggpht.com/-ftL7wcuvwB0/AAAAAAAAAAI/AAAAAAAAAAA/IFOzfBDM8JI/s900-c-k-no-mo-rj-c0xffffff/photo.jpg",
};
export default Balance = (props) => (
  <ScrollView style={styles.container}>
    <View style={styles.balanceContainer}>
      <ImageBackground style={styles.image} source={image}>
        <View style={styles.balance}>
          <Image source={logoImage} style={styles.logoImage} />
          <Text style={styles.balanceText}>Available Funds:</Text>
          <Text style={styles.money}>$369.98</Text>
          <Text style={styles.accountType}>Primary Check acct.</Text>
          <Text style={styles.rightBalanceText}>Spent Yesterday:</Text>
          <Text style={[styles.money2]}>$38.94</Text>
          <Text style={styles.leftBalanceText}>Balance Yesterday:</Text>
          <Text style={[styles.money3]}>$345.98</Text>
        </View>
      </ImageBackground>
    </View>
    <View style={styles.routingNumber}>
      <Text style={styles.routingTitle}>Routing Number:</Text>
      <Text style={styles.routingDigits}>098123578905543</Text>
    </View>
    <View style={styles.accountNumber}>
      <Text style={styles.accountTitle}>Account Number:</Text>
      <Text style={styles.accountDigits}>13468765329980</Text>
    </View>
    <View style={styles.phoneNumber}>
      <Text style={styles.phoneNumberText}>Call : 1800997653</Text>
    </View>
    {/* <View>
      <Text>Account Number:</Text>
      <Text>13468765329980</Text>
    </View>
    // <View>
    //   <Text>Call : 1800997653</Text>
    // </View> */}
  </ScrollView>
);
