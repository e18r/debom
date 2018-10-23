import React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {

  async postTransactions(amount, debit, credit) {
    try {
      let response = await fetch('http://192.168.1.1:8080/transactions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer '
        }
      });
      let responseJson = await response.json();
      return responseJson;
    }
    catch (error) {
      console.error(error);
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{width: 80}}
          placeholder="amount"
        />
        <TextInput
          style={{width: 80}}
          placeholder="debit"
        />
        <TextInput
          style={{width: 80}}
          placeholder="credit"
        />
        <Button
          title="send"
          onPress={() => {
            console.log(this.postTransactions(1, 2, 3));
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
