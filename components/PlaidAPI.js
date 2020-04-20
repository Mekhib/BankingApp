//Npm Component for Plaid API
import * as React from "react";
import PlaidAuthenticator from "react-native-plaid-link";
import { Platform, StyleSheet, Text, View, Button } from "react-native";

class Plaid extends React.Component {
  state = {
    data: [],
  };
  onMessage = (data) => {
    console.log("ran!", data);
    this.setState({ data });
    return (
      <View>
        <Text>data!{data}</Text>
      </View>
    );
  };
  render() {
    return (
      <PlaidAuthenticator
        onMessage={this.onMessage}
        publicKey="0671672a09fd2b910e3dbdf668c079"
        env="sandbox"
        product="auth"
        clientName="Beautiful Banking"
        selectAccount={false}
      />
    );
  }
}

export default Plaid;
