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
      password: ''
    }
  }

  render () {
    return (
      <div className='Login'>
        <form onSubmit={ this.handleSubmit }>

          <div className='pt-form-group pt-large'>
            <label
              className='pt-label'
              for='username'>
              Username
            </label>

            <div className='pt-form-content'>
              <input
                className='pt-input'
                id='username'
                type='email'
                value={ this.state.username }
                onChange={ this.handleChange } />
            </div>
          </div>

          <div className='pt-form-group pt-large'>
            <label
              className='pt-label'
              for='password'>
              Password
            </label>

            <div className='pt-form-content'>
              <input
                className='pt-input'
                id='password'
                type='password'
                value={ this.state.password }
                onChange={ this.handleChange } />
            </div>
          </div>

          <button
            className='pt-button pt-intent-primary'
            type='submit'
            disabled={ !this.isFormValid() }>
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
    this.setState(prevState => ({ ...prevState, [id]: value }))
  }

  _handleSubmit (ev) {
    ev.preventDefault()

    client.Auth.login(this.state)
      .then(res => console.log(res))
      .then(err => console.error(err))
  }

  _isFormValid () {
    return this.state.username.length > 0 &&
      this.state.password.length > 0
  }
}
