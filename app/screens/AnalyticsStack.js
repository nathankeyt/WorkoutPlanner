import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Analytics from './Analytics';

const Stack = createStackNavigator();

function AnalyticsStack(props) {
    return (
        <Stack.Navigator initialRouteName={"Analytics"}>
            <Stack.Screen options={{ headerStyle: { backgroundColor: '#191919' }, headerTitleStyle: { color: 'white' }, headerShadowVisible: false }} name="Analytics" component={Analytics} />
        </Stack.Navigator>
    );
}

export default AnalyticsStack;