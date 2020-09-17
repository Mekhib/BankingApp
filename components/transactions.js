import React, { Component } from "react";
import { BarIndicator } from "react-native-indicators";
import plaid from "plaid";
import moment from "moment";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useFocusEffect } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
  },
  title: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    fontSize: 20,
    marginLeft: 30,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
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
    width: 250,
    alignContent: "center",
  },
  mblTxt: {
    fontWeight: "300",
    color: "black",
    fontSize: 20,
    alignContent: "flex-end",
    flexDirection: "row-reverse",
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
});
export default Transactions = ({ route, navigation }) => {
  const [data, updateData] = React.useState(null);
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
    GrabTransaction = () => {
      PlaidClient.getAllTransactions(
        accessToken,
        thirtyDaysAgo,
        today,
        (err, res) => {
          if (err) {
            console.log("Error", err);
          }
          updateData(res.transactions);
          console.log("transactions", res);
        }
      );
    };
    setTimeout(GrabTransaction, 4000);
  }, []);

  renderItem = ({ item }) => {
    var renderIcon = (item) => {
      console.log("itme!", item);
      var catagorey = item.category[0];
      switch (catagorey) {
        case "Deposit":
          return "https://image.flaticon.com/icons/png/512/1466/1466684.png";
        case "Payment":
          return "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/1/0/1089.12-credit-card-icon-iconbunny.jpg";
        case "Travel":
          return "https://cdn.dribbble.com/users/13395/screenshots/6455348/screen_shot_2019-05-08_at_3.32.42_pm.png";
        case "Transer":
          return "https://i1.pngguru.com/preview/39/372/879/circle-design-electronic-funds-transfer-bank-payment-online-banking-money-bank-account-wire-transfer-png-clipart.jpg";
        case "Recreation":
          return "https://cdn1.iconfinder.com/data/icons/travel-and-vacation-16/80/vector_825_27-512.png";
        case "Food and Drink":
          return "https://www.kindpng.com/picc/m/18-186872_icon-food-and-drink-hd-png-download.png";
        case "Shops":
          return "https://cdn1.iconfinder.com/data/icons/long-shadow-commerce-and-shopping-2/600/shops-shopping-market-mall-business-commerce-512.png";
        default:
          return "https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/dollar-coin-icon.png";
      }
    };
    return (
      <View style={styles.row}>
        <Image
          source={{
            uri: renderIcon(item),
          }}
          style={styles.pic}
        />
        <View>
          <View style={styles.nameContainer}>
            <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">
              {item.name}
            </Text>
            <View>
              <Text style={styles.mblTxt}>${item.amount}</Text>
            </View>
          </View>
          <View style={styles.msgContainer}>
            <Text style={styles.msgTxt}>{item.date || "date N/A"}</Text>
            <Text style={styles.msgTxt}>
              {item.location.address || "No address Avalible"}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  if (data === null) {
    return <BarIndicator color="green" count={5}></BarIndicator>;
  } else {
    return (
      <ScrollView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <ImageBackground
            style={{
              width: 550,
              height: 60,
              justifyContent: "center",
              alignItems: "center",
            }}
            source={{
              uri:
                "https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-money-flat-cartoon-business-banner-poster-image_183478.jpg",
            }}
          >
            <Icon name="money-bill" color="black" size={20}>
              <Text style={styles.title}>Transactions</Text>
            </Icon>
          </ImageBackground>
        </View>
        <FlatList data={data} renderItem={renderItem} />
      </ScrollView>
    );
  }
};
