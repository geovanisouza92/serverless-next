import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { AuthService } from '../lib/auth/service'

export default class Layout extends React.Component {
  constructor (props) {
    super(props)

    this.handleLogout = this._handleLogout.bind(this)

    this.state = {
      auth: new AuthService(),
      isLoggedIn: undefined
    }
  }

  componentDidMount () {
    const isLoggedIn = this.state.auth.isLoggedIn()

    this.setState(
      prevState => ({ ...prevState, isLoggedIn })
    )
  }

  render () {
    return (
      <div>
        <header>
          <nav className='pt-navbar pt-dark'>
            <div className='pt-navbar-group pt-align-left'>
              <div className='pt-navbar-heading'><span style={{color: '#ffc107'}}>&#x26A1;</span>Serverless Next Notes</div>
            </div>
            <div className='pt-navbar-group pt-align-right'>{
              this.state.isLoggedIn
              ? <button className='pt-button pt-minimal pt-icon-standard pt-icon-log-in' type='button' onClick={this.handleLogout}>Logout</button>
              : <Link href='/login'><a className='pt-button pt-minimal pt-icon-standard pt-icon-log-in' role='button' tabIndex='0'>Login</a></Link>
            }</div>
          </nav>

          {this.props.children}

          {/* footer */}
        </header>
      </div>
    )
  }

  _handleLogout () {
    this.state.auth.logout()
    if (window) window.location.reload()
  }
}
