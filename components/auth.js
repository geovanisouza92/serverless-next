import React from 'react'
import Router from 'next/router'
import client from '../lib/api/client'

export class AuthService {
  login (username, password) {
    client.Auth.login({ username, password })
      .then(res => {
        if (res.error) {
          // this.setState(
          //   prevState => ({ ...prevState, error: res.error })
          // )
          return
        }

        // res.token
        this.setToken(res.token)
      })
  }

  logout () {
    window.localStorage.removeItem('token')
  }

  isLoggedIn () {
    const token = this.getToken()
    return !!token && !this.isTokenExpired(token)
  }

  setToken (token) {
    window.localStorage.setItem('token', token)
  }

  getToken () {
    return window.localStorage.getItem('token')
  }
}

export const withAuth = TargetComponent => {
  const auth = new AuthService()

  return class Authenticated extends React.Component {
    constructor (props) {
      super(props)
      this.state = {
        isLoading: true
      }
    }

    componentDidMount () {
      if (!auth.isLoggedIn()) {
        Router.push('/login')
      }
      this.setState(
        prevState => ({ ...prevState, isLoading: false })
      )
    }

    render () {
      return (
        <div>{
          this.state.isLoading
            ? <div>Loading...</div>
            : <TargetComponent {...this.state.props} auth={auth} />
        }</div>
      )
    }
  }
}
