import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { blue, white } from '../utils/colors'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'


function SubmitButton ({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Add Card</Text>
    </TouchableOpacity>
  )
}

class AddCard extends Component {
  state = {
    question: '',
    answer: ''
  }

  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: 'Add a card (' + deckId + ')'
    }
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back())
  }

  submit = () => {
    let { question, answer } = this.state
    let deckId = this.props.navigation.state.params.deckId

    this.props.dispatch(addCard(deckId, question, answer))

    addCardToDeck(deckId, question, answer);

    this.toHome()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Type the name of your new card</Text>
        <TextInput
          style={{height: 40}}
          placeholder="What is a component?"
          onChangeText={(question) => this.setState({question})}
        />
        <TextInput
          style={{height: 40}}
          placeholder="A component is..."
          onChangeText={(answer) => this.setState({answer})}
        />

        <SubmitButton onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: white
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20
  },
  button: {
    backgroundColor: blue,
    marginTop: 20,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2
  },
  buttonText: {
    color: white,
    fontSize: 18,
    textAlign: 'center',
  },
})

export default connect()(AddCard)
