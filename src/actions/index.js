import { SIGNED_IN, SET_GOALS, SET_COMPLETED } from '../constants'

export function logUser(email) {
  const actions = {
    type: SIGNED_IN,
    email
  }
  return actions
}

export function setGoals(goals) {
  const actions = {
    type: SET_GOALS,
    goals
  }
  return actions
}

export function setCompleted(completeGoals) {
  const actions = {
    type: SET_COMPLETED,
    completeGoals
  }
  return actions
}
