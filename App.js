import "react-native-gesture-handler";
import * as React from "react";
import { Platform, StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Balance from "./components/balance";
import Transactions from "./components/transactions";
import Stats from "./components/stats";
import Locations from "./components/locations";
import Home from "./components/home";
import Plaid from "./components/PlaidAPI";
import { obj, updateObj } from "./components/updVar";

//Defining Navigators
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();
class App extends React.Component {
  state = {
    data: [
      {
        accessToken: "access-sandbox-d83744df-48fe-4559-958f-ddf4a4727000",
        account: null,
        bank: "Wells Fargo",
        publictoken: "public-sandbox-ac40216d-1cd1-451b-a7d3-c7c1b97b0ab6",
      },
    ],
    complete: false,
    bankSelection: [],
  };
  TabStack = () => {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "blue",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Balance"
          component={Balance}
          initialParams={{ data: this.fetchBankinfo }}
        />
        <Tab.Screen name="Transactions" component={Transactions} />
        <Tab.Screen name="Stats" component={Stats} />
        <Tab.Screen name="Locations" component={Locations} />
      </Tab.Navigator>
    );
  };
  fetchBankinfo = () => {
    if (this.state.bankSelection.length != 0) {
      return this.state.bankSelection;
    } else {
      return "404";
    }
  };
  updateData = (data) => {
    this.setState({ data: [...this.state.data, data], complete: true });
    console.log("APP STATE", this.state.data);
    if (this.state.data != []) {
      console.log("IF IS TRUE");
      return true;
    } else {
      return false;
    }
  };
  storeIndex = (index) => {
    var indexResult = this.state.data[index];
    this.setState({ bankSelection: indexResult });
    return true;
  };
  retriveBanks = () => {
    return this.state.data;
  };
  render() {
    return (
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen
            initialParams={{
              data: {
                retriveBanks: this.retriveBanks,
                storeIndex: this.storeIndex,
              },
            }}
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerTitle: "Home",
              headerRight: () => (
                <Button
                  style={styles.addBttn}
                  onPress={() =>
                    navigation.navigate("Plaid", {
                      updateData: this.updateData,
                    })
                  }
                  title="Add Account"
                  color="blue"
                />
              ),
            })}
          />
          <MainStack.Screen name="My Account" children={this.TabStack} />
          <MainStack.Screen name="Plaid">
            {(props) => <Plaid {...props} updateData={this.updateData} />}
          </MainStack.Screen>
        </MainStack.Navigator>
      </NavigationContainer>
      // <View style={styles.container}>
      //   <Text>Hello World</Text>
      //   <Button
      //     onPress={() => alert("clicked!")}
      //     title="android button"
      //   ></Button>
      // </View>
    );
  }
}

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
  addBttn: {
    borderRadius: 0,
    marginRight: 23,
  },
});
export default App;
