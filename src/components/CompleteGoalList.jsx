import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setCompleted } from '../actions'
import { completeGoalRef } from '../firebase'

class CompleteGoalList extends Component {
  static propTypes = {
    setCompleted: PropTypes.func.isRequired,
    completeGoals: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
  }
  componentDidMount() {
    completeGoalRef.on('value', (snap) => {
      const completeGoals = []
      snap.forEach((completeGoal) => {
        const { email, title } = completeGoal.val()
        completeGoals.push({ email, title })
      })
      this.props.setCompleted(completeGoals)
    })
  }
  cleanCompleted() {
    completeGoalRef.set({})
  }

  render() {
    return (
      <div>
        {this.props.completeGoals.map((completeGoal, i) => {
          const { title, email } = completeGoal
          return (
            <div key={i}>
              <span className="item-name">{`${title} `}</span>
              <span className="item-who">completed by <em>{`－${email}`}</em></span>
            </div>
          )
        })}
        <button
          className="btnClean"
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
