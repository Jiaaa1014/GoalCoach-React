import React, { Component } from "react";
import { connect } from "react-redux";
import { goalRef } from "../firebase";
import { setGoals } from "../actions";
import GoalItem from "./GoalItem";
class GoalList extends Component {
  componentDidMount() {
    goalRef.on("value", snap => {
      let goals = [];
      snap.forEach(goal => {
        const { email, title } = goal.val(); // 沒有val()，看起來會是Object{node:{...}, ref:{...}}
        const serverKey = goal.ref.path.pieces_[1];
        goals.push({ email, title, serverKey });
        // 得到亂碼key: goal.ref.path.pieces[1]
      });
      console.log("GoalLists.jsx", goals);
      this.props.setGoals(goals);
    });
  }
  render() {
    console.log("this.props.goals", this.props.goals);
    return (
      <div>
        {this.props.goals.map((goal, key) => {
          return (
            // <div key={key}>{goal.title}</div>
            <GoalItem key={key} goal={goal} />
          );
        })}
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { goals } = state;
  return { goals };
}
export default connect(mapStateToProps, { setGoals })(GoalList);
