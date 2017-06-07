import React from 'react'
import fetch from 'isomorphic-fetch'

export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this._handleClick.bind(this)
    this.state = { message: 'WAT' }
  }

  render () {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>click</button>
        <div>{this.state.message}</div>
      </div>
    )
  }

  _handleClick () {
    fetch(`${API_ENDPOINT}/hello`)
      .then(res => res.json())
      .then(message => {
        this.setState(
          prevState => ({ ...prevState, message: message.message })
        )
      })
  }
}
