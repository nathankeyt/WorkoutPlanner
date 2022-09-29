import React, { createContext, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text, Button, Pressable } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreenStack from './HomeScreenStack';


const userData = {
    isSignedIn: false,
};

const correctUser = "Nathan"
const correctPassword = "Keyt"

export const UserDataContext = createContext(userData);

function WelcomeScreen({ }) {
    const [text, onChangeText] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const [signedIn, setSignedIn] = React.useState(false);

    return (
        <View style={styles.content}>
            <View style={styles.containerLogIn}>
                <Text style={styles.text}> Log In </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Username or email"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={password}
                    placeholder="Password"
                    secureTextEntry={true}
                />
                <Pressable
                    onPressOut={() => {
                        if (text === correctUser && password === correctPassword) {

                        }
                    }}
                >
                    {({ pressed }) => (
                        <View style={{
                            width: 150,
                            height: 50,
                            backgroundColor: pressed ? "grey" : "lightgrey",
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 10
                        }}
                        >
                            <Text>Submit</Text>
                        </View>
                    )}

                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        padding: 10,
        borderWidth: 1,
        height: 50,
        width: 270,
        borderRadius: 10
    },
    text: {
        fontSize: 30
    },
    containerLogIn: {
        bottom: 50,
        height: 250,
        width: 270,
        justifyContent: 'space-evenly'
    }
})

export default WelcomeScreen;


