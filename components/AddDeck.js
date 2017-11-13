import React, { Component } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
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

class AddDeck extends Component {
  state = {
    title: ''
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({key: 'AddDeck'}))
  }

  submit = () => {
    saveDeckTitle(this.state.title);
    
    // TODO: Update the Redux Store

    this.toHome()
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
    backgroundColor: red,
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

function mapStateToProps (state) {
  return {}
}

export default connect(
  mapStateToProps
)(AddDeck)
