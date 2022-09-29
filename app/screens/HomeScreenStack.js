import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import ExerciseEditor from './ExerciseEditor';
import RoutineEditor from './RoutineEditor';

const Stack = createStackNavigator();

function HomeScreenStack(props) {
    return (
        <Stack.Navigator initialRouteName={"Workouts"}>
            <Stack.Screen options={{ headerStyle: { backgroundColor: '#191919' }, headerTitleStyle: { color: 'white' }, headerShadowVisible: false }} name="Workouts" component={HomeScreen} />
            <Stack.Screen options={{ headerStyle: { backgroundColor: '#191919' }, headerTitleStyle: { color: 'white' }, headerShadowVisible: false }} name="Workout Schedule Editor" component={RoutineEditor} />
            <Stack.Screen options={{ headerStyle: { backgroundColor: '#191919' }, headerTitleStyle: { color: 'white' }, headerShadowVisible: false }} name="Exercise Editor" component={ExerciseEditor} />
        </Stack.Navigator>
    );
}

export default HomeScreenStack;