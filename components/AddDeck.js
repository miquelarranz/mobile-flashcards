import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { blue, white } from '../utils/colors'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'


function SubmitButton ({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Add Deck</Text>
    </TouchableOpacity>
  )
}

class AddDeck extends Component {
  state = {
    title: ''
  }

  toTheDetail = () => {
    this.props.navigation.navigate(
      'DeckDetail',
      { deckId: this.state.title }
    )
  }

  submit = () => {
    let { title } = this.state

    this.props.dispatch(addDeck(title))

    saveDeckTitle(title)

    this.toTheDetail()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Type the name of your new deck</Text>
        <TextInput
          style={{height: 40}}
          placeholder="Awesome Deck"
          onChangeText={(title) => this.setState({title})}
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

export default connect()(AddDeck)
