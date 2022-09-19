import axios from 'axios';


let getAllTransactions = access_token =>
  new Promise((resolve, err) => {
    axios
      .get('https://aqueous-hamlet-49525.herokuapp.com/items/getAllTransactions', {
        params: {access_token},
      })
      .then((response, err) => {
        if (response.status === 200) resolve(response);
      });
  });

      var renderIcon = category => {
        switch (category) {
          case 'Deposit':
            return 'https://image.flaticon.com/icons/png/512/1466/1466684.png';
          case 'Payment':
            return 'https://www.iconbunny.com/icons/media/catalog/product/cache/2/thumbnail/600x/1b89f2fc96fc819c2a7e15c7e545e8a9/1/0/1089.12-credit-card-icon-iconbunny.jpg';
          case 'Travel':
            return 'https://cdn.dribbble.com/users/13395/screenshots/6455348/screen_shot_2019-05-08_at_3.32.42_pm.png';
          case 'Transer':
            return 'https://i1.pngguru.com/preview/39/372/879/circle-design-electronic-funds-transfer-bank-payment-online-banking-money-bank-account-wire-transfer-png-clipart.jpg';
          case 'Recreation':
            return 'https://cdn1.iconfinder.com/data/icons/travel-and-vacation-16/80/vector_825_27-512.png';
          case 'Food and Drink':
            return 'https://icon-library.com/images/food-and-drink-icon-png/food-and-drink-icon-png-25.jpg';
          case 'Shops':
            return 'https://cdn1.iconfinder.com/data/icons/long-shadow-commerce-and-shopping-2/600/shops-shopping-market-mall-business-commerce-512.png';
          default:
            return 'https://icons.iconarchive.com/icons/graphicloads/flat-finance/256/dollar-coin-icon.png';
        }
      };




         let categoryArray = (transactionsList) => {
 
        var categoryBreakdown = {
          Total: 0
        }
        transactionsList.filter((transaction)=> transaction.amount > 0).forEach(transaction => {
          const category = `${transaction.category[0]}`
              return  categoryBreakdown[category] ? categoryBreakdown = {...categoryBreakdown, [category]:  categoryBreakdown[category] + transaction.amount, "Total": categoryBreakdown["Total"] + transaction.amount } : categoryBreakdown = {...categoryBreakdown, [category]: transaction.amount, "Total": categoryBreakdown["Total"] + transaction.amount} 
        });
        return categoryBreakdown
      }


         let categoryArrayNoKey = transactionsList => {
 
           var categoryBreakdown = {
           };
           transactionsList
             .filter(transaction => transaction.amount > 0)
             .forEach(transaction => {
               const category = `${transaction.category[0]}`;
               return categoryBreakdown[category]
                 ? (categoryBreakdown = {
                     ...categoryBreakdown,
                     [category]:
                       categoryBreakdown[category] + transaction.amount
                   })
                 : (categoryBreakdown = {
                     ...categoryBreakdown,
                     [category]: transaction.amount
                   });
             });
           return categoryBreakdown;
         };

             let transactionsByDay = transactionsList => {
          
               var transByDay = {
              
               };
               transactionsList
                 .filter(transaction => transaction.amount > 0)
                 .forEach(transaction => {
                   const dates = `${transaction.date}`;
                   return transByDay[dates]
                     ? (transByDay = {
                         ...transByDay,
                         [dates]: transByDay[dates] + transaction.amount,
                       })
                     : (transByDay = {
                         ...transByDay,
                         [dates]: transaction.amount,
                       });
                 });
               return transByDay;
             };

      let biggestPurchase = (transactions) => {
       return transactions
         .filter(transaction => transaction.amount > 0)
         .sort(
           (transaction1, transaction2) =>
             transaction2.amount - transaction1.amount,
         )[0];
      }

      let allTransactionsTotal = (transactions) => {
        var allTransactionTotal = 0
        transactions.filter(transaction => transaction.amount > 0).forEach((transaction)=> {
          const {amount} = transaction
              return allTransactionTotal += amount
        })
        return allTransactionTotal
      }
     
           let allDepositsTotal = transactions => {
             var allDepositsTotal = 0;
             transactions
               .filter(transaction => transaction.amount < 0)
               .forEach(transaction => {
                 const {amount} = transaction;
                  const posAmount = -(amount);
                 return (allDepositsTotal += posAmount);
               });
             return allDepositsTotal;
           };

      let avgDeposits = (transactions) => {
        var allDeposit = []
        transactions.filter(transactions => transactions.amount < 0).forEach((transaction)=>{
        
        const {amount} = transaction
        const posAmount = -(amount)
        allDeposit.push(posAmount)
        return allDeposit
        })
        return allDeposit.length > 0 ? allDeposit.reduce((a, b) => a + b) / allDeposit.length : 0
      }

            let categoryPercent = (catArray) => {
              let resObj = {}
              return Object.keys(catArray).map((key, index)=>{
                if(resObj[key]){
                }
                else {
              return resObj =  {
              ...resObj,
              [key]: ((catArray[key] / catArray['Total'])),
                 };
                }
               
              })
            };

            let makeLabel = (labels) => (
              labels.map((label)=>{
               return label.slice(5)
              })
            )


               let transTotalsByDay = transactionsList => {
               
                 var transTotals = {
                 
                 };
                 transactionsList
                   .filter(transaction => transaction.amount > 0)
                   .forEach(transaction => {
                   
                     const {amount, date} = transaction;
                     return transTotals[date]
                       ? (transTotals = {
                           ...transTotals,
                           [date]:
                             (transTotals[date] + amount),
                          
                         })
                       : (transTotals = {
                           ...transTotals,
                           [date]: amount,
                      
                         });
                   });

                 return transTotals;
               };
  export {
    getAllTransactions,
    renderIcon,
    categoryArray,
    biggestPurchase,
    categoryPercent,
    transTotalsByDay,
    allTransactionsTotal,
    makeLabel,
    categoryArrayNoKey,
    transactionsByDay,
    allDepositsTotal,
    avgDeposits
  };