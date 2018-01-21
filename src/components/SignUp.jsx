import React, { Component } from 'react'
import { Link } from 'react-router'
import { firebaseApp } from '../firebase'
import '../styling/css/SignUp.css'

export default class SignUp extends Component {
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

  signUp() {
    const { email, password } = this.state
    firebaseApp
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .catch(error => this.setState({ error }))
  }
  render() {
    return (
      <div className="form-inline box" style={{ margin: '5%' }}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="email"
            style={{ marginRight: '5px' }}
            onChange={e => this.setState({ email: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') this.signUp()
            }}
          />
          <input
            type="password"
            className="form-control"
            placeholder="password"
            style={{ marginRight: '5px' }}
            onChange={e => this.setState({ password: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') this.signUp()
            }}
          />

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.signUp()}
          >
            Sign Up
          </button>
        </div>
        <div>{this.state.error.message}</div>
        <div>
          <Link to="/signin">Already a user? Sign in instead</Link>
        </div>
      </div>
    )
  }
}
