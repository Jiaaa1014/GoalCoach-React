import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { goalRef } from '../firebase'
import { setGoals } from '../actions'
import GoalItem from './GoalItem'

class GoalList extends Component {
  static propTypes = {
    setGoals: PropTypes.func.isRequired,
    goals: PropTypes.array.isRequired // eslint-disable-line react/forbid-prop-types
  }
  /* eslint-disable */
  componentDidMount() {
    goalRef.on('value', (snap) => {
      const goals = []
      snap.forEach((goal) => {
        const { email, title } = goal.val()
        const serverKey = goal.ref.path.pieces_[1]
        goals.push({ email, title, serverKey })
      })
      this.props.setGoals(goals)
    })
  }
  render() {
    return (
      <div>
        {this.props.goals.map((goal, i) => {
          return (
            <GoalItem key={i} goal={goal} />
          )
        })}
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { goals } = state
  return { goals }
}

export default connect(mapStateToProps, { setGoals })(GoalList)
