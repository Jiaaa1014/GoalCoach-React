import { SIGNED_IN, SET_GOALS, SET_COMPLETED } from '../constants'

export const logUser = (email) => {
  const actions = {
    type: SIGNED_IN,
    email
  }
  console.log(actions)
  return actions
}

export const setGoals = (goals) => {
  const actions = {
    type: SET_GOALS,
    goals
  }
  return actions
}

export const setCompleted = (completeGoals) => {
  const actions = {
    type: SET_COMPLETED,
    completeGoals
  }
  return actions
}
