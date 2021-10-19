import 'react-native-gesture-handler';
import React from 'react';
import { AppContainer } from './src/router/router';
import { StatusBar } from 'react-native';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { initStore } from './src/store';

export default function App() {
  const store = initStore();
  return (
    <Provider store={store}>
      <Root>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <AppContainer />
      </Root>
    </Provider>
  );
}
