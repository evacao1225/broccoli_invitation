import React, { Component } from 'react';
import './styles/App.css';
import Header from './common/Header';
import Footer from './common/Footer';
import Main from './Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
				<Main />
				<Footer />
      </div>
    );
  }
}

export default App;
