import React, { Component } from 'react';
import { SafeAreaView, createNavigationContainer } from 'react-navigation';
import { View } from 'react-native';
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import Home from './components/home'
import Room from './components/room'
const appNav=createStackNavigator({
  Home:{screen:Home},
  Room:{screen:Room},
})

const Stack=createAppContainer(appNav);

class App extends Component {
  state = { 
  }

  constructor(props)
  {
    super(props)
  }
  render() { 
    return (
      <Stack />
      );
  }
}
 
export default App;