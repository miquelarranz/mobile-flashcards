import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { Button } from 'react-native-elements'

import { pink, white, blue, grey } from '../utils/colors'
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

class DeckDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckId } = navigation.state.params

    return {
      title: deckId
    }
  }

  render() {
    const { deckId, decks } = this.props

    let deck = decks.filter(deck =>
      deckId === deck.title
    )[0]

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={styles.cards}>This deck has: {deck.questions.length} cards</Text>

        <View style={styles.addButton}>
          <Button
            raised
            backgroundColor={blue}
            icon={{name: 'plus-one'}}
            title='Add Card'
            onPress={() => this.props.navigation.navigate(
              'AddCard',
              { deckId: deck.title }
            )}
          />
        </View>
        <View>
          <Button
            raised
            backgroundColor={pink}
            icon={{name: 'cached'}}
            title='Start the quiz'
          />
        </View>
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
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  cards: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: grey
  },
  addButton: {
    marginBottom: 15
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
)(DeckDetail)
