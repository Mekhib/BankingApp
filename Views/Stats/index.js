import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  FlatList,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import {
  BallIndicator,
} from 'react-native-indicators';
import {
  categoryArray,
  categoryPercent,
  transTotalsByDay,
  makeLabel,
  transactionsByDay,
  categoryArrayNoKey,
  biggestPurchase,
  avgDeposits,
  allDepositsTotal,
  allTransactionsTotal,
} from '../Transactions/transactions';
import {getTransactions, getAllTransactions} from '../balance/balance';
import styles from './stats.style';
import React from 'react';
import {retrieveUser} from '../../api/StorageHelper';
const Stats = ({navigation, route}) => {
  const [transactions, updateTransactions] = React.useState(null);
   const [allTransactions, updateAllTransactions] = React.useState(null);
  const [access_token, updateToken] = React.useState(false);
  const [sortData, setSortData] = React.useState(undefined)
  const screenWidth = Dimensions.get('window').width;
  React.useEffect(() => {
    if (!access_token) {
      const access_token = retrieveUser().then(data => {
        updateToken(data.access_token.token);
      });
    } else {
      if (!transactions || !allTransactions) {
        const transactionData = getTransactions(access_token).then(res => {
          updateTransactions(res);
        }); 
          const  allTransactionData = getAllTransactions(access_token).then(res => {
            updateAllTransactions(res);
          });
      } else {
        if(!sortData && transactions != "N/A"){
        const avgDeposit = avgDeposits(transactions.data.transactions);
        const transactionTotal = allTransactionsTotal(transactions.data.transactions);
        const depositTotals = allDepositsTotal(transactions.data.transactions);
        const categoryTotal = categoryArray(transactions.data.transactions);  
        const categoryTotalNoTotalKey = categoryArrayNoKey(transactions.data.transactions); 
        const AllCategoryTotalNoTotalKey = categoryArrayNoKey(
          allTransactions.data.transactions,
        ); 
        const allTransactionsByDay = transactionsByDay(allTransactions.data.transactions)
        const allTransactionsByDayValues = Object.values(allTransactionsByDay)
        const allCatByDayArray = Object.values(AllCategoryTotalNoTotalKey);
        const catByDayArray = Object.values(categoryTotalNoTotalKey);
        const catByDayArrayKeys = Object.keys(categoryTotalNoTotalKey);
         const AllCatByDayArrayKeys = Object.keys(AllCategoryTotalNoTotalKey);
        const percentscore = categoryPercent(categoryTotal); 
        const percentscoreObj = percentscore[percentscore.length - 1];
        const percentages = Object.values(percentscoreObj); 
        const percentagesKeys = Object.keys(percentscoreObj); 
        const transByDay = transTotalsByDay(transactions.data.transactions);
        const transByDayArray = Object.values(transByDay);
        const avgTransCost = transByDayArray > 0 ?
        transByDayArray.reduce((a, b) => a + b) / transByDayArray.length : 0
        const transByDayKeys = Object.keys(transByDay);
        const transLabel = makeLabel(transByDayKeys); 
        const getBiggestPurchase = biggestPurchase(
          transactions.data.transactions,
        );
        const resultObj = {
          categoryTotal: categoryTotal,
          transLabel: transLabel,
          percentscore: percentscore,
          AllCatByDayArrayKeys: AllCatByDayArrayKeys,
          percentages: percentages,
          transByDayArray: transByDayArray,
          transLabel: transLabel,
          AllCatByDayArray: allCatByDayArray,
          catByDayArray: catByDayArray,
          transactionTotal: transactionTotal,
          percentagesKeys: percentagesKeys,
          allTransactionsByDayValues: allTransactionsByDayValues,
          catByDayArrayKeys: catByDayArrayKeys,
          biggestPurchase: getBiggestPurchase,
          avgTransCost: avgTransCost,
          depositTotals: depositTotals,
          avgDeposit: avgDeposit,
        };
        setSortData(resultObj);
        }
    }
  } 
  }, [sortData, access_token, transactions]);

  if (sortData && transactions != "N/A") {
    return (
      <ScrollView style={{flex: 1, padding: 10}}>
        <View
          style={{
            alignContent: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text style={styles.balanceText}>Total Deposits This Week:</Text>
          <Text style={styles.money}>${sortData.depositTotals.toFixed(2)}</Text>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            width: 200,
            alignSelf: 'center',
          }}
        />
        <View
          style={{
            alignContent: 'flex-start',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
          }}>
          <Text style={styles.balanceText}>Total Spent This Week:</Text>
          <Text style={styles.money2}>
            ${sortData.transactionTotal.toFixed(2)}
          </Text>
        </View>
        <View style={styles.factsView}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/moneyIcon.png')}
                style={styles.pic}
              />
              <Text style={{padding: 5, fontSize: 18, fontWeight: '400'}}>
                Biggest Purchase:
              </Text>
              <Text style={{fontWeight: '600'}}>
                ${sortData.biggestPurchase.amount.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={{margin: 10}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/secondMoneyIcon.png')}
                style={styles.pic}
              />
              <Text style={{padding: 5, fontSize: 18, fontWeight: '400'}}>
                Average Deposit:
              </Text>
              <Text style={{fontWeight: '600'}}>
                ${sortData.avgDeposit.toFixed(2)}
              </Text>
            </View>
          </View>
          <View style={{margin: 1}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                source={require('../../assets/transferIcon.png')}
                style={styles.pic}
              />
              <Text style={{padding: 5, fontSize: 18, fontWeight: '400'}}>
                Average Transaction:
              </Text>
              <Text style={{fontWeight: '600'}}>
                ${sortData.avgTransCost.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.chartView}>
            <View style={styles.centerText}>
              <Text style={styles.title}>Spending By Category</Text>
              <Text style={{fontSize: 10}}>(Weekly)</Text>
            </View>
            <ProgressChart
              data={{
                data: sortData.percentages,
                labels: sortData.percentagesKeys,
                colors: [
                  'black',
                  '#554994',
                  '#AC7088',
                  '#73A9AD',
                  '#F9CEEE',
                  '#E6BA95',
                  '#525E75',
                ],
              }}
              height={200}
              width={screenWidth - 60}
              strokeWidth={9}
              radius={9}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: 'white',
                backgroundGradientToOpacity: 0.0,
                color: (opacity = 4) => `rgba(10,10,10, ${opacity})`,
                useShadowColorFromDataset: false,
              }}
              withCustomBarColorFromData={true}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
              hideLegend={false}
            />
          </View>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.barChartView}>
            <View style={styles.centerText}>
              <Text style={styles.title}>Daily Spending</Text>
              <Text style={{fontSize: 10}}>(Weekly)</Text>
            </View>
            <BarChart
              data={{
                labels: sortData.transLabel,
                datasets: [
                  {
                    data: sortData.transByDayArray,
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                    colors: [
                      (opacity = 1) => `#088F8F`,
                      (opacity = 1) => `#088F8F`,
                      (opacity = 1) => `#088F8F`,
                      (opacity = 1) => `#088F8F`,
                      (opacity = 1) => `#088F8F`,
                      (opacity = 1) => `#088F8F`,
                      (opacity = 1) => `#088F8F`,
                    ],
                    strokeWidth: 2, // optional
                  },
                ],
                legend: ['Rainy Days'],
              }}
              width={screenWidth - 40}
              height={350}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientToOpacity: 0.0,
                color: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                strokeWidth: 2,
                useShadowColorFromDataset: false,
                backgroundGradientFrom: '#Ffffff',
                backgroundGradientTo: '#ffffff',
                padding: 30,
              }}
              style={{
                paddingRight: 70,
              }}
              verticalLabelRotation={30}
              horizontalLabelRotation={0}
              fromZero={true}
              withOuterLines={false}
              withInnerLines={false}
              withCustomBarColorFromData={true}
              flatColor={false}
              showBarTops={false}
              showValuesOnTopOfBars={true}
            />
          </View>
        </View>
        <View style={styles.chartContainer}>
          <View style={styles.chartView}>
            <View style={styles.centerText}>
              <Text style={styles.title}>Spent By Category:</Text>
              <Text style={{fontSize: 10}}>(Weekly / All-Time)</Text>
            </View>
            <StackedBarChart
              data={{
                labels: ['Weekly', 'All-Time'],
                legend: sortData.AllCatByDayArrayKeys,
                data: [sortData.catByDayArray, sortData.AllCatByDayArray],
                barColors: [
                  'black',
                  '#554994',
                  '#AC7088',
                  '#73A9AD',
                  '#F9CEEE',
                  '#E6BA95',
                  '#525E75',
                ],
              }}
              width={screenWidth - 80}
              height={250}
              chartConfig={{
                backgroundColor: 'white',
                backgroundGradientToOpacity: 0.0,
                color: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                useShadowColorFromDataset: false,
                backgroundGradientFrom: '#Ffffff',
                backgroundGradientTo: '#ffffff',
              }}
              withVerticalLabels={true}
              withHorizontalLabels={true}
              yAxisLabel="$"
            />
          </View>
          <View style={styles.graphChartContainer}>
            <View style={styles.graphChartView}>
              <View style={{...styles.centerText, paddingBottom: 15}}>
                <Text style={styles.title}>Daily Spending Graph</Text>
              </View>
              <LineChart
                data={{
                  labels: [
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                  ],
                  datasets: [
                    {
                      data: sortData.allTransactionsByDayValues,
                      color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                      strokeWidth: 2, // optional
                    },
                  ],
                }}
                width={screenWidth - 60}
                height={220}
                chartConfig={{
                  backgroundColor: 'white',
                  backgroundGradientToOpacity: 0.0,
                  color: (opacity = 0) => `rgba(0,0,0, ${opacity})`,
                  useShadowColorFromDataset: false,
                  backgroundGradientFrom: '#Ffffff',
                  backgroundGradientTo: '#ffffff',
                }}
                withVerticalLabels={false}
                fromZero={true}
                bezier
                yAxisLabel="$"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
  else if (transactions === "N/A" || allTransactions === "N/A"){
    return (
      <View>
        <Image
          source={require('../../assets/nothingStats.png')}
          style={styles.bankImage}
        />
        <Text style={{alignSelf: 'center', paddingTop: 20, fontWeight: '500'}}>
          No Recent Transactions
        </Text>
        <Text style={{alignSelf: 'center',textAlign: "center", paddingHorizontal: 20, paddingVertical: 10, fontWeight: '300'}}>
          When You Make Purchase During The Week, Your Stats Will Appear Here.
        </Text>
      </View>
    );
  }
  else {
    return (
       <BallIndicator color='black' />
    )
  }
};

export default Stats;
