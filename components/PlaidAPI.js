//Npm Component for Plaid API
import * as React from "react";
import PlaidAuthenticator from "react-native-plaid-link";
import PlaidClient from "expo-plaid-link";
import { Platform, StyleSheet, Text, View, Button, Image } from "react-native";
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
class Plaid extends React.Component {
  state = {
    data: [],
    completeCheck1: false,
    success: true,
  };

  onMessage = (obj) => {
    console.log("Finally", obj);
    this.setState({ data: obj, completeCheck1: true });
    if (this.state.completeCheck1) {
      var propertyCheck = obj.metadata.hasOwnProperty("public_token");
      this.props.updateData(obj);
      console.log("prop check", propertyCheck);
      if (propertyCheck) this.onConnected();
    }
  };

  onConnected = () => {
    alert("Onconnected!");
    this.setState({ success: true });
  };
  render() {
    return this.state.success === false ? (
      <View style={{ flex: 1 }}>
        <Text>Plaid Client</Text>
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
      </View>
    );
    // return (
    //   <PlaidAuthenticator
    //     onMessage={this.onMessage}
    //     publicKey="0671672a09fd2b910e3dbdf668c079"
    //     env="development"
    //     product="transactions"
    //     clientName="Beautiful Banking"
    //     selectAccount={false}
    //   />
    // );
  }
}

export default Plaid;
