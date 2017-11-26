import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Bert } from 'meteor/themeteorchef:bert';
import './app.css';
import Artists from '../../imports/ui/Artists';

// From: https://github.com/themeteorchef/bert
Bert.defaults = {
  hideDelay: 3500,
  style: 'growl-top-right'
};

const app = () => (
  <Router>
    <div className="App">
      <header id="header">
        <h2 className="logo">Rockies & Prairies > Home24 Challenge</h2>
			</header>
      <section id="main" className="wrapper">
				<div className="inner">
          <Artists />
        </div>
      </section>
    </div>
  </Router>
);
export default app;