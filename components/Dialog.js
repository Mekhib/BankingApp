import React, {Component, useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {storeZip} from '../api/StorageHelper';
import Dialog from 'react-native-dialog';




export default function AlertBox({isVisible, updateVisible}) {
  function saveZip(zip) {
    storeZip(zip).then(data => {
      updateVisible(false);
    });
  }
  const [input, setInput] = useState('');
  useEffect(() => {
  }, [isVisible]);
  return (
    <View>
      <Dialog.Container visible={isVisible}>
        <Dialog.Title>Zip Code</Dialog.Title>
        <Dialog.Description>Please Enter Your Zip Code</Dialog.Description>
        <Dialog.Input onChangeText={setInput} value={input} />
        <Dialog.Button label="Submit" onPress={() => saveZip(input)} />
      </Dialog.Container>
    </View>
  );
}
