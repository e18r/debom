import React from 'react';
import Main from './Main';

export default class App extends React.Component {
  render() {
    return (
      <Main
        server='http://192.168.43.198:8080'
        token='7NULiAGMBEYmiwaJLSxPGStkfItcNGw2iz3i7z6yZtm9FMQj24DYga3hhJc2ZvGF'
      />
    );
  }
}
