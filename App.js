import React, { createContext } from 'react';
import { useState } from 'react';
import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createStackNavigator, StackView } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreenStack from './app/screens/HomeScreenStack';
import WelcomeScreen from './app/screens/WelcomeScreen';
import { UserDataContext } from './app/screens/WelcomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useFonts } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
import Profile from './app/screens/Profile';
import ProfileStack from './app/screens/ProfileStack';
import AnalyticsStack from './app/screens/AnalyticsStack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Tab = createMaterialBottomTabNavigator();

export const colors = {
  background: '#1E1E1E',
  accent: '#5FC550',
}

export const currentDay = {
  weekday: 'sunday',
  num: (new Date().getDay()) + 1,
}

export default function App(props) {
  const [loaded] = useFonts({
    MainFont: require('./app/assets/ArialBold.ttf')
  })

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator barStyle={{ backgroundColor: '#191919' }} style={{ borderRadius: 5 }} initialRouteName={" Workouts "} screenOptions={{ headerShown: false }}>
        <Tab.Screen options={{tabBarIcon: ({focused}) => {return <FontAwesome5 name={"dumbbell"} solid color={'white'} size={20} ></FontAwesome5>}}} name=" Workouts " component={HomeScreenStack} />
        <Tab.Screen options={{tabBarIcon: ({focused}) => {return <FontAwesome5 name={"chart-bar"} color={'white'} size={23} ></FontAwesome5>}}} name=" Analytics " component={AnalyticsStack} />
        <Tab.Screen options={{tabBarIcon: ({focused}) => {return <FontAwesome5 name={"user"} solid color={'white'} size={20} ></FontAwesome5>}}} name=" Profile " component={ProfileStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

