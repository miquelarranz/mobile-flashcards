import React from 'react';
import { StyleSheet, Text, View, StatusBar} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import { Constants } from 'expo'

import { red } from './utils/colors';
import AddDeck from './components/AddDeck'
import DeckList from './components/DeckList'

function MobileFlashcardsStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight, opacity: 0.6 }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <MobileFlashcardsStatusBar backgroundColor={red} barStyle="light-content" />
          <AddDeck />
        </View>
      </Provider>
    )
  }
}
