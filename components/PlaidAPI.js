//Npm Component for Plaid API
import * as React from "react";
import PlaidAuthenticator from "react-native-plaid-link";
import PlaidClient from "expo-plaid-link";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

class Plaid extends React.Component {
  state = {
    data: [],
    complete: false,
  };

  onMessage = () => {
    // this.setState({ data });
    this.setState({ complete: true });
    alert("onMessage!");
    // if (complete) console.log(this.state.data);
    return (
      <View>
        <Text>data!{data}</Text>
      </View>
    );
  };
  onConnected = (data) => {
    alert("Onconnected!");
    // console.log("connected!", data);
  };
  render() {
    return (
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
