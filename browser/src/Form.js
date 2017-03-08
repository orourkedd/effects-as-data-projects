import React, { Component } from 'react';

class Form extends Component {
  submit (e) {
    e && e.preventDefault()
    this.props.fetchRepos(this.props.state.username);
  }

  render () {
    return (
      <form onSubmit={this.submit.bind(this)}>
        <input type='text' value={this.props.state.username} onChange={(e) => this.props.setState({username: e.target.value})}/>
        <input type='submit' value='Submit' />
        <a onClick={this.props.blowUp} id='fail'>Fail on Purpose</a>
      </form>
    );
  }
}

export default Form;
