"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.GraphQLWorkoutGateway = void 0;
var base_graphql_gateway_1 = require("../../_infrastructure/gateway/base.graphql.gateway");
var workout_entity_1 = require("../entities/workout.entity");
var WorkoutMapper = /** @class */ (function () {
    function WorkoutMapper() {
    }
    WorkoutMapper.mapToDomain = function (workout) {
        return new workout_entity_1.Workout(workout.id, workout.title, workout.description, workout.programId, workout.exercises, workout.scheduledDays);
    };
    return WorkoutMapper;
}());
var GraphQLWorkoutGateway = /** @class */ (function (_super) {
    __extends(GraphQLWorkoutGateway, _super);
    function GraphQLWorkoutGateway() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphQLWorkoutGateway.prototype.update = function (workoutId, workout) {
        return __awaiter(this, void 0, void 0, function () {
            var UPDATE_WORKOUT_MUTATION, updateWorkoutMutationPayload, updateWorkout, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        UPDATE_WORKOUT_MUTATION = "mutation UpdateWorkout(\n          $workoutId: ID!,\n          $payload: PatchWorkoutInput!\n        ) {\n          updateWorkout(workoutId: $workoutId, payload: $payload) {\n            id\n            title\n           \n            exercises {\n              position\n              template {\n                id\n                title\n              }\n            }\n          }\n        }";
                        updateWorkoutMutationPayload = {
                            query: UPDATE_WORKOUT_MUTATION,
                            variables: {
                                workoutId: workoutId,
                                payload: {
                                    exercises: workout.exercises,
                                    scheduledDays: workout.scheduledDays,
                                },
                            },
                        };
                        return [4 /*yield*/, this.request(updateWorkoutMutationPayload)
                            //TODO According to the architect's thought, this place can be turned into an object.
                        ];
                    case 1:
                        updateWorkout = (_a.sent()).updateWorkout;
                        //TODO According to the architect's thought, this place can be turned into an object.
                        return [2 /*return*/, !!updateWorkout];
                    case 2:
                        error_1 = _a.sent();
                        throw this.handleError(error_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GraphQLWorkoutGateway.prototype.find = function () {
        throw new Error('Method not implemented.');
    };
    GraphQLWorkoutGateway.prototype.findById = function (workoutId) {
        return __awaiter(this, void 0, void 0, function () {
            var WORKOUT_MUTATION, findWorkoutByIdMutationPayload, getWorkout, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        WORKOUT_MUTATION = "query GetWorkout($workoutId: ID!) {\n          getWorkout(workoutId: $workoutId) {\n            id\n            title\n            exercises {\n              id\n              template {\n                title\n              }\n            }\n            sessions {\n              id\n              performances {\n                id\n                sets\n                exercise {\n                  id\n                }\n              }\n            }\n          }\n        }";
                        findWorkoutByIdMutationPayload = {
                            query: WORKOUT_MUTATION,
                            variables: {
                                workoutId: workoutId,
                            },
                        };
                        return [4 /*yield*/, this.request(findWorkoutByIdMutationPayload)];
                    case 1:
                        getWorkout = _a.sent();
                        return [2 /*return*/, WorkoutMapper.mapToDomain(getWorkout)];
                    case 2:
                        error_2 = _a.sent();
                        throw this.handleError(error_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GraphQLWorkoutGateway.prototype.scheduleDays = function (workoutId, days) {
        return __awaiter(this, void 0, void 0, function () {
            var SCHEDULE_WORKOUT_MUTATION, scheduleWorkoutMutationPayload, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        SCHEDULE_WORKOUT_MUTATION = "mutation scheduleWorkout($payload: ScheduleWorkoutInput!) {\n        scheduleWorkout(payload: $payload) {\n          scheduledDays\n        }\n      }";
                        scheduleWorkoutMutationPayload = {
                            query: SCHEDULE_WORKOUT_MUTATION,
                            variables: {
                                payload: {
                                    workoutId: workoutId,
                                    daysOfTheWeek: days,
                                },
                            },
                        };
                        return [4 /*yield*/, this.request(scheduleWorkoutMutationPayload)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        throw this.handleError(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GraphQLWorkoutGateway.prototype.fillWithExercises = function (workoutId, exerciseTemplates) {
        return __awaiter(this, void 0, void 0, function () {
            var FILL_WORKOUT_WITH_EXERCISES, fillWorkoutWithExercisesMutationPayload, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        FILL_WORKOUT_WITH_EXERCISES = "mutation\n        fillWorkoutWithExercises($payload: FillWorkoutWithExercisesInput!) {\n          fillWorkoutWithExercises(payload: $payload) {\n            id\n            title\n            exercises {\n              id\n              template {\n                id\n                title\n              }\n            }\n          }\n        }";
                        fillWorkoutWithExercisesMutationPayload = {
                            query: FILL_WORKOUT_WITH_EXERCISES,
                            variables: {
                                payload: {
                                    workoutId: workoutId,
                                    exerciseTemplateIds: exerciseTemplates.map(function (exerciseTemplate) { return exerciseTemplate.id; }),
                                },
                            },
                        };
                        return [4 /*yield*/, this.request(fillWorkoutWithExercisesMutationPayload)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_2 = _a.sent();
                        throw this.handleError(e_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GraphQLWorkoutGateway.prototype.create = function (workoutInput) {
        throw new Error('Method not implemented.');
    };
    GraphQLWorkoutGateway.prototype.delete = function (workoutId) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteWorkoutPayload, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        deleteWorkoutPayload = {
                            query: "mutation DeleteWorkout($workoutId: ID!) {\n          deleteWorkout(workoutId: $workoutId)\n        }",
                            variables: {
                                workoutId: workoutId,
                            },
                        };
                        return [4 /*yield*/, this.request(deleteWorkoutPayload)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_3 = _a.sent();
                        throw this.handleError(e_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return GraphQLWorkoutGateway;
}(base_graphql_gateway_1.GraphQLGateway));
exports.GraphQLWorkoutGateway = GraphQLWorkoutGateway;
