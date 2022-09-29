import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View, Animated, TextInput, FlatList, TouchableOpacity, Modal, Alert, Button } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors, currentDay } from '../../App';

function Routine({ item, routinesData, setRoutinesData }) {
    return (
        <View style={{
            borderWidth: 1,
            width: 350,
            height: 50,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderColor: colors.accent
        }}>
            <Text style={{
                fontFamily: 'MainFont',
                fontSize: 19,
                left: 14,
                color: 'white'
            }}>{item.name}</Text>
            <Pressable style={{ right: 14 }} onPress={() => { const updatedArray = [...routinesData]; updatedArray.splice(updatedArray.indexOf(item), 1); setRoutinesData(updatedArray); }}>
                <Text style={{ fontSize: 14, color: 'white' }}>X</Text>
            </Pressable>
        </View>
    );
}

function HomeScreen({ route, navigation }) {
    const [isAdding, setIsAdding] = useState(false);
    const [isExercise, setIsExercise] = useState(false);
    const [exerciseData, setExerciseData] = useState({});
    const [routineData, setRoutineData] = useState();
    const [routinesData, setRoutinesData] = useState([]);
    const [isSetup, setIsSetup] = useState(false);
    const [routinesData2, setRoutinesData2] = useState([]);
    
    function setUpScheduledRoutines() {
        let updatedArray = [];
        routinesData.forEach(forEachRoutine);
        setRoutinesData2(updatedArray);

        function forEachRoutine(currentValue) {
            currentValue.data.forEach(forEachWorkout)
            function forEachWorkout(currVal) {
                if ((currVal.day == currentDay.weekday || currVal.day == currentDay.num)) {
                    updatedArray.push(currVal);
                }
            }  
        }
    }

    useEffect(() => {
        if (isSetup) {
            const updatedArray = [...routinesData, routineData];
            setRoutinesData(updatedArray);
        }
        else
            setIsSetup(true);
    }, [routineData])

    useEffect(() => {
        setUpScheduledRoutines();
    }, [routinesData, currentDay])

    useEffect(() => {
        if (route.params?.routineData) {
            setRoutineData(route.params.routineData);
        }
    }, [route.params?.routineData]);

    const renderItem = ({ item }) => (
        <View style={{ paddingBottom: 10 }}>
            <Routine item={item} routinesData={routinesData} setRoutinesData={setRoutinesData} />
        </View>
    );

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <View style={{ top: 30, left: 20 }}>
                <Text style={{
                    fontSize: 22,
                    width: 300,
                    color: 'white',
                    position: 'absolute',
                    fontFamily: 'MainFont',
                }}>
                    Scheduled Workouts
                </Text>
                <View style={{ top: 30, width: 350, height: 5, backgroundColor: colors.accent, borderRadius: 0 }} />
                <FlatList style={{
                        top: 45
                    }}
                        data={routinesData2}
                        renderItem={renderItem}
                        keyExtractor={item => item.name}
                    />    
            </View>
            <View style={{top: 70, flex: 1}}>
                <View style={{ top: 30, left: 20 }}>
                    <Text style={{
                        fontSize: 22,
                        width: 300,
                        color: 'white',
                        position: 'absolute',
                        fontFamily: 'MainFont',
                    }}>
                        Workout Schedules
                    </Text>
                    <View style={{ top: 30, width: 350, height: 5, backgroundColor: colors.accent, borderRadius: 0 }} />
                </View>
                <View style={{ flex: 0.88 }}>
                    <FlatList style={{
                        top: 80,
                        left: 20,
                    }}
                        data={routinesData}
                        renderItem={renderItem}
                        keyExtractor={item => item.name}
                        ListFooterComponent={<RoutineAdder setIsAdding={setIsAdding} />}
                    />
                </View>
            </View>
        </View>
    );
}

function RoutineAdder({ setIsAdding }) {
    const [isAdded, setIsAdded] = useState(false);
    const navigation = useNavigation();

    return (
        <Pressable style={{ paddingBottom: 10, }}
            onPressOut={() => { setIsAdding(true); navigation.navigate('Workout Schedule Editor'); }}
        >
            {isAdded ? (
                <View></View>
            )
                :
                (
                    ({ pressed }) => (
                        <View style={{
                            backgroundColor: colors.accent,
                            width: 350,
                            height: 50,
                            borderRadius: 15,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: pressed ? 0.9 : 0.5
                        }}
                        >
                            <Text style={{
                                color: 'darkgreen',
                                fontSize: 20,
                            }}>
                                +
                            </Text>
                        </View>))}
        </Pressable>
    );
}

export default HomeScreen;