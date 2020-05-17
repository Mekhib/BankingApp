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

// const instructions = Platform.select({
//   ios: `Press Cmd+R to reload,\nCmd+D or shake for dev menu`,
//   android: `Double tap R on your keyboard to reload,\nShake or press menu button for dev menu`,
// });
//Defining Navigators
const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabStack() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Balance" component={Balance} />
      <Tab.Screen name="Transactions" component={Transactions} />
      <Tab.Screen name="Stats" component={Stats} />
      <Tab.Screen name="Locations" component={Locations} />
    </Tab.Navigator>
  );
}
class App extends React.Component {
  state = {
    data: [],
  };
  updateData = (data) => {
    this.setState({ data });
    console.log("APP STATE", this.state.data);
  };
  render() {
    return (
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen
            name="Home"
            component={Home}
            options={({ navigation }) => ({
              headerTitle: "Your Accounts",
              headerRight: () => (
                <Button
                  style={styles.addBttn}
                  onPress={() => navigation.navigate("Plaid")}
                  title="Add Account"
                  color="blue"
                />
              ),
            })}
          />
          <MainStack.Screen name="My Account" children={TabStack} />
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
