import React from 'react'
import Router from 'next/router'
import {withAuth} from '../lib/auth/service'
import client from '../lib/api/client'
import Layout from '../components/layout'
import Form from '../components/form'
import FormInput from '../components/form-input'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.handleChange = this._handleChange.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)
    this.isFormValid = this._isFormValid.bind(this)

    this.state = {
      isLoading: false,
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
          <Form
            onSubmit={this.handleSubmit}
            onValidate={this.isFormValid}
            errorMessage={this.state.error}
            isLoading={this.state.isLoading}
            actionLabel='Login'>

            <FormInput
              large='true'
              name='username'
              label='Username'
              type='email'
              value={this.state.username}
              onChange={this.handleChange} />

            <FormInput
              large='true'
              name='password'
              label='Password'
              type='password'
              value={this.state.password}
              onChange={this.handleChange} />

          </Form>
        </div>
        <style jsx>{`

          .Login {
            display: flex;
            height: 100vh;
            padding: 60px 0;
            justify-content: center;
            align-items: center;
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

    this.setState(
      prevState => ({ ...prevState, isLoading: true })
    )

    this.props.auth.login(this.state.username, this.state.password)
      .then(res => {
        if (res.error) {
          this.setState(
            prevState => ({ ...prevState, isLoading: false, error: res.error })
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
