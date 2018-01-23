import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { firebaseApp } from '../firebase'
import AddGoal from './AddGoal'
import GoalList from './GoalList'
import CompleteGoalList from './CompleteGoalList'

class App extends Component {
  signOut() {
    firebaseApp.auth().signOut()
  }
  render() {
    return (
      <div className="listbox">
        <h1>Make a Goals?</h1>
        <AddGoal />
        <hr />
        <h2>Hey, Finish it!</h2>
        <GoalList />
        <hr />
        <h2>Already Completed</h2>
        <CompleteGoalList />
        <hr />
        <button className="btnOut" onClick={() => this.signOut()}>
          Sign out
        </button>
      </div>
    )
  }
}

export default App
