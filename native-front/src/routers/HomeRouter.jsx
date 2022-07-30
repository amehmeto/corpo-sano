"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeRouter = exports.Routes = void 0;
var HomeScreen_1 = require("../home/HomeScreen");
var CreateProgramScreen_1 = require("../create-program/CreateProgramScreen");
var EditWorkoutScreen_1 = require("../create-program/EditWorkoutScreen");
var ExerciseSettingsScreen_1 = require("../create-program/ExerciseSettingsScreen");
var WorkoutPreview_1 = require("../run-workout/WorkoutPreview");
var SetsRunnerScreen_1 = require("../run-workout/SetsRunnerScreen");
var WorkoutSessionSummaryScreen_1 = require("../run-workout/WorkoutSessionSummaryScreen");
var native_stack_1 = require("@react-navigation/native-stack");
var CreateWorkoutScreen_1 = require("../create-program/CreateWorkoutScreen");
var ProgramPreviewScreen_1 = require("../create-program/ProgramPreviewScreen");
var React = require("react");
var AddExercisesScreen_1 = require("../create-program/AddExercisesScreen");
var CreateExerciseScreen_1 = require("../create-program/CreateExerciseScreen");
var _a = native_stack_1.createNativeStackNavigator(), Navigator = _a.Navigator, Screen = _a.Screen;
var routes = [
    { name: 'Home', component: HomeScreen_1.HomeScreen },
    { name: 'CreateProgram', component: CreateProgramScreen_1.default },
    { name: 'ProgramPreview', component: ProgramPreviewScreen_1.default },
    { name: 'CreateWorkout', component: CreateWorkoutScreen_1.default },
    { name: 'EditWorkout', component: EditWorkoutScreen_1.default },
    { name: 'ExerciseSettings', component: ExerciseSettingsScreen_1.default },
    { name: 'WorkoutPreview', component: WorkoutPreview_1.default },
    { name: 'SetsRunner', component: SetsRunnerScreen_1.default },
    { name: 'WorkoutSessionSummary', component: WorkoutSessionSummaryScreen_1.default },
    { name: 'AddExercise', component: AddExercisesScreen_1.default },
    { name: 'CreateExercise', component: CreateExerciseScreen_1.default },
];
var Routes;
(function (Routes) {
    Routes["HOME"] = "Home";
    Routes["CREATE_PROGRAM"] = "CreateProgram";
    Routes["PROGRAM_PREVIEW"] = "ProgramPreview";
    Routes["EDIT_WORKOUT"] = "EditWorkout";
    Routes["CREATE_WORKOUT"] = "CreateWorkout";
    Routes["EXERCISE_SETTINGS"] = "ExerciseSettings";
    Routes["WORKOUT_PREVIEW"] = "WorkoutPreview";
    Routes["SETS_RUNNER"] = "SetsRunner";
    Routes["WORKOUT_SESSION_SUMMARY"] = "WorkoutSessionSummary";
    Routes["ADD_EXERCISE"] = "AddExercise";
    Routes["CREATE_EXERCISE"] = "CreateExercise";
})(Routes = exports.Routes || (exports.Routes = {}));
function HomeRouter() {
    var screens = routes.map(function (route, index) {
        return <Screen key={index} name={route.name} component={route.component}/>;
    });
    return <Navigator initialRouteName={Routes.HOME}>{screens}</Navigator>;
}
exports.HomeRouter = HomeRouter;
