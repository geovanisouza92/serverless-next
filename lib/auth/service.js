import React from 'react'
import Router from 'next/router'
import client from '../api/client'

export class AuthService {
  login (username, password) {
    return client.Auth.login({ username, password }).then(res => {
      if (!res.error) {
        this.setToken(res.token)
      }
      return res
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

  isTokenExpired (token) {
    const body = atob(token.split('.')[1])
    return body.exp < Date.now() / 1000
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
        Router.push({
          pathname: '/login',
          query: {
            r: Router.route
          }
        })
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
            : <TargetComponent {...this.props} auth={auth} />
        }</div>
      )
    }
  }
}
