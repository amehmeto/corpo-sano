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
var Button_1 = require("../../design-system/Button");
var HomeRouter_1 = require("../routers/HomeRouter");
var create_workout_use_case_1 = require("./usecases/create-workout-use.case");
var dependency_injection_container_1 = require("../_infrastructure/dependency-injection.container");
var screen_container_style_1 = require("../../design-system/screen-container.style");
var createWorkoutUseCase = new create_workout_use_case_1.CreateWorkoutUseCase(dependency_injection_container_1.programGateway);
function CreateWorkoutScreen(_a) {
    var route = _a.route, navigation = _a.navigation;
    var _b = react_1.useState('Leg day'), title = _b[0], setTitle = _b[1];
    var _c = react_1.useState('Never skip the leg day'), description = _c[0], setDescription = _c[1];
    var programId = route.params.programId;
    function createWorkout() {
        return __awaiter(this, void 0, void 0, function () {
            var e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, createWorkoutUseCase.execute(programId, {
                                title: title,
                                description: description,
                                programId: programId,
                            })];
                    case 1:
                        _a.sent();
                        navigation.push(HomeRouter_1.Routes.PROGRAM_PREVIEW, {
                            programId: programId,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        e_1 = _a.sent();
                        console.warn(e_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
    var changeTitle = function (event) { return setTitle(event.target.value); };
    var changeDescription = function (event) { return setDescription(event.target.value); };
    return (<>
      <react_native_1.View style={screen_container_style_1.screenContainerStyle.container}>
        <react_native_1.Text style={styles.title}>Create a workout</react_native_1.Text>

        <react_native_1.View style={styles.fields}>
          <react_native_1.TextInput style={styles.input} placeholder={'Name'} value={title} onChange={changeTitle}/>
          <react_native_1.TextInput style={styles.input} placeholder={'Description'} value={description} onChange={changeDescription}/>
        </react_native_1.View>

        <Button_1.Button text={'Create workout'} onPress={createWorkout}/>
      </react_native_1.View>
    </>);
}
exports.default = CreateWorkoutScreen;
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
});
