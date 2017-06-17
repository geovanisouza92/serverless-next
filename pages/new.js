import React from 'react'
import Layout from '../components/layout'
import { withAuth } from '../lib/auth/service'
import client from '../lib/api/client'

class New extends React.Component {
  constructor (props) {
    super(props)

    this.isFormValid = this._isFormValid.bind(this)
    this.handleChange = this._handleChange.bind(this)
    this.handleSubmit = this._handleSubmit.bind(this)

    this.state = {
      content: ''
    }
  }

  render () {
    return (
      <Layout>
        <div className="New">
          <form onSubmit={this.handleSubmit}>

            <div className='pt-form-group'>
              <label
                className='pt-label'
                htmlFor='content'>
                Content
              </label>

              <div className='pt-form-content'>
                <textarea
                  id='content'
                  value={this.state.content}
                  onChange={this.handleChange} />
              </div>
            </div>

            <button
              className='pt-button pt-intent-primary'
              type='submit'
              disabled={!this.isFormValid()}>
              Create
            </button>

          </form>
        </div>
        <style jsx>{`

          .New {
            display: flex;
            height: 100vh;
          }

          .New form {
            margin: auto;
            padding-bottom: 15px;
          }

          .New form textarea {
            height: 300px;
            font-size: 24px;
          }

        `}</style>
      </Layout>
    )
  }

  _isFormValid () {
    return this.state.content.length > 0
  }

  _handleChange (ev) {
    const { id, value } = ev.target
    this.setState(prevState => ({ ...prevState, [id]: value }))
  }

  _handleSubmit (ev) {
    ev.preventDefault()

    client.Notes.create({ content: this.state.content }, this.props.auth.getToken())
      .then(res => {
        console.log(res)
      })
  }
}

export default withAuth(New)
