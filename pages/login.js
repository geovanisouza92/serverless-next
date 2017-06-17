import React from 'react'
import Router from 'next/router'
import {withAuth} from '../lib/auth/service'
import client from '../lib/api/client'
import Layout from '../components/layout'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this._handleChange.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
    this.isFormValid = this._isFormValid.bind(this)

    this.state = {
      returnUrl: Router.query.r,
      username: '',
      password: '',
      error: null
    }
  }

  componentDidMount () {
    if (!this.props.auth.isLoggedIn()) return

    // Redirect
    if (this.state.returnUrl) {
      Router.push(this.state.returnUrl)
    } else {
      Router.push('/')
    }
  }

  render () {
    return (
      <Layout>
        <div className='Login'>
          <form onSubmit={this.handleSubmit}>

            <div className='pt-form-group'>
              <label
                className='pt-label'
                htmlFor='username'>
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
                htmlFor='password'>
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
        </div>
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
      </Layout>
    )
  }

  _handleChange (ev) {
    const { id, value } = ev.target
    this.setState(prevState => ({ ...prevState, error: null, [id]: value }))
  }

  _handleSubmit (ev) {
    ev.preventDefault()

    this.props.auth.login(this.state.username, this.state.password)
      .then(res => {
        if (res.error) {
          this.setState(
            prevState => ({ ...prevState, error: res.error })
          )
          return
        }

        // Redirect
        if (this.state.returnUrl) {
          Router.push(this.state.returnUrl)
        } else {
          Router.push('/')
        }
      })
  }

  _isFormValid () {
    return this.state.username.length > 0 &&
      this.state.password.length > 0
  }
}

export default withAuth(Login)
