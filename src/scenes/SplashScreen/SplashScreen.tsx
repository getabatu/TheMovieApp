import React from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from 'react-navigation-hooks';

import { color } from '../../utils/globalVariable'

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

export function SplashScreen() {
  const navigation = useNavigation();

  setTimeout(() => {
    navigation.navigate('HomeScreen');
  }, 3000);

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: color.backgroundColor }} >
      <Text style={{ fontSize: 25, letterSpacing: 8, fontWeight: '900', color: 'white', marginLeft: 20, alignSelf: 'center' }} >MOVIE APP</Text>
      <Image style={{ width, height: width, resizeMode: 'contain' }} source={require('../../assets/logo.png')} />
    </SafeAreaView>
  );
}
