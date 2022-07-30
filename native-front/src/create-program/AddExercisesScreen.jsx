"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var exercise_data_builder_1 = require("../_data-builders/exercise.data-builder");
var screen_container_style_1 = require("../../design-system/screen-container.style");
var Button_1 = require("../../design-system/Button");
var select_exercise_handler_1 = require("./usecases/select-exercise.handler");
var HomeRouter_1 = require("../routers/HomeRouter");
var colors_enum_1 = require("../../design-system/enums/colors.enum");
function AddExercisesScreen(_a) {
    var navigation = _a.navigation;
    var _b = react_1.useState([exercise_data_builder_1.exerciseDataBuilder(), exercise_data_builder_1.exerciseDataBuilder(), exercise_data_builder_1.exerciseDataBuilder()]), exercises = _b[0], setExercises = _b[1];
    var exercisesElements = exercises.map(function (exercise, index) {
        var exerciseBackgroundColor = exercise.isSelected ? colors_enum_1.Colors.PRIMARY_200 : colors_enum_1.Colors.SUCCESS_100;
        return (<react_native_1.TouchableOpacity key={index} style={styles.exerciseElement} onPress={function () {
                var selectedExercises = select_exercise_handler_1.selectWantedExercise(exercises, index);
                setExercises(selectedExercises);
            }}>
          <react_native_1.Text style={[styles.exercise, { backgroundColor: exerciseBackgroundColor }]}>{exercise.template.title}</react_native_1.Text>
        </react_native_1.TouchableOpacity>);
    });
    function goToCreateExerciseScreen() {
        navigation.navigate(HomeRouter_1.Routes.CREATE_EXERCISE);
    }
    return (<react_native_1.View style={screen_container_style_1.screenContainerStyle.container}>
      <react_native_1.Text style={styles.title}>Add exercises</react_native_1.Text>

      <react_native_1.Text>Choose among the exercises below :</react_native_1.Text>

      <react_native_1.ScrollView style={styles.scroll}>
        <react_native_1.View style={styles.exercises}>{exercisesElements}</react_native_1.View>
      </react_native_1.ScrollView>

      <Button_1.Button onPress={goToCreateExerciseScreen} text={'Create Exercise'}/>
      <Button_1.Button onPress={function () {
        }} text={'Add Selected Exercise'}/>
    </react_native_1.View>);
}
exports.default = AddExercisesScreen;
var styles = react_native_1.StyleSheet.create({
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
    exerciseElement: {
        flexDirection: 'row',
        alignItems: 'center'
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
});
