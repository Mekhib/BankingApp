import axios from 'axios';
import styles from './balance.styles';


let getBalances = access_token => (
  
   new Promise((resolve, err) => {
    axios
      .get('https://aqueous-hamlet-49525.herokuapp.com/item/getBalance', {
        params: {access_token},
      })
      .then((response, err) => {
            if (response.data === 403) {
              resolve('ERROR');
            }

        if (response.status === 200) resolve(response);
      }).catch((error)=>{if(error.code)resolve("ERROR")});     
  })
);

let getTransactions = access_token =>
  new Promise((resolve, err) => {
    try {
      axios
        .get('https://aqueous-hamlet-49525.herokuapp.com/items/getTransactions', {
          params: {access_token},
        })
        .then((response, err) => {
          if (response.data.transactions.length === 0) resolve("N/A")
          if (response.data === 403) {
            resolve('ERROR');
          }

          if (response.status === 200) resolve(response);
        })
        .catch(error => {
          if (error.code) resolve('ERROR');
        });    
    }
catch(err) {
 if (err) return err;
}
  });

  let getAllTransactions = access_token =>
    new Promise((resolve, err) => {
      axios
        .get('https://aqueous-hamlet-49525.herokuapp.com/items/getAllTransactions', {
          params: {access_token},
        })
        .then((response, err) => {
          if (response.data.transactions.length === 0) resolve('N/A');
          if (response.status === 200) resolve(response);
       
        });
    });
  const switchIcon = catergory => {
    var icon;
    switch (catergory) {
      case 'Travel':
        return (icon = 'airplane-outline');
        break;
      case 'Payment':
        return (icon = 'cash-outline');
      case 'Food and Drink':
        return (icon = 'fast-food-outline');
      case 'Transfer':
        return (icon = 'send-outline');
      default:
        return (icon = 'cash-outline');
        break;
    }
  };

    const switchColor = catergory => {
      var icon;
      switch (catergory) {
        case 'Travel':
          return (icon = '#83939d');
          break;
        case 'Payment':
          return (icon = '#84ac7c');
        case 'Food and Drink':
          return (icon = '#d20100');
        case 'Transfer':
          return (icon = '#a644c6');
        default:
          return (icon = 'lightblue');
          break;
      }
    };



export {
  getBalances,
  getTransactions,
  switchIcon,
  switchColor,
  getAllTransactions,
};
