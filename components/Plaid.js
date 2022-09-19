import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {PlaidLink} from 'react-native-plaid-link-sdk';
import React from 'react';
import {exchangeTokens} from '../api/plaidApi.js';
import {storeData} from '../api/StorageHelper.js';

export default Plaid = (props) => {

    return (
      <View style={styles.container}>
        <PlaidLink
          tokenConfig={{
            token: props.linkToken,
          }}
          LinkLogLevel="DEBUG"
          onSuccess={(success, err) => {
            if (err) throw err;
            if (success.publicToken) {
              exchangeTokens(success.publicToken).then(
                (exchangeResult, err) => {
                  
                 if(exchangeResult.status === 200){
                   storeData(
                        exchangeResult.data,
                        success.metadata.institution.name,
                      )
                 }
                },
              );

              props.updateSuccessful(true);
            }
          }}
          onExit={exit => {
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../assets/connectArt.jpg')}
              style={{height: 300, width: 296}}
            />
            <Text style={{marginTop: 10, fontWeight: 'bold', fontSize: 20}}>
              No Banks Connected
            </Text>
            <Text style={{marginTop: 9}}>
              Add An Account To Connect To a Bank.
            </Text>
            <View style={styles.bottom}>
              <View style={styles.button} title="Add Bank">
                <Text style={styles.buttonText}> Add Bank </Text>
              </View>
            </View>
          </View>
        </PlaidLink>
      </View>
    );
  
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 100,
    width: 300
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    fontWeight: '600',
  },
});
