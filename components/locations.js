import React, { Component, useState, useEffect } from "react";
import { Linking } from "expo";
import { BarIndicator } from "react-native-indicators";
import { useFocusEffect } from "@react-navigation/native";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
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
    marginRight: 11,
    marginLeft: 11,
    borderRadius: 6,
    marginTop: 5,
    marginBottom: 10,
    padding: 10,
    alignContent: "space-between",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  bankName: {
    fontSize: 17,
    fontWeight: "300",
    width: 350,
    // alignSelf: "center",
    flexDirection: "row",
  },
  locationImage: {
    width: 70,
    height: 60,
    borderRadius: 15,
    flexDirection: "row",
    marginLeft: 39,
  },
  bankTitle: {
    // flexDirection: "row",
    width: 100,
  },
  formattedAddress: {
    width: 250,
    fontSize: 10,
  },
  button: {
    width: 100,
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  bankDiv2: {
    flexDirection: "row",
    alignSelf: "center",
  },
  title: {
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
    fontSize: 20,
    // padding: 10,
    marginLeft: 10,
  },
  backgroundDiv: {
    backgroundColor: "white",
    borderRadius: 10,
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
        console.log("data", data.results);
      });
  }, []);
  if (loaded) {
    var photoRef = (bank) => {
      const photoRef = bank.photos[0].photo_reference;
      const apiKey = "AIzaSyD3o3hDRwSZTVhlUIDOjGQ1ZqevG6fnWII";
      var result = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${apiKey}&key=${photoRef}`;
      console.log(result);
    };
    return (
      <ScrollView style={styles.backgroundDiv}>
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
                "https://wp-plugins-directory.com/wp-content/uploads/google-maps-builder-preview.png",
            }}
          >
            <Icon name="location-arrow" color="black" size={20}>
              <Text style={styles.title}>Locations</Text>
            </Icon>
          </ImageBackground>
        </View>
        {data.results.map((bank) => {
          var { lat, lng } = bank.geometry.location;
          var isOpen = bank.opening_hours || "Closing at 5";
          // console.log(photoRef);
          return (
            <View style={styles.bankDiv}>
              <View style={styles.bankDiv2}>
                <Image
                  style={styles.locationImage}
                  source={{
                    uri:
                      "https://www.totalloyalty.com/wp-content/uploads/2017/10/AdobeStock_99990959.jpg",
                  }}
                />
                <View style={{ marginLeft: 8 }}>
                  <Text
                    style={styles.bankName}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                  >
                    {bank.permanently_closed
                      ? `${bank.name} - NON-OPERATIONAL`
                      : `${bank.name}`}
                  </Text>
                  <Text style={styles.formattedAddress}>
                    {bank.formatted_address}
                  </Text>
                  <Text style={styles.isOpen}>
                    {isOpen === true ? "Now Open" : "CLOSED"}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  } else {
    return <BarIndicator color="red" count={5}></BarIndicator>;
  }
}
