import { useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View, Animated, TextInput, FlatList, TouchableOpacity, Modal, Alert, Button } from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors, currentDay } from '../../App';
import DropDownPicker from 'react-native-dropdown-picker'

let DATA = [];

let routineID = '';

function Routine({ item, routinesData, setRoutinesData, isNumRotation, numDaysRotation}) {
    const [day, setDay] = useState(null);

    useEffect(() => {
        item.day = day;
    }, [day]);

    return (
        <View style={{
            borderWidth: 1,
            width: 350,
            height: 50,
            borderRadius: 15,
            alignItems: 'center',
            flexDirection: 'row',
            borderColor: colors.accent
        }}>
            <Text style={{
                fontFamily: 'MainFont',
                fontSize: 19,
                left: 14,
                color: 'white'
            }}>{item.name}</Text>
            <View style={{top: 12, position: 'absolute', flexDirection:'row', justifyContent: 'center', alignItems:'center', left: 180}}>
                <Text style={{
                    color: colors.accent
                }}>
                    Scheduled Day:
                </Text>
                <TextInput style={{
                                right: 1,
                                width: 25,
                                height: 25,
                                borderWidth: 0,
                                borderColor: colors.accent,
                                borderRadius: 5,
                                color: 'white',
                                justifyContent: 'center',
                                textAlign: 'center',
                                alignItems: 'center'
                            }}
                            onChangeText={setDay}
                            value={day}
                            placeholder="#"
                            placeholderTextColor='grey' />
            </View>
            <Pressable style={{ left: 325, position: 'absolute',  }} onPress={() => { const updatedArray = [...routinesData]; updatedArray.splice(updatedArray.indexOf(item), 1); setRoutinesData(updatedArray); }}>
                <Text style={{ fontSize: 14, color: 'white' }}>X</Text>
            </Pressable>
        </View>
    );
}

function RoutineEditor({route}) {
    const [isAdding, setIsAdding] = useState(false);
    const [exerciseData, setExerciseData] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [routineData, setRoutineData] = useState();
    const [routinesData, setRoutinesData] = useState([]);
    const [isSetup, setIsSetup] = useState(false);
    const [routinesData2, setRoutinesData2] = useState([]);
    const [routineName, setRoutineName] = useState(null);
    const [isNumRotation, setIsNumRotation] = useState(false);
    const [numDaysRotation, setNumDaysRotation] = useState(null);

    const navigation = useNavigation();

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button onPress={() => { navigation.navigate('Workouts', {routineData: { name: routineID, data: DATA  }})}} title="Add   " />
            ),
        });
    }, [navigation]);

    const toggleIsNumRotation = () => {setIsNumRotation(previousState => !previousState);}
    
    function setUpScheduledRoutines() {
        let updatedArray = [];
        routinesData.forEach(forEachRoutine);
        setRoutinesData2(updatedArray);

        function forEachRoutine(currentValue) {
            if ((currentValue.day == currentDay.weekday || currentValue.day == currentDay.num)) {
                updatedArray.push(currentValue);
            }
        }
    }

    useEffect(() => {
        routineID = routineName;
    }, [routineName])

    useEffect(() => {
        DATA = routinesData;
    }, [routinesData])

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
        if (route.params?.modalVisible) {
            setModalVisible(route.params.modalVisible);
        }
        if (route.params?.exerciseData) {
            setExerciseData(route.params.exerciseData);
        }
    }, [route.params?.exerciseData]);

    useEffect(() => {
        if (route.params?.modalVisible) {
            setModalVisible(route.params.modalVisible);
        }
    }, [route.params?.modalVisible])

    const renderItem = ({ item }) => (
        <View style={{ paddingBottom: 10 }}>
            <Routine item={item} routinesData={routinesData} setRoutinesData={setRoutinesData} isNumRotation={isNumRotation} numDaysRotation={numDaysRotation} />
        </View>
    );

    return (
        <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <View style={{
                top: 10,
                flex: 0.1
            }}>
                <TextInput style={{
                    left: 20,
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
                onChangeText={setRoutineName}
                value={routineName}
                placeholder="Workout Schedule Name"
                placeholderTextColor='grey'
            />
            </View>
            <View style={{flex: 1, top: 15}}>
                <View style={{ top: 30, left: 20, height: 30}}>
                        <Text style={{
                            fontSize: 22,
                            width: 300,
                            color: 'white',
                            position: 'absolute',
                            fontFamily: 'MainFont',
                        }}>
                            Workouts
                        </Text>
                    <View style={{top: 30, width: 350, height: 5, backgroundColor: colors.accent, borderRadius: 0 }} />
                </View>
                <TouchableOpacity style={{
                    left: isNumRotation ? 215 : 249,
                    top: 7
                }}
                onPress={toggleIsNumRotation}
                >
                    <Text style={{
                        color: colors.accent,
                        fontSize: 16
                    }}>
                        {isNumRotation ? "Custom Rotation:" : "Weekly Rotation"}
                    </Text>
                </TouchableOpacity>
                {isNumRotation ?
                    (
                        <TextInput style={{
                            width: 25,
                            height: 25,
                            left: 337,
                            bottom: 15,
                            borderWidth: 0,
                            borderColor: colors.accent,
                            borderRadius: 5,
                            color: 'white',
                            justifyContent: 'center',
                            textAlign: 'center',
                            alignItems: 'center'
                        }}
                        onChangeText={setNumDaysRotation}
                        value={numDaysRotation}
                        placeholder="#"
                        placeholderTextColor='grey'
                        />
                    ) : 
                    (
                        <View />
                    )
                }
                <View style={{ top: isNumRotation ? 10 : 35, flex: 0.88}}>
                    <FlatList style={{
                        left: 20,
                    }}
                        data={routinesData}
                        renderItem={renderItem}
                        keyExtractor={item => item.name}
                        ListFooterComponent={<RoutineAdder setIsAdding={setIsAdding} setModalVisible={setModalVisible} />}
                    />
                </View>
                <RoutineAdderInterface
                    setRoutineData={setRoutineData}
                    exerciseData={exerciseData}
                    setExerciseData={setExerciseData}
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </View>
        </View>
    );
}

function RoutineAdder({ setIsAdding, setModalVisible }) {
    const [isAdded, setIsAdded] = useState(false);

    return (
        <Pressable style={{ paddingBottom: 10, }}
            onPressOut={() => { setIsAdding(true); setModalVisible(true); }}
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

function Item({ item, exercisesData, setExercisesData }) {
    return (
        <View style={{
            borderWidth: 1,
            width: 310,
            height: 50,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            borderColor: colors.accent,
        }}>
            <Text style={{
                fontFamily: 'MainFont',
                fontSize: 19,
                left: 14,
                color: 'white'
            }}>{item.name}</Text>
            <Pressable style={{ right: 14 }} onPress={() => { const updatedArray = [...exercisesData]; updatedArray.splice(updatedArray.indexOf(item), 1); setExercisesData(updatedArray); }}>
                <Text style={{ fontSize: 14, color: 'white' }}>X</Text>
            </Pressable>
        </View>
    );
}

function RoutineAdderInterface({ exerciseData, setExerciseData, modalVisible, setModalVisible, setRoutineData }) {
    const [routineName, setRoutineName] = useState(null);
    const [exercisesData, setExercisesData] = useState([{ id: 0 }]);
    const [isSetup, setIsSetup] = useState(false);

    useEffect(() => {
        if (isSetup) {
            const updatedArray = [...exercisesData, exerciseData];
            setExercisesData(updatedArray);
        }
        else
            setIsSetup(true);
    }, [exerciseData]);

    const renderItem = ({ item, drag, isActive }) => (
        <ScaleDecorator>
            {(item.id == 0) ? (<View></View>) : (
                <TouchableOpacity onLongPress={drag} disabled={isActive} style={{ paddingBottom: 10 }}>
                    <Item item={item} exercisesData={exercisesData} setExercisesData={setExercisesData} />
                </TouchableOpacity>)}
        </ScaleDecorator>
    );

    return (
        <Modal animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={{ alignItems: 'center' }}>
                <View style={{
                    top: 150,
                    backgroundColor: '#252526',
                    shadowColor: 'black',
                    shadowOpacity: 0.25,
                    shadowRadius: 80,
                    borderRadius: 30,
                    width: '90%',
                    aspectRatio: 2 / 3,
                    alignItems: 'center',
                }}>
                    <View style={{ top: 10, justifyContent: 'space-between', flexDirection: 'row', width: "95%", aspectRatio: 5 }}>
                        <Button style={{}} onPress={() => { setModalVisible(false); 
                        setExercisesData([{ id: 0 }]);
                        setRoutineName(null); }} 
                        title="Cancel" />
                        <Button style={{}} onPress={() => {
                            setModalVisible(false);
                            let routineData = { name: routineName, data: exercisesData, day: '1' };
                            setRoutineData(routineData);
                            setExercisesData([{ id: 0 }]);
                            setRoutineName(null);
                        }}
                            title="Add" />
                    </View>
                    <View style={{ right: 25, top: 0 }}>
                        <TextInput
                            style={{
                                fontFamily: 'MainFont',
                                fontSize: 20,
                                width: '80%',
                                color: 'white',
                            }}
                            onChangeText={setRoutineName}
                            value={routineName}
                            placeholder="Workout Name"
                            placeholderTextColor='darkgrey'
                        />
                        <View style={{ top: 5, width: '75%', aspectRatio: 50, backgroundColor: colors.accent, borderRadius: 0 }} />
                    </View>
                    <Text style={{
                        fontFamily: 'MainFont',
                        fontSize: 20,
                        top: 14,
                        padding: 15,
                        right: 33,
                        width: '80%',
                        color: 'white'
                    }}> Exercises: </Text>
                    <DraggableFlatList style={{
                        top: 10,
                        paddingLeft: 42,
                        width: 400,
                        height: 200,
                    }}
                        debug={false}
                        data={exercisesData}
                        onDragEnd={({ data }) => setExercisesData(data)}
                        keyExtractor={item => item.name}
                        renderItem={renderItem}
                        ListFooterComponent={<ExerciseAdder setModalVisible={setModalVisible} />}
                    />
                </View>
            </View>
        </Modal>
    );
}

function ExerciseAdder({ setModalVisible }) {
    const navigation = useNavigation();
    return (
        <Pressable style={{}}
            onPressOut={() => { setModalVisible(false); navigation.navigate('Exercise Editor'); }}
        >
            {({ pressed }) => (
                <View style={{
                    backgroundColor: colors.accent,
                    width: 310,
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
                </View>)}
        </Pressable>
    );
}

export default RoutineEditor;