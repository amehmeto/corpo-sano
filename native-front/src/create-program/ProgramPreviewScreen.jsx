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
var HomeRouter_1 = require("../routers/HomeRouter");
var Button_1 = require("../../design-system/Button");
var margin_enum_1 = require("../../design-system/enums/margin.enum");
var font_size_enum_1 = require("../../design-system/enums/font-size.enum");
var determine_schedule_days_initial_style_handler_1 = require("./usecases/determine-schedule-days-initial-style.handler");
var get_program_usecase_1 = require("./usecases/get-program.usecase");
var dependency_injection_container_1 = require("../_infrastructure/dependency-injection.container");
var WorkoutPreviewCard_1 = require("./components/WorkoutPreviewCard");
var delete_workout_usecase_1 = require("./usecases/delete-workout.usecase");
var screen_container_style_1 = require("../../design-system/screen-container.style");
var DeleteWorkoutModalButton_1 = require("./components/program-preview-screen/DeleteWorkoutModalButton");
var EmptyProgramInfo_1 = require("./components/program-preview-screen/EmptyProgramInfo");
var React = require("react");
var getProgramUseCase = new get_program_usecase_1.GetProgramUsecase(dependency_injection_container_1.programGateway);
var deleteWorkoutUseCase = new delete_workout_usecase_1.DeleteWorkoutUseCase(dependency_injection_container_1.programGateway);
function cancelWorkoutDelete(setIsDeleteWorkoutModalVisible) {
    return function () { return setIsDeleteWorkoutModalVisible(false); };
}
function deleteWorkout(programId, deleteModalWorkoutId, setIsDeleteWorkoutModalVisible) {
    var _this = this;
    return function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deleteWorkoutUseCase.execute(programId, deleteModalWorkoutId)];
                case 1:
                    _a.sent();
                    setIsDeleteWorkoutModalVisible(false);
                    return [2 /*return*/];
            }
        });
    }); };
}
function ProgramPreviewScreen(_a) {
    var route = _a.route, navigation = _a.navigation;
    var programId = route.params.programId;
    var _b = react_1.useState(undefined), program = _b[0], setProgram = _b[1];
    var _c = react_1.useState(false), isDeleteWorkoutModalVisible = _c[0], setIsDeleteWorkoutModalVisible = _c[1];
    var _d = react_1.useState(undefined), deleteModalWorkoutId = _d[0], setDeleteModalWorkoutId = _d[1];
    react_1.useEffect(function () {
        getProgramUseCase.execute(programId).then(function (_program) {
            setProgram(_program);
        });
    }, []);
    function goToCreateWorkout() {
        navigation.navigate(HomeRouter_1.Routes.CREATE_WORKOUT, {
            programId: programId,
        });
    }
    var renderWorkoutPreview = function (_a) {
        var workout = _a.item;
        var dayInitials = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
        var dayInitialElements = dayInitials.map(function (initial, index) {
            var dayInitialStyle = determine_schedule_days_initial_style_handler_1.determineDayInitialStyle(workout);
            return (<react_native_1.Text key={index} style={dayInitialStyle}>
          {initial}
        </react_native_1.Text>);
        });
        return (<WorkoutPreviewCard_1.WorkoutPreviewCard workout={workout} navigate={function () {
                navigation.navigate(HomeRouter_1.Routes.EDIT_WORKOUT, {
                    workoutId: workout.id,
                    programId: programId,
                });
            }} openDeleteModal={function () {
                setDeleteModalWorkoutId(workout.id);
                setIsDeleteWorkoutModalVisible(true);
            }} dayInitials={dayInitialElements}/>);
    };
    return !program ? (<react_native_1.Text>Loading...</react_native_1.Text>) : (<react_native_1.View style={screen_container_style_1.screenContainerStyle.container}>
      <react_native_1.Text style={styles.title}>{program.title}</react_native_1.Text>
      // TODO: remove or use it
      {/*<Text style={styles.description}>{program.description}</Text>*/}
      <react_native_1.FlatList style={styles.workoutPreviewList} data={program.workouts} renderItem={renderWorkoutPreview} keyExtractor={function (item) { return item.id; }} ListEmptyComponent={<EmptyProgramInfo_1.EmptyProgramInfo />}/>

      <Button_1.Button text={'Add a workout'} onPress={goToCreateWorkout}/>

      <DeleteWorkoutModalButton_1.DeleteWorkoutModal visible={isDeleteWorkoutModalVisible} cancelWorkoutDelete={cancelWorkoutDelete(setIsDeleteWorkoutModalVisible)} deleteWorkout={deleteWorkout(programId, deleteModalWorkoutId, setIsDeleteWorkoutModalVisible)}/>
    </react_native_1.View>);
}
exports.default = ProgramPreviewScreen;
var styles = react_native_1.StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: font_size_enum_1.FontSize.HEADING_4,
        margin: margin_enum_1.Margin.LARGE,
    },
    description: {
        margin: margin_enum_1.Margin.LARGE,
    },
    workoutPreviewList: {
        width: '100%',
    },
});
