import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setCompleted } from '../actions'
import { completeGoalRef } from '../firebase'

class CompleteGoalList extends Component {
  componentDidMount() {
    completeGoalRef.on('value', snap => {
      let completeGoals = []
      snap.forEach((completeGoal) => {
        const { email, title } = completeGoal.val() // 沒有val()，看起來會是Object{node:{...}, ref:{...}}
        completeGoals.push({ email, title })
      })
      this.props.setCompleted(completeGoals)
    })
  }
  cleanCompleted() {
    completeGoalRef.set({})
  }
  render() {
    // console.log('this.props.completeGoals', this.props.completeGoals)
    return (
      <div>
        {this.props.completeGoals.map((completeGoal, i) => {
          const { title, email } = completeGoal
          return (
            <div key={i}>
              <strong>{title}</strong> completed by <em>{email}</em>
            </div>
          )
        })}
        <button
          className="btn btn-secondary"
          onClick={() => {
            this.cleanCompleted()
          }}
        >
          Clear All
        </button>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { completeGoals } = state
  return { completeGoals }
}
export default connect(mapStateToProps, { setCompleted })(CompleteGoalList)
