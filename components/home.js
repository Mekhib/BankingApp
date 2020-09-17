import React, { Component } from "react";
import { Platform, StyleSheet, Text, View, Button, Image } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
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
});
export default Home = ({ navigation, route }) => {
  const [banks, updateBanks] = React.useState(undefined);
  var retriveData = route.params.data.retriveBanks;
  useFocusEffect(
    React.useCallback(() => {
      if (retriveData.length != 0);
      updateBanks(retriveData);
      return () => {
        console.log("unmounted!");
      };
    }, [navigation])
  );
  var handleOnClick = (index) => {
    var passIndex = route.params.data.storeIndex(index);
    if (passIndex === true) {
      console.log("worked!");
      navigation.push("My Account");
    }
  };
  console.log("route", route);
  console.log("navigation", navigation);
  if (banks != undefined && banks.length != 0) {
    console.log("banks!", banks);
    return (
      <View
        style={{
          flex: 0.35,
          flexDirection: "column",
          // flexWrap: "nowrap",
          // alignContent: "flex-start",
          // marginTop: 0,
          // alignContent: "flex-start",
        }}
      >
        <View style={{ marginBottom: 23 }}>
          <Text>My Banks</Text>
        </View>
        {banks.map((bank, index) => {
          var imgSrc = bank.bank.replace(/\s+/g, "").concat(".com");
          console.log("accessKey", bank.accessToken);
          console.log("imgSRC!", imgSrc);
          return (
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-around",
                height: 11,
              }}
            >
              <View
                style={{
                  backgroundColor: "black",
                  height: "59%",
                  width: "1%",
                  marginLeft: 2,
                  borderRadius: 3,
                }}
              ></View>
              <View
                style={{
                  alignContent: "flex-start",
                  width: "23%",
                  height: "10%",
                }}
              >
                <Image
                  source={{
                    uri: `https://logo.clearbit.com/${imgSrc}?size=200`,
                  }}
                  style={{
                    width: 75,
                    height: 75,
                    alignContent: "flex-start",
                    marginLeft: 9,
                    borderRadius: 6,
                  }}
                />
              </View>
              <View
                style={{
                  width: "52%",
                  height: "23%",
                  justifyContent: "flex-start",
                }}
              >
                <Text
                  style={{ fontSize: "20px" }}
                >{`${bank.bank} Account`}</Text>
                <Text style={{ color: "#777", paddingTop: 2 }}>
                  {bank.accountType != null
                    ? bank.accountType
                    : `Checking/Savings`}
                </Text>
                <Text style={{ color: "#777", paddingTop: 3, fontSize: 10 }}>
                  <Icon name="clock" color="black" size={10}></Icon>
                  Last updated: Today
                </Text>
              </View>
              <View
                style={{ alignItems: "center", width: "25%", height: "55%" }}
              >
                <Icon name="trash-alt" color="red" size={50}></Icon>
              </View>
            </View>
            // <View
            //   style={{
            //     margin: 15,
            //     width: 50,
            //   }}
            // >
            //   <View
            //     style={{
            //       borderRadius: 10,
            //       overflow: "hidden",
            //       width: 300,
            //     }}
            //     onStartShouldSetResponder={() => {
            //       handleOnClick(index);
            //     }}
            //   >
            //     <View>
            //       <Image
            //         source={{
            //           uri: `https://logo.clearbit.com/${imgSrc}?size=200`,
            //         }}
            //         style={{
            //           width: 155,
            //           height: 135,
            //         }}
            //       />
            //     </View>
            //     <View style={{ padding: 10, width: 155 }}>
            //       <Text>{`${bank.bank} Account`}</Text>
            //       <Text style={{ color: "#777", paddingTop: 5 }}>
            //         {bank.accountType != null
            //           ? bank.accountType
            //           : `Checking/Savings`}
            //       </Text>
            //     </View>
            //   </View>
            // </View>
          );
        })}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri:
              "https://cdn.iconscout.com/icon/free/png-256/bank-1850789-1571030.png",
          }}
          style={{ height: 130, width: 130 }}
        />
        <Text style={{ marginTop: 13 }}>
          Add an Account to view all bank institutions.
        </Text>
        {/* production code */}
        {/* <Button
          onPress={() =>
            navigation.navigate("My Account", {
              screen: "location",
            })
          }
          title="android button"
        ></Button> */}
      </View>
    );
  }
};
