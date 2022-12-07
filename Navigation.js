import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Image,
  StatusBar,
  View,
  Button,
  Animated,
  Easing,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import NavigationPokedex from './NavigationPokedex';
import Som from '../Telas/Som';
// import Favorite from "../screens/Favorite"
// import PokedexScreen from "../screens/Pokedex";

const Tab = createBottomTabNavigator();
let rotateValueHolder = new Animated.Value(0);

export default function Navigation() {
  return (
    <Tab.Navigator
      initialRouteName="Pokedex"
      screenOptions={{ headerShown: false }}
      tabBarOptions={{
        activeTintColor: '#000',
        activeBackgroundColor: '#1ff2d6',
        activeTintColor: '#6b57ff',
        inactiveTintColor: 'grey',
        inactiveBackgroundColor: 'white',
        tabStyle: {
          paddingBottom: 5,
          paddingTop: 5,
        },
      }}>
      <Tab.Screen
        name="Pokedex"
        component={NavigationPokedex}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => renderPokeball(()=> startImageRotateFunction) 
        }}
      />
      <Tab.Screen
        name="Som"
        component={Som}
        options={{ tabBarLabel: '', tabBarIcon: () => renderToca() }}
      />
    </Tab.Navigator>
  );
}



const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };

  const RotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

function renderToca() {
  return (
    <View>
      <TouchableOpacity>
        <Image
          source={require('../assets/pokemon-logo-8.png')}
          style={{ width: 110, height: 40, top: -5 }}
        />
      </TouchableOpacity>
    </View>
  );
}


function renderPokeball() {
  return (
    /*<TouchableHighlight
      //onPress={startImageRotateFunction}
      //style={styles.buttonStyle}>
      <Animated.Image
        style={{
          width: 55,
          height: 55,
          top: -5,
          transform: [{ rotate: RotateData }],
        }}
        source={require('../assets/pokebola.png')}
      />
    </TouchableHighlight>*/
    <Animated.Image
      source={require('../assets/pokebola.png')}
      style={{
        width: 55,
        height: 55,
        top: -5,
        transform: [{ rotate: RotateData }],
      }}
    />
  );
}
