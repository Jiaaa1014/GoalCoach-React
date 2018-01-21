import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { goalRef } from '../firebase'

class AddGoal extends Component {
  static propTypes = {
    email: PropTypes.string,
    user: PropTypes.object.isRequired // eslint-disable-line react/forbid-prop-types
  }
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }
  addGoal() {
    const { title } = this.state
    const { email } = this.props.user
    goalRef.push({ email, title })
  }
  render() {
    return (
      <div className="form-inline">
        <div className="form-group add-item">
          <input
            type="text"
            placeholder="Add a Goal"
            className="form-control"
            onChange={(e) => {
              this.setState({ title: e.target.value })
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter' && e.target.value) this.addGoal()
            }}
          />
          <button
            type="button"
            className="btnAdd"
            onClick={(e) => {
              if (e.target.value) this.addGoal()
            }}
          >
            Add it
          </button>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { user } = state
  return { user }
}
export default connect(mapStateToProps, null)(AddGoal)
