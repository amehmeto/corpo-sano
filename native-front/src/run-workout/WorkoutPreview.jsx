"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var exercise_data_builder_1 = require("../_data-builders/exercise.data-builder");
function WorkoutPreview(_a) {
    var navigation = _a.navigation;
    function goTo(route) {
        navigation.navigate(route);
    }
    var exercisesElements = [
        exercise_data_builder_1.exerciseDataBuilder(),
        exercise_data_builder_1.exerciseDataBuilder(),
        exercise_data_builder_1.exerciseDataBuilder(),
    ].map(function (exercise, index) {
        return (<react_native_1.View key={index}>
        <react_native_1.Text style={styles.exercise}>{exercise.template.title}</react_native_1.Text>
      </react_native_1.View>);
    });
    return (<react_native_1.View style={styles.container}>
      <react_native_1.Text style={styles.title}>Upper Body Workout</react_native_1.Text>

      <react_native_1.Text style={styles.upcoming}>Upcoming exercises</react_native_1.Text>

      <react_native_1.ScrollView style={styles.scroll}>
        <react_native_1.View style={styles.exercises}>{exercisesElements}</react_native_1.View>
      </react_native_1.ScrollView>

      <react_native_1.Button title={'Start workout'} onPress={function () { return goTo('SetsRunner'); }}/>
    </react_native_1.View>);
}
exports.default = WorkoutPreview;
var styles = react_native_1.StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        color: 'gray',
    },
    fields: {
        width: '80%',
        alignItems: 'stretch',
    },
    exercises: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingTop: 10,
        minWidth: '60%',
    },
    exercise: {
        textAlign: 'center',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        margin: 10,
        flexGrow: 1,
    },
    scroll: {
        maxHeight: '60%',
    },
    selectedExercise: {
        textAlign: 'center',
        textDecorationColor: 'green',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'green',
        margin: 10,
        fontWeight: 'bold',
        backgroundColor: '#80ff80',
        flexGrow: 1,
    },
    upcoming: {
        fontWeight: 'bold',
        fontSize: 16,
        alignSelf: 'flex-start',
        marginLeft: 20,
    },
});
