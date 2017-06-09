/* global API_ENDPOINT */

import React from 'react'
import fetch from 'isomorphic-fetch'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this._handleClick.bind(this)
    this.login = this._login.bind(this)
    this.state = {
      token: null,
      message: 'not so short urls'
    }
  }

  render () {
    return (
      <div className='container'>
        <button className='action' type='button' onClick={this.login}>Login</button>
        <h1 className='title'>{this.state.message}</h1>
        <div className='group'>
          <input className='url' type='url' />
          <button className='action' type='button' onClick={this.handleClick}>Short</button>
        </div>
        <style jsx>{`
          div.container {
            display: flex;
            flex-direction: column;
            height: 100vh;
          }

          h1.title {
            color: white;
            margin: auto auto 15px auto;
          }

          div.group {
            display: flex;
            flex-direction: row;
            margin: 15px auto auto auto;
          }

          input.url {
            background-color: #A1E0A2;
            border: none;
            color: white;
            font-size: 32px;
            padding: 10px;
            text-align: center;
          }

          button.action {
            background-color: #A1E0A2;
            border: none;
            color: white;
            font-size: 32px;
            margin-left: 2px;
          }
        `}</style>
      </div>
    )
  }

  _login () {
    fetch(`${API_ENDPOINT}/auth`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: 'admin',
        password: 'admin'
      })
    })
    .then(res => res.json())
    .then(data => this.setState(
      prevState => ({ ...prevState, token: data.token })
    ))
  }

  _handleClick () {
    const options = {}

    if (this.state.token) {
      options.headers = {
        Authorization: `Bearer ${this.state.token}`
      }
    }

    fetch(`${API_ENDPOINT}/hello`, options)
      .then(res => res.json())
      .then(data => this.setState(
        prevState => ({ ...prevState, message: data.message })
      ))
  }
}
