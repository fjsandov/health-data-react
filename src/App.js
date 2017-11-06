import React, { Component } from 'react';
import logo from './images/cdc.svg';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-select-plus/dist/react-select-plus.css';

import './App.css';

import { Container, Row, Col } from 'reactstrap';
import CountyDetail from './components/CountyDetail';
import CountySelect from './components/CountySelect';

class App extends Component {
  render() {
    return (
      <Container className='App'>
        <Row className='App-header'>
          <Col>
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Obesity, inactivity and diabetes data by county 2004 - 2013</h1>
          </Col>
        </Row>
        <Row className='App-body'>
          <Col>
            <CountySelect />
            <CountyDetail />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default App;