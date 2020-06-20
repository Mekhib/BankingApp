import React, { Component } from "react";
import { useFocusEffect } from "@react-navigation/native";
import plaid from "plaid";
import moment from "moment";
import { BarIndicator } from "react-native-indicators";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  Image,
  ImageBackground,
  FlatList,
} from "react-native";
import transactions from "./transactions";
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
    marginLeft: 7,
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
    // marginLeft: 75,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
    marginBottom: 4,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 280,
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
    width: 170,
  },
  mblTxt: {
    fontWeight: "400",
    color: "green",
    fontSize: 25,
    alignSelf: "flex-end",
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  msgTxt: {
    fontWeight: "400",
    color: "#008B8B",
    fontSize: 12,
    marginLeft: 15,
  },
  depositTitle: {
    fontSize: 30,
    color: "black",
    fontWeight: "500",
    marginRight: 15,
    padding: 8,
    marginTop: 18,
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
export default Balance = ({ navigation, route }) => {
  const [data, updateData] = React.useState({});
  React.useEffect(() => {
    var bank = route.params.data();
    var { accessToken, publictoken } = bank;
    const now = moment();
    const today = now.format("YYYY-MM-DD");
    const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");
    var PlaidClient = new plaid.Client(
      "5e98c6961489d00012eddd8e",
      "33c3be97ea231084420ab96b4c45d3",
      publictoken,
      plaid.environments.sandbox,
      { version: "2019-05-29" }
    );
    PlaidClient.getBalance(accessToken, (err, res) => {
      if (err) {
        console.log("Error", err);
      }
      console.log("Balance", res);
      updateData({ balanceData: res });
    });
    GrabTransaction = () => {
      PlaidClient.getAllTransactions(
        accessToken,
        thirtyDaysAgo,
        today,
        (err, res2) => {
          if (err) {
            console.log("Error", err);
          }
          console.log("Transactions", res2);
          updateData({ ...data, transactionData: res2 });
          console.log("data!", data.transactionData);
        }
      );
    };
    setTimeout(GrabTransaction, 4000);
  }, []);
  renderItem = ({ item }) => {
    return (
      <View style={styles.row}>
        <Image
          source={{
            uri: "https://image.flaticon.com/icons/png/512/1466/1466684.png",
          }}
          style={styles.pic}
        />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <Text style={styles.mblTxt}>${item.amount}</Text>
          </View>
          <View style={styles.msgContainer}>
            <Text style={styles.msgTxt}>{item.date || "N/A"}</Text>
            <Text style={styles.msgTxt}>
              {item.location.address || "No address Avalible"}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  if (
    Object.keys(data).length &&
    data.transactionData != null &&
    Object.keys(data.transactionData).length
  ) {
    const handleFilter = (transaction) => {
      if (
        transaction.category[0] === "Deposit" ||
        transaction.category[1] === "Deposit"
      ) {
        return transaction;
      }
      if (
        transaction.category[0] === "Payment" ||
        transaction.category[1] === "Payment"
      ) {
        return transaction;
      }
    };
    const filteredData = data.transactionData.transactions.filter(handleFilter);
    console.log("filter", filteredData);
    console.log("App state", data);
    const { available, current } = data.transactionData.accounts[0].balances;
    const { name, mask, subtype } = data.transactionData.accounts[0];
    const lastTransaction = data.transactionData.transactions[0].amount;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.balanceContainer}>
          <ImageBackground style={styles.image} source={image}>
            <View style={styles.balance}>
              <Image source={logoImage} style={styles.logoImage} />
              <Text style={styles.balanceText}>Available Funds:</Text>
              <Text style={styles.money}>${available}</Text>
              <Text style={styles.accountType}>{`${name} account`}</Text>
              <Text style={styles.rightBalanceText}>Current Balance:</Text>
              <Text style={[styles.money2]}>${current}</Text>
              <Text style={styles.leftBalanceText}>Last Transaction cost:</Text>
              <Text style={[styles.money3]}>${lastTransaction}</Text>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.routingNumber}>
          <Text style={styles.routingTitle}>Account Number:</Text>
          <Text style={styles.routingDigits}>xxxx-xxxx-{mask}</Text>
        </View>
        <View style={styles.accountNumber}>
          <Text style={styles.accountTitle}>Routing Number:</Text>
          <Text style={styles.accountDigits}>031000503</Text>
        </View>
        <View style={styles.phoneNumber}>
          <Text style={styles.phoneNumberText}>Call : 1 (800) 869-3557</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.depositTitle}>Recent Deposits</Text>
        </View>
        <FlatList data={filteredData} renderItem={renderItem} />
      </ScrollView>
    );
  } else {
    return <BarIndicator color="blue" count={5}></BarIndicator>;
  }
};
