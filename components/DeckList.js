import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { red, white } from '../utils/colors'


function SubmitButton ({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Add Deck</Text>
    </TouchableOpacity>
  )
}

class DeckList extends Component {

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }

  submit = () => {
    // TODO: Get title
    // TODO: Add the new deck to the DB
    // TODO: Update the Redux Store

    this.toHome()
  }

  render() {

    return (
      <View style={styles.container}>

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
    fontSize: 30,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: red,
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: white,
    fontSize: 22,
    textAlign: 'center',
  },
})

function mapStateToProps (state) {

}

export default connect(
  mapStateToProps
)(DeckList)
