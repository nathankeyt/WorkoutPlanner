import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './Profile';

const Stack = createStackNavigator();

function ProfileStack(props) {
    return (
        <Stack.Navigator initialRouteName={"Profile"}>
            <Stack.Screen options={{ headerStyle: { backgroundColor: '#191919' }, headerTitleStyle: { color: 'white' }, headerShadowVisible: false }} name="Profile" component={Profile} />
        </Stack.Navigator>
    );
}

export default ProfileStack;