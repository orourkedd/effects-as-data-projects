import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import Log from './Log';

class App extends Component {
  render() {
    const { state, actions } = this.props;
    const repos = state.repos || [];
    const { loading, failure } = state;
    const { getRepositories, setState, blowUp } = actions;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>All My Repos</h2>
        </div>
        <div id="repos">
          <Form
            setState={setState}
            blowUp={blowUp}
            state={state}
            fetchRepos={getRepositories}
          />
          { loading && <h1>Loading...</h1> }
          { failure && <h1>{failure.error.message}</h1> }
          {repos.map((repo) => {
            return (
              <section key={repo.name}>
                <h1>{repo.name}</h1>
                <p>{repo.url}</p>
              </section>
            )
          })}
        </div>
        <Log state={state} />
      </div>
    );
  }
}

export default App;
