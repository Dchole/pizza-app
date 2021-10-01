export const initialState = {
  small: 0,
  medium: 0,
  large: 0
}

export type TState = typeof initialState
type TAction = {
  type: "INCREMENT" | "DECREMENT" | "SET_QUANTITY"
  size: "small" | "medium" | "large"
  quantity?: number
}

const sizeReducer = (state = initialState, action: TAction) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, [action.size]: state[action.size] + 1 }

    case "DECREMENT":
      return { ...state, [action.size]: state[action.size] - 1 }

    case "SET_QUANTITY":
      return { ...state, [action.size]: action.quantity }

    default:
      return state
  }
}

export default sizeReducer
