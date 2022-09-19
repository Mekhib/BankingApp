import GetLocation from 'react-native-get-location';
import {
  Platform,
Linking
} from 'react-native';

async function getLocation () {
return new Promise((resolve, err)=>{
GetLocation.getCurrentPosition({
  enableHighAccuracy: true,
  timeout: 15000,
})
  .then(location => {
    resolve( `${location.latitude},${location.longitude}`);
  })
  .catch(error => {
    const {code, message} = error;
    console.warn(code, message);
  });
}) 
}

const goToMaps = (latLng, bankName) => {
  const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
  const label = bankName;
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });

 return Linking.openURL(url);
}


const makeURL = (coordinates, bank) => {
  const apiKey = 'AIzaSyCClWa-AwaTMpmQ_WmwyJTmf00NouXxsPM';
  const bankName = bank.replace(/\s+/g, '');
  const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${bankName}+bank&location=${coordinates}&radius=10000&key=${apiKey}`;
  return url;
}


export {getLocation, makeURL, goToMaps}


