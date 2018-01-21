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
      .catch(error => this.setState({ error }))
  }
  render() {
    return (
      <div className="box" >
        <h1>Sign In</h1>
        <div className="form-group user">
          <input
            type="text"
            className="form-control user-typing"
            placeholder="email"
            onChange={e => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            className="form-control user-typing"
            placeholder="password"
            onChange={e => this.setState({ password: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') this.signIn()
            }}
          />
          <button
            type="button"
            className="btnInUp"
            onClick={() => this.signIn()}
          >
            Sign In
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <hr />
        <div>
          <div>New invistor?</div>
          <Link to="/signup">Join us</Link>
        </div>
        <hr />
      </div>
    )
  }
}
