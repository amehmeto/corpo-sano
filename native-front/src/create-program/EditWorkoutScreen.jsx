"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var update_workout_usecase_1 = require("./usecases/update-workout.usecase");
var schedule_days_handler_1 = require("./handlers/edit-workout-screen/schedule-days.handler");
var Button_1 = require("../../design-system/Button");
var HomeRouter_1 = require("../routers/HomeRouter");
var dependency_injection_container_1 = require("../_infrastructure/dependency-injection.container");
var get_workout_usecase_1 = require("./usecases/get-workout.usecase");
var ExerciseCardPreview_1 = require("./components/ExerciseCardPreview");
var font_size_enum_1 = require("../../design-system/enums/font-size.enum");
var padding_enum_1 = require("../../design-system/enums/padding.enum");
var margin_enum_1 = require("../../design-system/enums/margin.enum");
var screen_container_style_1 = require("../../design-system/screen-container.style");
var format_day_name_for_button_handler_1 = require("./handlers/edit-workout-screen/format-day-name-for-button.handler");
var updateWorkoutEditUseCase = new update_workout_usecase_1.UpdateWorkoutUseCase(dependency_injection_container_1.workoutGateway);
var getWorkoutUseCase = new get_workout_usecase_1.GetWorkoutUseCase(dependency_injection_container_1.workoutGateway);
function EditWorkoutScreen(_a) {
    var _this = this;
    var _b;
    var route = _a.route, navigation = _a.navigation;
    var workoutId = route.params.workoutId;
    var programId = route.params.programId;
    var _c = react_1.useState(undefined), workout = _c[0], setWorkout = _c[1];
    react_1.useEffect(function () {
        getWorkoutUseCase
            .execute(workoutId)
            .then(function (retrievedWorkout) { return setWorkout(retrievedWorkout); });
    }, []);
    var scheduleDay = function (dayIndex) {
        setWorkout(function (prevWorkout) { return schedule_days_handler_1.scheduleWantedDays(prevWorkout, dayIndex); });
    };
    var updateWorkout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!workout) return [3 /*break*/, 2];
                    return [4 /*yield*/, updateWorkoutEditUseCase.execute(workoutId, workout)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    navigation.push(HomeRouter_1.Routes.PROGRAM_PREVIEW, {
                        programId: programId,
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var addExercise = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            navigation.push(HomeRouter_1.Routes.ADD_EXERCISE);
            return [2 /*return*/];
        });
    }); };
    var renderExerciseCard = function (_a) {
        var exercise = _a.item;
        return (<ExerciseCardPreview_1.ExerciseCardPreview exercise={exercise} goToExerciseSettings={function () {
                return navigation.push(HomeRouter_1.Routes.EXERCISE_SETTINGS, {
                    exerciseId: exercise.id,
                });
            }}/>);
    };
    var renderScheduledDayButton = function (_a) {
        var day = _a.item, index = _a.index;
        var dayStyle = day.isScheduled
            ? styles.scheduledDay
            : styles.unscheduledDay;
        return (<react_native_1.Text onPress={function () { return scheduleDay(index); }} style={dayStyle}>
        {format_day_name_for_button_handler_1.formatForButton(day)}
      </react_native_1.Text>);
    };
    if (!workout)
        return <react_native_1.Text>Loading...</react_native_1.Text>;
    return (<react_native_1.View style={screen_container_style_1.screenContainerStyle.container}>
      <react_native_1.Text style={styles.title}>{workout.title}</react_native_1.Text>
      <react_native_1.Text>{(_b = workout.description) !== null && _b !== void 0 ? _b : 'No description'}</react_native_1.Text>

      <react_native_1.FlatList style={styles.scroll} data={workout.exercises} renderItem={renderExerciseCard}/>

      <react_native_1.FlatList style={styles.days} data={workout.scheduledDays} renderItem={renderScheduledDayButton} scrollEnabled={false} keyExtractor={function (item, index) { return index.toString(); }} horizontal={true}/>

      <Button_1.Button text={'Add Exercise'} onPress={addExercise}/>
      <Button_1.Button text={'Update Workout'} onPress={updateWorkout}/>
    </react_native_1.View>);
}
exports.default = EditWorkoutScreen;
var styles = react_native_1.StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: font_size_enum_1.FontSize.HEADING_4,
    },
    exercises: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        paddingTop: padding_enum_1.Padding.MEDIUM,
        minWidth: '60%',
    },
    scroll: {
        width: '90%',
        maxHeight: '60%',
    },
    days: {
        margin: margin_enum_1.Margin.MEDIUM,
        flexGrow: 0,
    },
    unscheduledDay: {
        height: 'min-content',
        textAlign: 'center',
        padding: padding_enum_1.Padding.MEDIUM,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
        margin: margin_enum_1.Margin.SMALL,
        fontSize: font_size_enum_1.FontSize.BODY_TEXT_SMALL,
    },
    scheduledDay: {
        height: 'min-content',
        textAlign: 'center',
        textDecorationColor: 'green',
        padding: padding_enum_1.Padding.MEDIUM,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'green',
        margin: margin_enum_1.Margin.SMALL,
        fontSize: font_size_enum_1.FontSize.BODY_TEXT_SMALL,
        fontWeight: 'bold',
        backgroundColor: '#80ff80',
    },
});
