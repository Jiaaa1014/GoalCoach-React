import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { completeGoalRef, goalRef } from '../firebase'

class GoalItem extends Component {
  static propTypes = {
    email: PropTypes.string,
    title: PropTypes.string,
    serverKey: PropTypes.string,
    user: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    goal: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }
  completeGoal() {
    const { email } = this.props.user
    const { title, serverKey } = this.props.goal
    goalRef.child(serverKey).remove()
    completeGoalRef.push({ email, title })
  }
  render() {
    const { email, title } = this.props.goal

    return (
      <div style={{ margin: '5px' }}>
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
    )
  }
}

function mapStateToProps(state) {
  const { user } = state
  console.log('GoalItem', state)
  return { user }
}

export default connect(mapStateToProps, null)(GoalItem)
