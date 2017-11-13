import { AsyncStorage } from 'react-native'

export const STORAGE_KEY = 'mobile-flashcards:storage'

export function getDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      return (results === null) ? {} : JSON.parse(results);
    })
}

export function getDeck (deckId) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      if (results === null) return {};
      else {
        let decks = JSON.parse(results);
        return decks[deckId];
      }
    })
}

export function saveDeckTitle (title) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      let decks = (results) ? JSON.parse(results) : {};
      decks[title] = {title: title, questions: []};
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    })
}

export function addCardToDeck (deckId, question, answer) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      let decks = JSON.parse(results);
      decks[deckId].questions.push({question: question, answer: answer});
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decks));
    })
}
