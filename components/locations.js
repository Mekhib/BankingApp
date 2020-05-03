import React, { Component, useState, useEffect } from "react";
import { Linking } from "expo";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "grey",
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
  bankDiv: {
    flexDirection: "row",
    alignContent: "space-between",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 3.65,
    elevation: 6,
  },
  locationImage: {
    width: 90,
    height: 80,
    borderRadius: 15,
    marginRight: 12,
  },
});

const grabLocationData = new Promise((resolve, reject) => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("lat", position.coords.latitude);
      console.log("lng", position.coords.longitude);
      const { latitude, longitude } = position.coords;
      resolve(`${latitude},${longitude}`);
    },
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
});
const location = "39.966274212776256, -75.20607905101078";
console.log("Location", location);
const query = "wells+fargo";
const apiKey = "AIzaSyD3o3hDRwSZTVhlUIDOjGQ1ZqevG6fnWII";
const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location}&radius=10000&key=${apiKey}`;
console.log("console log!!!", url);
export default function Locations() {
  openMaps = (location) => {
    const scheme = Platform.select({
      ios: "maps:0,0?q=",
      android: "geo:0,0?q=",
    });
    const latLng = location;
    const label = "Custom Label";
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };
  const [loaded, isLoaded] = useState(false);
  const [data, updateData] = useState([]);
  const apiKey = "AIzaSyD3o3hDRwSZTVhlUIDOjGQ1ZqevG6fnWII";
  const location = "39.966274212776256, -75.20607905101078";
  const query = "wells+fargo";
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location}&radius=10000&key=${apiKey}`;
  useEffect(() => {
    console.log("console log!!!", url);
    fetch(url)
      .then((response) => response.json())
      .then((responseJSON) => {
        updateData(responseJSON);
        isLoaded(true);
        console.log("data", this.state.data.results);
      });
  }, []);
  if (loaded) {
    return (
      <ScrollView>
        {data.results.map((bank) => {
          var { lat, lng } = bank.geometry.location;
          return (
            <View style={styles.bankDiv}>
              <Text>Locations</Text>
              <Image
                source={{
                  uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${bank.photos[0].photo_reference}&key=${apiKey}`,
                }}
              />
              <Text>{bank.name}</Text>
              <Text>{bank.formatted_address}</Text>
              <Text>CLOSED</Text>
              <Button
                title="Go"
                onPress={() => this.openMaps(`${lat},${lng}`)}
              />
            </View>
          );
        })}
      </ScrollView>
    );
  } else {
    return (
      <View>
        <Text>Loading locations</Text>
      </View>
    );
  }
}
