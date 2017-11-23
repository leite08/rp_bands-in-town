import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import './app.css';
import Artists from '../../imports/ui/Artists';

const app = () => (
  <Router>
    <div className="App">
      <div className="App-header">
        <h2>Rockies & Prairies > Home24</h2>
      </div>
      <Artists />
    </div>
  </Router>
);
export default app;