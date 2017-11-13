import { RECEIVE_DECKS, ADD_DECK } from '../actions'

function decks (state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS :
      return {
        ...state,
        ...action.decks,
      }
    case ADD_DECK :
      const deck = {title: action.title, questions: []}
      return {
        ...state,
        [action.title]: deck
      }
    default :
      return state
  }
}

export default decks
