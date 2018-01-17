import React, { Component } from 'react'
import { Link } from 'react-router'

import { firebaseApp } from '../firebase'

export default class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      error: {
        message: ''
      }
    }
  }

  signIn() {
    const { email, password } = this.state
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(e => this.setState({ e }))
  }
  render() {
    return (
      <div className="form-inline" style={{ margin: '5%' }}>
        <h2>Sign In</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="email"
            style={{ marginRight: '5px' }}
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            className="form-control"
            placeholder="password"
            style={{ marginRight: '5px' }}
            onChange={e => this.setState({ password: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') this.signIn()
            }}
          />
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.signIn()}
          >
            Sign In
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <div>
          <Link to={'/signup'}>Sign up instead</Link>
        </div>
      </div>
    )
  }
}