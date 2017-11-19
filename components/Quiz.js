import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput, Animated } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Button } from 'react-native-elements'
import { clearLocalNotification, setLocalNotification } from '../utils/helpers'

import { green, red, grey, blue, white, pink } from '../utils/colors'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

class Quiz extends Component {
  state = {
    currentCard: 0,
    correctAnswers: 0,
    showAnswer: false,
    animatedValue: new Animated.Value(1)
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId + ' Quiz'
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { showAnswer, animatedValue } = this.state

    if (showAnswer !== prevState.showAnswer) {
      Animated.timing(animatedValue, { duration: 500, toValue: 1}).start()
    }
  }

  correctAnswer = () => {
    let { currentCard, correctAnswers } = this.state

    this.setState(() => ({
      currentCard: currentCard + 1,
      correctAnswers: correctAnswers + 1,
      showAnswer: false
    }))
  }

  incorrectAnswer = () => {
    let { currentCard } = this.state

    this.setState(() => ({
      currentCard: currentCard + 1,
      showAnswer: false
    }))
  }

  toTheDetail = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  resetQuiz = () => {
    this.setState(() => ({
      currentCard: 0,
      correctAnswers: 0
    }))
  }

  setLocalNotification = () => {
    clearLocalNotification()
      .then(setLocalNotification)
  }

  showAnswer = () => {
    const { animatedValue } = this.state

    Animated.timing(animatedValue, { duration: 500, toValue: 0}).start()

    setTimeout(() => {
      this.setState(() => ({
        showAnswer: true
      }))
    }, 500)
  }

  render() {
    const { deckId, decks } = this.props
    const { currentCard, correctAnswers, showAnswer, animatedValue } = this.state

    let deck = decks.filter(deck =>
      deckId === deck.title
    )[0]

    if (deck.questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.medium}>Please, add some cards first</Text>

          <Button
            raised
            backgroundColor={blue}
            title='Back to Deck'
            onPress={this.toTheDetail}
          />
        </View>
      )
    }

    if (currentCard >= deck.questions.length) {

      this.setLocalNotification()

      return (
        <View style={styles.container}>
          <Text style={styles.medium}>You have answered correctly {correctAnswers} of {deck.questions.length}</Text>

          <View style={styles.button}>
            <Button
              raised
              backgroundColor={blue}
              title='Back to Deck'
              onPress={this.toTheDetail}
            />
          </View>
          <View>
            <Button
              raised
              backgroundColor={pink}
              icon={{name: 'cached'}}
              title='Restart Quiz'
              onPress={this.resetQuiz}
            />
          </View>
        </View>
      )
    }

    return (
      <Animated.View style={[styles.container, {opacity: animatedValue}]}>
        <Text style={styles.counter}>{currentCard + 1} / {deck.questions.length}</Text>

        {!showAnswer &&
          <View>
            <Text style={styles.title}>{deck.questions[currentCard].question}</Text>
            <Text style={styles.showAnswer} onPress={this.showAnswer}>Show answer</Text>
          </View>
        }
        {showAnswer &&
          <Text style={styles.title}>The answer is: {deck.questions[currentCard].answer}</Text>
        }

        <View style={styles.button}>
          <Button
            raised
            backgroundColor={green}
            title='Correct'
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { deckId: deck.title }
            )}
            onPress={this.correctAnswer}
          />
        </View>
        <View>
          <Button
            raised
            backgroundColor={red}
            title='Incorrect'
            onPress={this.incorrectAnswer}
          />
        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  counter: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'left',
    color: grey
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  showAnswer: {
    fontSize: 22,
    fontWeight: 'bold',
    color: blue,
    marginBottom: 25,
    textAlign: 'center'
  },
  button: {
    marginBottom: 15
  },
  medium: {
    fontSize: 22,
    color: grey,
    marginBottom: 25,
    textAlign: 'center'
  }
})

function mapStateToProps (decks, { navigation }) {
  const { deckId } = navigation.state.params

  return {
    deckId,
    decks: Object.values(decks)
  }
}

export default connect(
  mapStateToProps
)(Quiz)
