import { json } from "express";
import EncryptedStorage from "react-native-encrypted-storage";

async function storeData(access_token, bankName) {
 
  try {
    await EncryptedStorage.setItem(
      "user",
    JSON.stringify({
      access_token,
      bankName
    })
    );

  } catch (error) {
    if (error) return error
  }
}
async function clearStorage() {
  try {
    await EncryptedStorage.clear();
    // Congrats! You've just cleared the device storage!
  } catch (error) {
   if (error) return error;
  }
}

async function retrieveUser() {
  try {
    const session = await EncryptedStorage.getItem("user");
     
    if (session !== undefined) {
      return JSON.parse(session)
      // Congrats! You've just retrieved your first value!
    }
    else{
      return false
    }
  } catch (error) {
    // There was an error on the native side
  }
}


async function retrieveZip() {
  try {
    const session = await EncryptedStorage.getItem('zip');

    if (session !== undefined) {
      return JSON.parse(session);
      // Congrats! You've just retrieved your first value!
    } else {
      return false;
    }
  } catch (error) {
    // There was an error on the native side
  }
}

async function storeZip(zip) {
  try {
    await EncryptedStorage.setItem(
      'zip',
        zip
    );

    
  } catch (error) {
     if (error) return error;
  }
}
export {storeData, retrieveUser, clearStorage, storeZip, retrieveZip}