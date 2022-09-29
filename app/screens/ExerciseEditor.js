import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import reactDom from 'react-dom';
import { View, TextInput, Text, Pressable, FlatList, Button } from 'react-native';
import { color } from 'react-native-reanimated';

const colors = {
    background: '#1E1E1E',
    accent: '#5FC550'
}

let DATA = [];

let exerciseID = '';

function AddSet({ reps, weight, setRepNumber, setWeightVal, setSetNumber }) {
    return (
        <View>
            <View style={{
                flexDirection: 'row',
                width: '100%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                <Pressable style={{

                }}
                    onPressOut={() => {
                        if (weight == null) {
                            weight = 0;
                            setWeightVal('0');
                        }
                        else if (DATA.length != 0) {
                            weight = DATA[DATA.length - 1].weightVal;
                        }
                        if (reps == null) {
                            reps = 0;
                            setRepNumber('0');
                        }
                        else if (DATA.length != 0) {
                            reps = DATA[DATA.length - 1].reps;
                        }
                        DATA.push({ id: DATA.length + 1, reps: reps, weightVal: weight });
                        setSetNumber(DATA.length)
                    }}
                >
                    {({ pressed }) => (
                        <View style={{
                            backgroundColor: colors.accent,
                            width: 220,
                            height: 35,
                            opacity: pressed ? 0.9 : 0.65,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ color: 'darkgreen', fontSize: 12 }}>
                                Add Set
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>
            <View style={{
                flexDirection: 'row',
                width: '100%',
                height: 50,
                bottom: 7,
                alignItems: 'center',
                justifyContent: 'space-around'
            }}>
                <Pressable style={{

                }}
                    onPressOut={() => {
                        if (DATA != null) {
                            DATA.pop();
                            setSetNumber(DATA.length)
                        }
                    }}
                >
                    {({ pressed }) => (
                        <View style={{
                            backgroundColor: colors.accent,
                            width: 220,
                            height: 35,
                            opacity: pressed ? 0.9 : 0.65,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ color: 'darkgreen', fontSize: 12 }}>
                                Remove Set
                            </Text>
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    );
}

function Item({ item }) {
    const [repNum, setRepNum] = useState(item.reps.toString());
    const [weight, setWeight] = useState(item.weightVal.toString());

    useEffect(() => {
        if (repNum != null) {
            DATA[item.id - 1].reps = parseInt(repNum);
        }
        else {
            DATA[item.id - 1].reps = 0;
        }
    }, [repNum]);

    useEffect(() => {
        if (weight != null) {
            DATA[item.id - 1].weightVal = parseInt(weight);
        }
        else {
            DATA[item.id - 1].weightVal = 0;
        }
    }, [weight]);


    return (
        <View style={{
            flexDirection: 'row',
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'space-around'
        }}>
            <Text style={{ color: 'white' }}>
                {item.id}:
            </Text>
            <TextInput style={{
                height: 35,
                width: 35,
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                textAlign: 'center',
                fontSize: 15,
                borderColor: colors.accent,
                color: 'white'
            }}
                onChangeText={setRepNum}
                value={repNum}
                placeholder="#"
                keyboardType='numeric'
                placeholderTextColor='grey'
            />
            <TextInput style={{
                height: 35,
                width: 60,
                borderWidth: 1,
                borderRadius: 10,
                padding: 5,
                textAlign: 'center',
                fontSize: 15,
                borderColor: colors.accent,
                color: 'white'
            }}
                onChangeText={setWeight}
                value={weight}
                placeholder="#"
                keyboardType='numeric'
                placeholderTextColor='grey'
            />
        </View>
    );
}


function ExerciseEditor() {
    const [exercise, setExercise] = useState(null);
    const [setNumber, setSetNumber] = useState(null);
    const [repNumber, setRepNumber] = useState(null);
    const [weight, setWeight] = useState(null);
    const [isTemplateMade, setIsTemplateMade] = useState(false);

    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Button onPress={() => { navigation.navigate('Workout Schedule Editor', { modalVisible: true }) }} title="Routines" />
            ),
            headerRight: () => (
                <Button onPress={() => { navigation.navigate('Workout Schedule Editor', { exerciseData: { name: exerciseID, data: DATA }, modalVisible: true }) }} title="Add   " />
            ),
        });
    }, [navigation]);


    const makeSetUp = (set, rep, weightNum) => {
        for (var i = 0; i < set; i++) {
            DATA.push({ id: i + 1, reps: rep, weightVal: weightNum })
        }
        setIsTemplateMade(true);
    }

    const renderItem = ({ item }) => (
        <Item item={item} />
    );

    useEffect(() => {
        exerciseID = exercise;
    }, [exercise]);

    useEffect(() => {
        return function cleanup() {
            DATA = [];
        }
    }, []);

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <TextInput style={{
                left: 15,
                fontFamily: 'MainFont',
                fontSize: 20,
                top: 15,
                padding: 15,
                borderRadius: 15,
                borderWidth: 1,
                borderColor: colors.accent,
                width: '80%',
                color: 'white'
            }}
                onChangeText={setExercise}
                value={exercise}
                placeholder="Exercise Name"
                placeholderTextColor='grey'
            />
            {isTemplateMade ? (
                <View style={{ flex: 0.955 }}>
                    <View style={{
                        flexDirection: 'row',
                        width: '100%',
                        right: 20,
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        top: 30,
                    }}>
                        <Text style={{ fontFamily: 'MainFont', color: 'white' }}>Set</Text>
                        <Text style={{ fontFamily: 'MainFont', color: 'white' }}>Reps</Text>
                        <Text style={{ fontFamily: 'MainFont', color: 'white' }}>Weight</Text>
                    </View>
                    <FlatList style={{
                        top: 30,
                        right: 7
                    }}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListFooterComponent={<AddSet reps={repNumber} weight={weight} setRepNumber={setRepNumber} setWeightVal={setWeight} setSetNumber={setSetNumber} />}
                    />
                </View>
            ) : (
                <View>
                    <Text style={{
                        top: 30,
                        left: 10,
                        fontSize: 20,
                        fontFamily: 'MainFont',
                        color: 'white'
                    }}> Set Standard Template: </Text>
                    <View style={{ height: 50, width: '100%', flexDirection: 'row', top: 25, alignItems: 'flex-end', justifyContent: 'space-evenly' }}>
                        <TextInput style={{
                            height: 35,
                            width: 35,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: colors.accent,
                            padding: 5,
                            textAlign: 'center',
                            fontSize: 15,
                            color: 'white'
                        }}
                            onChangeText={setSetNumber}
                            value={setNumber}
                            placeholder="#"
                            keyboardType='numeric'
                            defaultValue=''
                            placeholderTextColor='grey'
                        >
                        </TextInput>
                        <Text style={{ fontSize: 20, fontFamily: 'MainFont', color: 'white' }}>sets</Text>
                        <Text style={{ fontSize: 20, fontFamily: 'MainFont', color: 'white' }}>X</Text>
                        <TextInput style={{
                            height: 35,
                            width: 35,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: colors.accent,
                            padding: 5,
                            textAlign: 'center',
                            fontSize: 15,
                            color: 'white'
                        }}
                            onChangeText={setRepNumber}
                            value={repNumber}
                            placeholder="#"
                            keyboardType='numeric'
                            defaultValue=''
                            placeholderTextColor='grey'
                        >
                        </TextInput>
                        <Text style={{ fontSize: 20, fontFamily: 'MainFont', color: 'white' }}>reps</Text>
                        <Text style={{ fontSize: 20, fontFamily: 'MainFont', color: 'white' }}>at</Text>
                        <TextInput style={{
                            height: 35,
                            width: 45,
                            borderWidth: 1,
                            borderRadius: 10,
                            borderColor: colors.accent,
                            padding: 5,
                            textAlign: 'center',
                            fontSize: 15,
                            color: 'white'
                        }}
                            onChangeText={setWeight}
                            value={weight}
                            placeholder="num"
                            keyboardType='numeric'
                            defaultValue=''
                            placeholderTextColor='grey'
                        >
                        </TextInput>
                        <Text style={{ fontSize: 20, fontFamily: 'MainFont', color: 'white' }}>lbs</Text>
                    </View>
                    <View style={{
                        top: 40,
                        left: 15,
                        width: 170,
                        height: 100,
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}>
                        <Pressable style={{

                        }}
                            onPressOut={() => makeSetUp(parseInt(setNumber), parseInt(repNumber), parseInt(weight))}
                        >
                            {({ pressed }) => (
                                <View style={{
                                    backgroundColor: colors.accent,
                                    width: 170,
                                    height: 35,
                                    opacity: pressed ? 0.9 : 0.65,
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: 'darkgreen', fontSize: 12 }}>
                                        Make Template
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                        <Text style={{
                            color: 'white'
                        }}>
                            or
                        </Text>
                        <Pressable style={{

                        }}
                            onPressOut={() => makeSetUp(0, 0, 0)}
                        >
                            {({ pressed }) => (
                                <View style={{
                                    backgroundColor: colors.accent,
                                    width: 170,
                                    height: 35,
                                    opacity: pressed ? 0.9 : 0.65,
                                    borderRadius: 15,
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={{ color: 'darkgreen', fontSize: 12 }}>
                                        Start Without Template
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    </View>
                </View>
            )
            }
        </View>
    );
}

export default ExerciseEditor;