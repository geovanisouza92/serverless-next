import React from 'react'

export default class Login extends React.Component {
  constructor (props) {
    super(props)

    this.handleSubmit = this._handleSubmit.bind(this)
    this.handleChange = this._handleChange.bind(this)
    this.validateForm = this._validateForm.bind(this)

    this.state = {
      username: '',
      password: ''
    }
  }

  render () {
    return (
      <div className='Login'>
        <form onSubmit={this.handleSubmit}>

          <div className='pt-form-group pt-large'>
            <label className='pt-label' for='username'>Username</label>
            <div className='pt-form-content'>
              <input className='pt-input' id='username' type='email' value={this.state.username} onChange={this.handleChange} />
            </div>
          </div>

        </form>
        <style jsx>{`

          .Login {
            display: flex;
            height: 100vh;
          }

          .Login form {
            margin: auto;
          }
          
        `}</style>
      </div>
    )
  }

  _validateForm () {
    return this.state.username.length > 0 &&
      this.state.password.length > 0
  }

  _handleChange (ev) {
    const { id, value } = ev.target
    this.setState(prevState => ({ ...prevState, [id]: value }))
  }

  _handleSubmit (ev) {
    ev.preventDefault()
  }
}
