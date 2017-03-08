import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { run } from 'effects-as-data';
import buildHandlers from './effects/handlers';
import functions from './effects/functions';
import { initSetState, getState } from './state';

//  Wire up state container
const setState = initSetState(render);

const defaultUsername = 'orourkedd';

//  Wire up handlers
const handlers = buildHandlers(setState);

//  On failure handlers.  You should actually send this to your server for logging.
const onRunFailure = console.error

const onFailure = (s) => {
  const { log } = getState()
  log.unshift(s)
  setState({ log })
}

const onSuccess = (s) => {
  const { log } = getState()
  log.unshift(s)
  setState({ log })
}

//  Create callback for react
function getRepositories (username) {
  return run(
    handlers,
    functions.getRepositories,
    username,
    { onFailure, onSuccess, name: 'getRepositories' }
  ).catch(onRunFailure);
};

function blowUp () {
  return run(
    handlers,
    functions.thisWillFail,
    null,
    { onFailure, onSuccess, name: 'blowUp' }
  ).catch(onRunFailure);
}

const actions = {
  getRepositories,
  blowUp,
  setState
};

function render (getState, setState) {
  ReactDOM.render(
    <App actions={actions} state={getState()} />,
    document.getElementById('root')
  );
}

// Fetch data
getRepositories(defaultUsername);

//  Set initial state and render
setState({
  repos: [],
  username: defaultUsername,
  log: []
});
