import React, {Fragment} from 'react';
import { Button, StyleSheet, Text, TextInput, View, WebView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class Main extends React.Component {

  constructor() {
    super();
    this.state = {
      amount: null,
      currency: null,
      debit: null,
      credit: null,
      comment: null,
      balances: null
    };
  }

  componentWillMount() {
    this.getBalances();
  }

  async getBalances() {
    const { server, token } = this.props;
    let response = await fetch(server + '/balances', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    let balances = await response.json();
    this.setState({balances});
  }

  async postTransactions() {
    const { server, token } = this.props;
    const { amount, currency, debit, credit, comment } = this.state;
      let data = new FormData();
      data.append('amount', amount);
      data.append('currency', currency);
      data.append('debit', debit);
      data.append('credit', credit);
      if(comment !== null) {
	data.append('comment', comment);
      }
    try {
      let response = await fetch(server + '/transactions', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + token
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
    const { balances } = this.state;
    let balanceTable = '<table><tr><th>type</th><th>account</th><th>currency</th><th>balance</th></tr>';
    if(balances) {
      Object.keys(balances).forEach(type => {
        Object.keys(balances[type]).forEach(account => {
          Object.keys(balances[type][account]).forEach(currency => {
            balanceTable += '<tr><td>' + type + '</td>';
            balanceTable += '<td>' + account + '</td>';
            balanceTable += '<td>' + currency + '</td>';
            balanceTable += '<td>' + balances[type][account][currency] + '</td></tr>';
          });
        });
      });
    }
    balanceTable += '</table>';
    
    return (
      <Fragment>
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
          <TextInput
            style={{width: 80}}
            placeholder="comment"
            onChangeText={(comment) => this.setState({comment})}
          />
          <Button
            title="send"
            onPress={async () => {
              let response = await this.postTransactions();
	      console.log(response);
              this.getBalances();
            }}
          />
        </View>
	<WebView
          style={styles.container}
          source={{html: balanceTable}}
        />
      </Fragment>
    );
  }
}

