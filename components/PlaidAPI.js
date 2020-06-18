//Npm Component for Plaid API
import * as React from "react";
import PlaidAuthenticator from "react-native-plaid-link";
import PlaidClient from "expo-plaid-link";
import plaid from "plaid";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  AsyncStorage,
} from "react-native";
const style = StyleSheet.create({
  bankImage: {
    width: 150,
    height: 130,
    alignSelf: "center",
  },
  connectedText: {
    fontWeight: "200",
    alignSelf: "center",
    marginTop: 14,
  },
});

function Plaid({ navigation, route }) {
  const [success, updateSuccess] = React.useState(false);
  grabAccessToken = (publictoken, data) => {
    const plaidClient = new plaid.Client(
      "5e98c6961489d00012eddd8e",
      "33c3be97ea231084420ab96b4c45d3",
      publictoken,
      plaid.environments.sandbox,
      { version: "2019-05-29" }
    );
    plaidClient.exchangePublicToken(publictoken, function (err, apiResponse) {
      if (err) throw err;
      var accessToken = apiResponse.access_token;
      console.log(accessToken);
      var itemId = apiResponse.item_id;
      var obj = {
        ...data,
        accessToken,
        publictoken,
      };
      route.params.updateData(obj);
      this.onConnected();
    });
  };
  onMessage = (obj) => {
    console.log("Finally", obj);
    if (obj.metadata && obj.metadata.public_token) {
      var data = {
        bank: obj.metadata.institution.name,
        account: obj.metadata.account.name,
        accountType: obj.metadata.account.subtype,
      };
      this.grabAccessToken(obj.metadata.public_token, data);
    }
  };

  onConnected = () => {
    updateSuccess(true);
    console.log("connectedState", success);
  };
  return success === false ? (
    <View style={{ flex: 1 }}>
      <PlaidClient
        selectAccount="false"
        env="sandbox"
        PublicKey="0671672a09fd2b910e3dbdf668c079"
        origin="localhost"
        product="auth"
        clientName="Beautiful Banking"
        webhook="https://requestb.in"
        PlaidLinkUri="https://cdn.plaid.com/link/v2/stable/link.html"
        onMessage={this.onMessage}
        onConnected={this.onConnected}
      />
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Image
        source={{
          uri:
            "https://www.waterfordbankna.com/media/2019/10/mortgageCenter.png",
        }}
        style={style.bankImage}
      />
      <Text style={style.connectedText}>Successfully Connected!</Text>
      <Button
        onPress={() => {
          navigation.navigate("Home");
        }}
        title="Go Home"
      />
    </View>
  );
}

export default Plaid;
