import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import axios from "axios"
import React from "react";
import PlaidComponent from "../components/Plaid.js";
import Error from "../components/error.js";
import Success from "./Success.js";
import {useNavigation} from '@react-navigation/native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';
  

export default Plaid = ({route }) => {
  const navigation = useNavigation();
  const [linkToken, updateLinkToken] = React.useState(false)
   const [successful, updateSuccessful] = React.useState(false);
  React.useEffect(()=>{
    if(!linkToken) {
          axios
   .get("https://aqueous-hamlet-49525.herokuapp.com/api/create_link_token")
   .then(function (response) {
    
    if(response.data.link_token) {
      updateLinkToken(response.data.link_token)
    }
   }).catch((err)=>{ if (err.code) updateLinkToken(404)});    
    }
  
  }, [linkToken])
  
  if (successful) {
    return navigation.navigate("Success")
  }

  if(linkToken && linkToken !== 404) {
return (
  <View style={styles.container}>
    <PlaidComponent linkToken={linkToken} updateSuccessful={updateSuccessful}/>
  </View>
);
  }
  else if (linkToken === 404){
  return  <Error/>
  }
  else {
    return (
      <View style={{flex: 1}}>
         <BallIndicator color='black' />
      </View>
    );
    
  }
  
};



const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "center",
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 100,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: "600"
  },
});