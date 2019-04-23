import React, { Component } from 'react';
import { WebView } from 'react-native';
import Main from './Main';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      server: 'http://192.168.43.198:8080',
      loginUri: null,
      token: null
    };
  }

  async componentWillMount() {
    const { server } = this.state;
    let response = await fetch(server + '/login');
    let loginUri = response.url;
    this.setState({ loginUri });
  }

  render() {
    const { server, loginUri, token } = this.state;
    return (
      <WebView
        source={{uri: loginUri}}
        style={{marginTop: 20}}
      />
    );
  }
}
