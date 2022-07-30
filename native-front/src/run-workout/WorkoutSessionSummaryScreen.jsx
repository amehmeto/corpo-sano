"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var Button_1 = require("../../design-system/Button");
var vector_icons_1 = require("@expo/vector-icons");
var HomeRouter_1 = require("../routers/HomeRouter");
var screen_container_style_1 = require("../../design-system/screen-container.style");
function WorkoutSessionSummaryScreen(_a) {
    var navigation = _a.navigation;
    var todaySessionExercisesStats = [
        { name: 'Push-up', lastSets: [4, 8, 9] },
        { name: 'Dips', lastSets: [4, 8, 9] },
        { name: 'Abs', lastSets: [4, 8, 9] },
        { name: 'Squat', lastSets: [4, 8, 9] },
        { name: 'Push-up', lastSets: [4, 8, 9] },
        { name: 'Dips', lastSets: [4, 8, 9] },
        { name: 'Abs', lastSets: [4, 8, 9] },
        { name: 'Squat', lastSets: [4, 8, 9] },
        { name: 'Tractions', lastSets: [4, 8, 9] },
        { name: 'Tractions', lastSets: [4, 8, 9] },
    ];
    function goTo(route) {
        navigation.navigate(route);
    }
    var exerciseSetsSummary = todaySessionExercisesStats.map(function (exercise, exerciseIndex) {
        var setPerfs = exercise.lastSets.map(function (perf, perfIndex) { return (<react_native_1.Text key={perfIndex} style={styles.exercisePerf}>
          {perf}
        </react_native_1.Text>); });
        return (<react_native_1.View style={styles.exerciseRow} key={exerciseIndex}>
          <react_native_1.Text style={styles.exerciseName}>{exercise.name}</react_native_1.Text>
          {setPerfs}
          <vector_icons_1.Feather name="arrow-up-right" size={24} color="black"/>
        </react_native_1.View>);
    });
    return (<react_native_1.View style={screen_container_style_1.screenContainerStyle.container}>
      <react_native_1.Text style={styles.title}>Upper Body Workout</react_native_1.Text>

      <react_native_1.Text>Congratulations, you've just finished your workout session!</react_native_1.Text>

      <react_native_1.Text style={styles.title}>Session summary</react_native_1.Text>

      <react_native_1.ScrollView contentContainerStyle={styles.scroll}>
        {exerciseSetsSummary}
      </react_native_1.ScrollView>

      <Button_1.Button style={styles.button} text={'Leave Workout Session'} onPress={function () { return goTo(HomeRouter_1.Routes.HOME); }}/>
    </react_native_1.View>);
}
exports.default = WorkoutSessionSummaryScreen;
var styles = react_native_1.StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        margin: 20,
    },
    scroll: {
        display: 'flex',
        alignItems: 'center',
        width: 400,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'red',
    },
    button: {
        marginTop: 20,
    },
    exerciseRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'blue',
    },
    exerciseName: {
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        fontSize: 18,
        color: 'red',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'red',
    },
    exercisePerf: {
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
        fontSize: 18,
        color: 'red',
    },
});
