import React, { Component } from 'react';
import logo from './images/cdc.png';

import 'bootstrap/dist/css/bootstrap.css';
import 'react-select-plus/dist/react-select-plus.css';
import "react-toggle/style.css";

import './App.css';

import { Container, Row, Col } from 'reactstrap';
import CountyDetail from './components/CountyDetail';
import CountySelect from './components/CountySelect';

class App extends Component {
  render() {
    return (
      <Container className='app'>
        <Row className='app-header'>
          <Col md="2">
            <img src={logo} alt="logo" />            
          </Col>
          <Col md="10" className="title">
            <h1>Counties diabetes, inactivity and obesity data</h1>
            <h3>2004 - 2013</h3>
          </Col>
        </Row>
        <Row className='app-body'>
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