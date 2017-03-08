import React, { Component } from 'react';
import uuid from 'uuid';
import './Log.css';

class Log extends Component {
  render() {
    const { state } = this.props;

    return (
      <div id="log">
        <h1>Effect Log</h1>
        <p>Every side-effect performed by effect-as-data is logged here.</p>
        <ul className='log-entries'>
          {state.log.map((r) => {
            return (
              <li key={uuid.v4()} className={`log-entry ${r.failure && 'log-entry-failure'}`}>
                <div className='log-entry-action-type'>
                  <span className='log-entry-label'>Action Type</span>
                  <span>{r.action.type}</span>
                </div>
                <div className='log-entry-fn'>
                  <span className='log-entry-label'>Function</span>
                  <span>{r.fn}</span>
                </div>
                <div className='log-entry-action'>
                  <span className='log-entry-label'>Action Payload</span>
                  <span>{JSON.stringify(r.action).substring(0, 150)}...</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Log;
