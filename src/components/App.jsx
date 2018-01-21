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
        <h2>Goals</h2>
        <AddGoal />
        <hr />
        <h3>Goals to Be Done</h3>
        <GoalList />
        <hr />
        <h3>Already Completed</h3>
        <CompleteGoalList />
        <hr />
        <button className="btnOut" onClick={() => this.signOut()}>
          Sign out
        </button>
      </div>
    )
  }
}

// function mapStateToProps() {
//   return {}
// }
export default App
