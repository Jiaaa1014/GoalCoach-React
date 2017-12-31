import React, { Component } from "react";
import { connect } from "react-redux";
import { completeGoalRef, goalRef } from "../firebase.js";

class GoalItem extends Component {
  completeGoal() {
    // 完成新增到database
    // 然後從清單移除
    const { email } = this.props.user;
    const { title, serverKey } = this.props.goal;
    goalRef.child(serverKey).remove();
    completeGoalRef.push({ email, title });
  }
  render() {
    // console.log("this.props.goalssss", this.props.goal);
    const { email, title } = this.props.goal;

    return (
      <div style={{ margin: "5px" }}>
        <strong>{title}</strong>
        <span>
          submitted by <em>{email}</em>
        </span>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => this.completeGoal()}
        >
          Complete
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}
export default connect(mapStateToProps, null)(GoalItem);
