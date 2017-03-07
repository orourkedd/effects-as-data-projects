import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.getRepositories();
  }

  render() {
    const repos = this.props.state.repos || [];
    const { loading, failed } = this.props.state;

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>All My Repos</h2>
        </div>
        { loading && <h1>Loading...</h1> }
        { failed && <h1>There was a problem loading the repos :-(</h1> }
        {repos.map((repo) => {
          return (
            <section key={repo.name}>
              <h1>{repo.name}</h1>
              <p>{repo.url}</p>
            </section>
          )
        })}
      </div>
    );
  }
}

export default App;
