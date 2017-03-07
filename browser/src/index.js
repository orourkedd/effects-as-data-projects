import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { run } from 'effects-as-data';
import buildHandlers from './effects/handlers';
import functions from './effects/functions';

//  Poor mans state container
let state = {};

//  Re-render app whenever setState() is called
function setState (key, payload) {
  state[key] = payload;
  render();
}

//  Wire up handlers
const handlers = buildHandlers(setState);

//  Create callback for react
function getRepositories () {
  run(handlers, functions.getRepositories, 'orourkedd').catch(console.error);
};

function render () {
  ReactDOM.render(
    <App getRepositories={getRepositories} state={state} />,
    document.getElementById('root')
  );
}

//  Do initial render of app
render();
