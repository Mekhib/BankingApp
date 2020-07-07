import React, { Component } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { BarIndicator } from "react-native-indicators";
import moment from "moment";
import { Dimensions } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import plaid from "plaid";
import { LineChart, BarChart } from "react-native-chart-kit";
import ProgressCircle from "react-native-progress-circle";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from "react-native";
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
  catView: {
    width: "33%",
    alignItems: "center",
    alignContent: "center",
    margin: 3,
    borderLeftWidth: 1,
    borderLeftColor: "black",
  },
  mostSpent: {
    fontSize: 30,
    color: "black",
    fontWeight: "500",
    marginRight: 15,
    padding: 8,
    marginTop: 18,
  },
  historyText: {
    fontStyle: "italic",
    fontSize: 13,
    fontWeight: "200",
  },
});
export default Stats = ({ route, navigation }) => {
  const [data, updateData] = React.useState(null);
  const [transactionData, updateTransactionData] = React.useState(null);
  const [history, updateHistory] = React.useState(null);
  const [lineGraphY, UpdateGy] = React.useState(null);
  const [lineGraphx, UpdateGx] = React.useState(null);
  const [loading, finishedLoading] = React.useState(true);
  const LineChartArray = (transactionData) => {
    console.log("TILC", transactionData);
    const dateFilter = (date) => {
      const handleFilter = (transaction) => {
        if (transaction.date === date) {
          return transaction;
        }
      };
      const filteredData = transactionData.filter(handleFilter);
      console.log("FDILC", filteredData);
      if (filteredData.length === 0) {
      } else {
        const returnArray = [];
        filteredData.forEach((transaction) => {
          const amount = transaction.amount;
          returnArray.push(amount);
          return returnArray;
        });
        return eval(returnArray.join("+"));
      }
    };
    const dateArray = [];
    const amountArray = [];
    transactionData.forEach((transaction) => {
      const date = transaction.date;
      dateArray.push(date);
      return dateArray;
    });
    UpdateGy([...new Set(dateArray)]);
    dateArray.forEach((date) => {
      const filterResult = dateFilter(date);
      amountArray.push(filterResult);
      return amountArray;
    });
    console.log("amount array", amountArray);
    UpdateGx(amountArray);
  };
  React.useEffect(() => {
    const grabTransaction = async () => {
      const bank = route.params.data();
      const { accessToken, publictoken } = bank;
      const now = moment();
      const today = now.format("YYYY-MM-DD");
      const thirtyDaysAgo = now.subtract(30, "days").format("YYYY-MM-DD");
      const PlaidClient = new plaid.Client(
        "5e98c6961489d00012eddd8e",
        "33c3be97ea231084420ab96b4c45d3",
        publictoken,
        plaid.environments.sandbox,
        { version: "2019-05-29" }
      );

      PlaidClient.getAllTransactions(
        accessToken,
        thirtyDaysAgo,
        today,
        (err, res) => {
          if (err) {
            console.log("Error", err);
          }
          handleFilter(res);
          updateTransactionData(res.transactions);
          historyFilter(res.transactions);
          LineChartArray(res.transactions);
        }
      );
    };

    const handleFilter = (array) => {
      console.log("working1", array);
      const mode = (arr) => {
        console.log("arr", arr);
        return arr
          .sort(
            (a, b) =>
              arr.filter((v) => v === a).length -
              arr.filter((v) => v === b).length
          )
          .pop();
      };
      const categoryArray = [];
      return new Promise((resolve, reject) => {
        console.log("loop data,", array);
        array.transactions.forEach((trans) => {
          const category = trans.category[0];
          categoryArray.push(category);
          return categoryArray;
        });
        if (categoryArray.length != 0) {
          const category = mode(categoryArray);
          const handleFilter = (transaction) => {
            if (
              transaction.category[0] === category ||
              transaction.category[1] === category
            ) {
              return transaction;
            }
          };
          const filteredData = array.transactions.filter(handleFilter);
          console.log("filtered", filteredData);
          updateData({ filteredData });
        }
        resolve();
        finishedLoading(true);
      });
    };
    const runFinal = () => {
      setTimeout(grabTransaction, 4000);
    };
    runFinal();
  }, []);
  const historyFilter = (transactionData) => {
    console.log("Trans in History", transactionData);
    const now = moment();
    let resultobj = {};
    const dailyArray = [];
    const monthlyArray = [];
    const weekArray = [];
    const today = now.format("YYYY-MM-DD");
    const forEachLoop = (loopArray, returnArray) => {
      console.log("arrayloop", loopArray);
      loopArray.forEach((transaction) => {
        const amount = transaction.amount;
        returnArray.push(amount);
        return returnArray;
      });
    };
    const dailyFilter = (transaction) => {
      if (transaction.date === today) {
        return transaction;
      }
    };
    const weekFilter = (transaction) => {
      const weekAgo = now.subtract(7, "days").format("YYYY-MM-DD");
      if (transaction.date === weekAgo) {
        return transaction;
      }
    };
    const daily = transactionData.filter(dailyFilter);
    console.log("daily", daily);
    const week = transactionData.filter(weekFilter);
    if (daily.length === 0) {
    } else {
      forEachLoop(daily, dailyArray);
    }
    if (week.length === 0) {
    } else {
      forEachLoop(week, weekArray);
    }
    forEachLoop(transactionData, monthlyArray);
    var dailyEval = eval(dailyArray.join("+"));
    var weekEval = eval(weekArray.join("+"));
    var monthlyEval = eval(monthlyArray.join("+"));
    resultobj = {
      weekEval,
      dailyEval,
      monthlyEval,
    };
    updateHistory(resultobj);
  };
  if (
    history === null ||
    transactionData === null ||
    data === null ||
    lineGraphx === null ||
    lineGraphY === null
  )
    return <BarIndicator color="black" count={5}></BarIndicator>;
  else {
    console.log("complete", lineGraphY);
    console.log("complete2", lineGraphx);
    console.log("history", history);
    console.log("transdata", transactionData);
    console.log("data1reg", data);
    var lineChartData = {
      labels: lineGraphY,
      datasets: [
        {
          data: lineGraphx,
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
          strokeWidth: 2,
        },
      ],
      legend: ["Time vs Money"],
    };
    var screenWidth = Dimensions.get("window").width;
    var chartConfig = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.5,
      useShadowColorFromDataset: false, // optional
    };
    var renderIcon = (item) => {
      switch (item) {
        case "Deposit":
          return "https://image.flaticon.com/icons/png/512/1466/1466684.png";
        case "Payment":
          return "https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/1/0/1089.12-credit-card-icon-iconbunny.jpg";
        case "Travel":
          return "https://cdn.dribbble.com/users/13395/screenshots/6455348/screen_shot_2019-05-08_at_3.32.42_pm.png";
        case "Transer":
          return "https://i1.pngguru.com/preview/39/372/879/circle-design-electronic-funds-transfer-bank-payment-online-banking-money-bank-account-wire-transfer-png-clipart.jpg";
        case "Recreation":
          return "https://cdn1.iconfinder.com/data/icons/travel-and-vacation-16/80/vector_825_27-512.png";
        case "Food and Drink":
          return "https://www.kindpng.com/picc/m/18-186872_icon-food-and-drink-hd-png-download.png";
        case "Shops":
          return "https://cdn1.iconfinder.com/data/icons/long-shadow-commerce-and-shopping-2/600/shops-shopping-market-mall-business-commerce-512.png";
        default:
          return "https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/dollar-coin-icon.png";
      }
    };
    var categoryPrice = (x) => {
      const array = [];
      x.forEach((transaction) => {
        const amount = transaction.amount;
        array.push(amount);
      });
      return eval(array.join("+"));
    };
    var percentNumber = Number(
      categoryPrice(data.filteredData) / categoryPrice(transactionData)
    ).toLocaleString(undefined, { style: "percent", minimumFractionDigits: 2 });
    var categoryColor = (x) => {
      var parse = parseFloat(x);
      var number = Math.floor(parse);

      if (number >= 0 && number <= 10) {
        return "green";
      }
      if (number >= 11 && number <= 17) {
        return "greenyellow";
      }
      if (number >= 18 && number <= 22) {
        return "orange";
      }
      if (number >= 23 && number <= 27) {
        return "orangered";
      }
      if (number >= 27 && number <= 31) {
        return "red";
      }
      if (number > 32) {
        return "darkred";
      }
    };
  }
  return (
    <ScrollView>
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
              "https://thumbs.dreamstime.com/z/business-finance-investment-banner-mobile-device-business-report-paper-graph-analyze-background-concept-55408256.jpg",
          }}
        >
          <Icon name="chart-area" color="black" size={20}>
            <Text style={styles.title}>Stats</Text>
          </Icon>
        </ImageBackground>
      </View>
      <Text style={styles.mostSpent}>Most Spent: </Text>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.catView}>
          <Image
            source={{
              uri: renderIcon(data.filteredData[0].category[0]),
            }}
            style={{ width: 110, height: 110 }}
          />
        </View>
        <View style={styles.catView}>
          <Text style={{ fontSize: 30, color: "green" }}>
            ${categoryPrice(data.filteredData)}
          </Text>
          <Text>{data.filteredData[0].category[0]}</Text>
        </View>
        <View style={styles.catView}>
          <ProgressCircle
            percent={Math.floor(
              (categoryPrice(data.filteredData) /
                categoryPrice(transactionData)) *
                100
            )}
            radius={55}
            borderWidth={8}
            color={categoryColor(percentNumber)}
            shadowColor="transparent"
            bgColor="#fff"
          >
            <Text style={{ fontSize: 18, fontWeight: "200" }}>
              {percentNumber}
            </Text>
          </ProgressCircle>
        </View>
      </View>
      <Text style={styles.mostSpent}>Spending History: </Text>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.catView}>
          <Text style={{ fontSize: 20 }}>
            {history.dailyEval != undefined ? `$${history.dailyEval}` : "$0"}
          </Text>
          <Text style={styles.historyText}>Spent Today</Text>
        </View>
        <View style={styles.catView}>
          <Text style={{ fontSize: 20 }}>
            {" "}
            {history.monthlyEval != undefined
              ? `$${history.monthlyEval}`
              : "$0"}
          </Text>
          <Text style={styles.historyText}>This Month</Text>
        </View>
        <View style={styles.catView}>
          <Text style={{ fontSize: 20 }}>
            {" "}
            {history.weekEval != undefined ? `$${history.weeklyEval}` : "$0"}
          </Text>
          <Text styles={styles.historyText}>Today last week</Text>
        </View>
      </View>
      <View>
        <LineChart
          data={lineChartData}
          width={screenWidth}
          height={670}
          chartConfig={chartConfig}
        />
      </View>
    </ScrollView>
  );
};
