import React from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default class App extends React.Component {
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
            Alert.alert("hola, mundo!");
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
