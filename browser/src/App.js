import React, { Component } from 'react';
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
          <h2>Effects as Data in Browser</h2>
          <a>https://github.com/orourkedd/effects-as-data-projects/tree/master/browser</a>
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
