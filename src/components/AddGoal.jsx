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
        <div className="form-group">
          <input
            type="text"
            placeholder="Add a Goal"
            className="form-control"
            style={{ marginRight: '5px' }}
            onChange={(e) => {
              this.setState({ title: e.target.value })
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') this.addGoal()
            }}
          />
          <button
            type="button"
            className="btn btn-success"
            onClick={() => this.addGoal()}
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
