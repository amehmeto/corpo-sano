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
exports.ExerciseCardPreview = void 0;
var react_native_1 = require("react-native");
var react_1 = require("react");
var margin_enum_1 = require("../../../design-system/enums/margin.enum");
var padding_enum_1 = require("../../../design-system/enums/padding.enum");
var EditExerciseButton_1 = require("./EditExerciseButton");
var DeleteExerciseButton_1 = require("./DeleteExerciseButton");
var delete_exercise_usecase_1 = require("../usecases/delete-exercise.usecase");
var dependency_injection_container_1 = require("../../_infrastructure/dependency-injection.container");
var DeleteExerciseModalButton_1 = require("./program-preview-screen/DeleteExerciseModalButton");
var deleteExerciseUseCase = new delete_exercise_usecase_1.DeleteExerciseUseCase(dependency_injection_container_1.exerciseGateway);
function deleteExercise(deleteModalExerciseId, setIsDeleteExerciseModalVisible) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, 4, 5]);
                    if (!deleteModalExerciseId) return [3 /*break*/, 2];
                    return [4 /*yield*/, deleteExerciseUseCase.execute(deleteModalExerciseId)];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2: return [3 /*break*/, 5];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 5];
                case 4:
                    setIsDeleteExerciseModalVisible(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function cancelExerciseDelete(setIsDeleteExerciseModalVisible) {
    setIsDeleteExerciseModalVisible(false);
}
function ExerciseCardPreview(_a) {
    var exercise = _a.exercise, goToExerciseSettings = _a.goToExerciseSettings;
    var _b = react_1.useState(false), isDeleteExerciseModalVisible = _b[0], setIsDeleteExerciseModalVisible = _b[1];
    var _c = react_1.useState(undefined), deleteModalExerciseId = _c[0], setDeleteModalExerciseId = _c[1];
    return (<react_native_1.Pressable style={styles.workoutPreview}>
      <react_native_1.View style={styles.titleAndEditIconsRow}>
        <react_native_1.Text style={styles.workoutTitle}>{exercise.template.title}</react_native_1.Text>
        <react_native_1.View style={styles.editIcons}>
          <EditExerciseButton_1.EditExerciseButton onPress={goToExerciseSettings}/>
          <DeleteExerciseButton_1.DeleteExerciseButton openDeleteModal={function () {
            setDeleteModalExerciseId(exercise.id);
            setIsDeleteExerciseModalVisible(true);
        }}/>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.Text>{exercise.numberOfSets + " sets of " + exercise.numberOfReps + " reps"}</react_native_1.Text>
      <react_native_1.Text>
        {"rest: " + exercise.interSetsRestTime.minutes + " ' " + exercise.interSetsRestTime.seconds + " '' \t final rest: " + exercise.finalRestTime.minutes + " ' " + exercise.finalRestTime.seconds + " ''"}
      </react_native_1.Text>

      <DeleteExerciseModalButton_1.DeleteExerciseModal visible={isDeleteExerciseModalVisible} cancelExerciseDelete={function () {
            return cancelExerciseDelete(setIsDeleteExerciseModalVisible);
        }} deleteExercise={function () {
            return deleteExercise(deleteModalExerciseId, setIsDeleteExerciseModalVisible);
        }}/>
    </react_native_1.Pressable>);
}
exports.ExerciseCardPreview = ExerciseCardPreview;
var styles = react_native_1.StyleSheet.create({
    workoutPreview: {
        width: '90%',
        margin: margin_enum_1.Margin.MEDIUM,
        padding: padding_enum_1.Padding.MEDIUM,
        flexGrow: 1,
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'gray',
    },
    titleAndEditIconsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    editIcons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    workoutTitle: {
        fontWeight: 'bold',
        marginBottom: margin_enum_1.Margin.SMALL,
    },
});
