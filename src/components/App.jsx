import React, { Component } from "react";
import { connect } from "react-redux";
import { firebaseApp } from "../firebase";
import AddGoal from "./AddGoal";
import GoalList from "./GoalList";
import CompleteGoalList from "./CompleteGoalList";
class App extends Component {
  signOut() {
    firebaseApp.auth().signOut();
  }
  render() {
    return (
      <div style={{ margin: "5px" }}>
        <h3>Goals</h3>
        <AddGoal />
        <hr />
        <h4>Goals to Be Done</h4>
        <GoalList />
        <hr />
        <h4>Already Completed</h4>
        <CompleteGoalList />
        <hr />
        <button className="btn btn-danger" onClick={() => this.signOut()}>
          Sign out
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log("App.jsx", state);
  return {};
}
// 沒有{} 則：mapStateToProps() in Connect(App) must return a plain object. Instead received undefined.
export default connect(mapStateToProps, null)(App);
