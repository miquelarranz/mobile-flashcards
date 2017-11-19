import React, { Component } from 'react'
import { View, FlatList, Text, StyleSheet, Platform, Animated } from 'react-native'
import { saveDeckTitle } from '../utils/api'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import { List, ListItem } from "react-native-elements";

import { red, white, black } from '../utils/colors'
import { getDecks } from '../utils/api'
import { receiveDecks } from '../actions'
import { AppLoading} from 'expo'

class DeckList extends Component {
  state = {
    ready: false,
    animatedValue: new Animated.Value(1)
  }

  componentDidMount () {
    const { dispatch } = this.props

    getDecks()
      .then((decks) => dispatch(receiveDecks(decks)))
      .then(() => this.setState(() => ({ready: true})))
  }

  moveToDetail = (item) => {
    const { animatedValue } = this.state

    Animated.sequence([
      Animated.timing(animatedValue, { duration: 200, toValue: 0}),
      Animated.timing(animatedValue, { duration: 1000, toValue: 1})
    ]).start()

    setTimeout(() => {
      this.props.navigation.navigate(
        'DeckDetail',
        { deckId: item.title }
      )
    }, 200)
  }

  render() {
    const { decks } = this.props
    const { ready, animatedValue } = this.state

    if (ready === false) {
      return <AppLoading />
    }

    return (
      <Animated.View style={[styles.container, {opacity: animatedValue}]}>
        <Text style={styles.title}>Decks</Text>
        {decks.length > 0 &&
          <List>
            <FlatList
              data={decks}
              renderItem={({item}) =>
                <ListItem
                  title={item.title}
                  subtitle={`Number of cards: ${item.questions.length}`}
                  onPress={() => {
                    this.moveToDetail(item)
                  }}
                />
              }
            />
          </List>
        }
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white
  },
  title: {
    padding: 20,
    fontSize: 25,
    fontWeight: 'bold'
  },
})

function mapStateToProps (decks) {
  return {
    decks: Object.values(decks)
  }
}

export default connect(
  mapStateToProps
)(DeckList)
