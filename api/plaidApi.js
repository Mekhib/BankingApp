
import axios from "axios";


let exchangeTokens = (publicToken) => { return new Promise((resolve, err) => {
        axios
          .get("https://aqueous-hamlet-49525.herokuapp.com/item/public_token/exchange/", {
            params: { publicToken },
          })
          .then((response, err) => {
            if (response.status === 200) resolve(response);
          });
})};

export { exchangeTokens }