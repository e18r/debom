import React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {

  constructor() {
    super();
    this.state = {
      amount: null,
      currency: null,
      debit: null,
      credit: null
    };
  }

  async postTransactions(amount, currency, debit, credit) {
    try {
      let data = new FormData();
      data.append('amount', amount);
      data.append('currency', currency);
      data.append('debit', debit);
      data.append('credit', credit);
      let response = await fetch('http://192.168.0.22:8080/transactions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer hIMXPFWo6AYOMNAoPEqlfH7Oei3BwyCwMBcdUZwTcjxh0ihi1a7C72h9DnKZN2Fo'
        },
        body: data
      });
      let responseJson = await response.json();
      return responseJson;
    }
    catch (error) {
      return error;
      console.error(error);
    }
  };
  
  render() {
    const {amount, currency, debit, credit} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={{width: 80}}
          placeholder="amount"
          onChangeText={(amount) => this.setState({amount})}
        />
	<TextInput
          style={{width: 80}}
          placeholder="currency"
          onChangeText={(currency) => this.setState({currency})}
        />
        <TextInput
          style={{width: 80}}
          placeholder="debit"
          onChangeText={(debit) => this.setState({debit})}
        />
        <TextInput
          style={{width: 80}}
          placeholder="credit"
          onChangeText={(credit) => this.setState({credit})}
        />
        <Button
          title="send"
          onPress={async () => {
              let response = await this.postTransactions(amount, currency, debit, credit);
	      console.log(response);
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
