import { RECEIVE_DECKS, ADD_DECK, ADD_CARD } from '../actions'

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
    case ADD_CARD:
      return {
        ...state,
        [action.deckId]: {
          ...state[action.deckId],
          questions: [
            ...state[action.deckId].questions,
            {question: action.question, answer: action.answer}
          ]
        }
      }
    default :
      return state
  }
}

export default decks
