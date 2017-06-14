import React from 'react'
import client from '../lib/api/client'

export default class Login extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this._handleChange.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
    this.isFormValid = this._isFormValid.bind(this)

    this.state = {
      username: '',
      password: '',
      error: null
    }
  }

  render () {
    return (
      <div className='Login'>
        <form onSubmit={this.handleSubmit}>

          <div className='pt-form-group'>
            <label
              className='pt-label'
              for='username'>
              Username
            </label>

            <div className='pt-form-content'>
              <input
                className='pt-input pt-large'
                id='username'
                type='email'
                value={this.state.username}
                onChange={this.handleChange} />
            </div>
          </div>

          <div className='pt-form-group'>
            <label
              className='pt-label'
              for='password'>
              Password
            </label>

            <div className='pt-form-content'>
              <input
                className='pt-input pt-large'
                id='password'
                type='password'
                value={this.state.password}
                onChange={this.handleChange} />
            </div>
          </div>

          <div style={{ display: this.state.error ? 'block' : 'none', color: 'red' }}>{this.state.error}</div>

          <button
            className='pt-button pt-intent-primary'
            type='submit'
            disabled={!this.isFormValid()}>
            Login
          </button>

        </form>
        <style jsx>{`

          .Login {
            display: flex;
            height: 100vh;
            padding: 60px 0;
          }

          .Login form {
            margin: 0 auto;
            max-width: 320px;
          }

        `}</style>
      </div>
    )
  }

  _handleChange (ev) {
    const { id, value } = ev.target
    this.setState(prevState => ({ ...prevState, error: null, [id]: value }))
  }

  _handleSubmit (ev) {
    ev.preventDefault()

    const params = {
      username: this.state.username,
      password: this.state.password
    }

    client.Auth.login(params)
      .then(res => {
        if (res.error) {
          this.setState(
            prevState => ({ ...prevState, error: res.error })
          )
          return
        }

        // res.token
        console.log(res.token)
      })
  }

  _isFormValid () {
    return this.state.username.length > 0 &&
      this.state.password.length > 0
  }
}
