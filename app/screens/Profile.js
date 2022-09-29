import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '../../App';

function Profile(props) {
    return (
        <View style={{ backgroundColor: colors.background, flex: 1, alignItems: 'center' }}>
            <View style={{
                width: 370,
                top: 10,
                flex: 0.25,
                flexDirection: 'row',
                backgroundColor: '#242424',
                borderRadius:30
            }}>
                <View style={{
                    flex: 0.35,

                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <View style={{
                        left: 5,
                        height: 120,
                        aspectRatio: 1,
                        borderRadius: 150/2,
                        borderWidth: 5,
                        borderColor: colors.accent
                    }}>
                    </View>
                </View>
                <View style={{
                    flex: 0.6,
                }}>
                    <Text style={{
                        left: 16,
                        top: 30,
                        fontSize: 20,
                        fontFamily: 'MainFont',
                        color: 'white'
                    }}>Nathan Keyt</Text>

                    <Text style={{
                        left: 16,
                        top: 34,
                        fontSize: 15,
                        color: 'white'
                    }}>He/him</Text>
                    <View style={{
                        left: 16,
                        top: 44,
                        width: 210,
                        height: 60,
                    }}>
                        <Text style={{
                            fontSize: 14,
                            color: 'white'
                        }}>
                            Fitness Account, looking to build an app to support peoples 
                            fitness goals and wellbeing!
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{
                top: 20,
                flex:0.5,
                width:370,
                backgroundColor:'#242424',
                borderRadius: 30,
            }}>
                <View style={{
                    flex: 0.15,
                    justifyContent:'flex-end'
                }}>
                    <Text style={{
                        color:'white',
                        fontFamily:'MainFont',
                        fontSize:20,
                        left: 30,
                    }}>
                        Health Info
                    </Text>
                    <View style={{
                        height: 4,
                        top: 5,
                        left: 28,
                        width: 305,
                        backgroundColor:'white'
                    }} />
                </View>
                <View style={{
                    flex: 0.71,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: 17,
                    }}>
                        Not Implemented Yet
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default Profile;