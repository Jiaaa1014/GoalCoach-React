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
      <div className="box">
        <h1> Hey, NewComer</h1>
        <div className="form-group user">
          <input
            type="text"
            className="form-control user-typing"
            placeholder="email"
            onChange={e => this.setState({ email: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') this.signUp()
            }}
          />
          <input
            type="password"
            className="form-control user-typing"
            placeholder="password"
            onChange={e => this.setState({ password: e.target.value })}
            onKeyPress={(e) => {
              if (e.key === 'Enter') this.signUp()
            }}
          />

          <button
            type="button"
            className="btnInUp"
            onClick={() => this.signUp()}
          >
            Sign Up
          </button>
        </div>
        <div className="err">{this.state.error.message}</div>
        <hr className="block" />
        <div className="in">
          <div>Already a user? </div>
          <Link to="/signin">Sign in instead</Link>
        </div>
        <hr className="block" />
      </div>
    )
  }
}
