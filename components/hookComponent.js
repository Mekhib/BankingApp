import React, { useState, useEffect } from "react";

export function grabData() {
  const [data, updateData] = useState([]);
  useEffect(() => {
    fetch(url)
      .then((response, err) => {
        if (err) throw err;
        return response.json();
      })
      .then((responseJson) => {
        updateData(responseJson);
      });
  }, []);
}

export function grabLocationData() {
  const [data, updateData] = useState([]);
  console.log("Data!", data);
  const [location, updateLocation] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("lat", position.coords.latitude);
        console.log("lng", position.coords.longitude);
        const { latitude, longitude } = position.coords;
        updateLocation(`${latitude},${longitude}`);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&location=${location}&radius=10000&key=${apiKey}`;
    console.log("console log!!!", url);
    fetch(url)
      .then((response, err) => {
        if (err) throw err;
        return response.json();
      })
      .then((responseJson) => {
        updateData(responseJson);
      });
  }, []);
  return data;
}
