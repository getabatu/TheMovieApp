import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { HomeScreen, SplashScreen, InfoScreen } from '../scenes';
import { createAppContainer } from 'react-navigation';

import TabComponent from "../components/tab/tabComponent";

const TabNavigator = createBottomTabNavigator({
  HomeScreen: { screen: HomeScreen },
  InfoScreen: { screen: InfoScreen },
}, {
  tabBarComponent: TabComponent,
  // swipeEnabled: true
})

const MainNavigator = createStackNavigator(
  {
    SplashScreen: { screen: SplashScreen },
    MainScreen: { screen: TabNavigator }
  }, {
  mode: 'modal',
  headerMode: 'none',
});

export const AppContainer = createAppContainer(MainNavigator);
