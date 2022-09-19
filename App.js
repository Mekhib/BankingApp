
import React from 'react';;
import {NavigationContainer} from '@react-navigation/native';
import Stats from './Views/Stats';
import Error from './components/error';
import Card from "./components/Card";
import Plaid from './Views/Plaid';
import {
  TouchableHighlight,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import Start from './Views/Start';
import Transactions from "./Views/Transactions"
import Success from './Views/Success';
import Locations from "./Views/Locations/"
import Balance from './Views/balance';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Home() {
 
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen
        name="Balance"
        component={Balance}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={
                 require("./assets/balanceIcon.png")
                }
                style={{height: 30, width: 30}}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={
                   require('./assets/moneyTabIcon.png')
                }
                style={{height: 40, width: 40}}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="Stats"
        component={Stats}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={
                require('./assets/statsIcon.png')
                }
                style={{height: 30, width: 30}}
              />
            );
          },
        })}
      />
      <Tab.Screen
        name="Location"
        component={Locations}
        options={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            return (
              <Image
                source={
             require('./assets/locations.png')
                }
                style={{height: 30, width: 30}}
              />
            );
          },
        })}
      />
    </Tab.Navigator>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="My Banks">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Card" component={Card} />
        <Stack.Screen name="My Banks" component={Start} />
        <Stack.Screen
          name="Login"
          component={Plaid}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="Success"
          component={Success}
          options={{headerBackVisible: false}}
        />
        <Stack.Screen
          name="Error"
          component={Error}
          options={{headerBackVisible: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
