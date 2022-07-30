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
exports.GraphQLProgramGateway = void 0;
var base_graphql_gateway_1 = require("../../_infrastructure/gateway/base.graphql.gateway");
var program_mapper_1 = require("../mappers/program.mapper");
var workout_mapper_1 = require("../mappers/workout.mapper");
var GraphQLProgramGateway = /** @class */ (function (_super) {
    __extends(GraphQLProgramGateway, _super);
    function GraphQLProgramGateway() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GraphQLProgramGateway.prototype.create = function (programInput) {
        return __awaiter(this, void 0, void 0, function () {
            var createProgramMutationPayload, createdProgram, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        createProgramMutationPayload = {
                            query: "mutation CreateProgram($title: String!) {\n          createProgram(title: $title) {\n            id\n            title\n            workouts {\n              id\n              title\n            }\n          }\n        }",
                            variables: {
                                title: programInput.title,
                            },
                        };
                        return [4 /*yield*/, this.request(createProgramMutationPayload)];
                    case 1:
                        createdProgram = _a.sent();
                        return [2 /*return*/, program_mapper_1.ProgramMapper.mapToDomain(createdProgram)];
                    case 2:
                        e_1 = _a.sent();
                        throw this.handleError(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GraphQLProgramGateway.prototype.addWorkout = function (programId, workoutInput) {
        return __awaiter(this, void 0, void 0, function () {
            var addWorkoutMutationPayload, createWorkout, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        addWorkoutMutationPayload = {
                            query: "mutation CreateWorkout($title: String!, $programId: ID!) {\n          createWorkout(title: $title, programId: $programId) {\n            id\n            title\n          }\n        }",
                            variables: {
                                title: workoutInput.title,
                                programId: programId,
                            },
                        };
                        return [4 /*yield*/, this.request(addWorkoutMutationPayload)];
                    case 1:
                        createWorkout = _a.sent();
                        return [2 /*return*/, workout_mapper_1.WorkoutMapper.mapToDomain(createWorkout)];
                    case 2:
                        e_2 = _a.sent();
                        throw this.handleError(e_2);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    GraphQLProgramGateway.prototype.deleteWorkout = function (programId, workoutId) {
        throw new Error('Method not implemented.');
    };
    GraphQLProgramGateway.prototype.find = function () {
        return __awaiter(this, void 0, void 0, function () {
            var findProgramQueryPayload;
            return __generator(this, function (_a) {
                try {
                    findProgramQueryPayload = {
                        query: "query GetAllPrograms {\n          getAllPrograms {\n            id\n            title\n          }\n        }",
                        variables: {},
                    };
                    return [2 /*return*/, this.request(findProgramQueryPayload)];
                }
                catch (e) {
                    throw this.handleError(e);
                }
                return [2 /*return*/];
            });
        });
    };
    GraphQLProgramGateway.prototype.findById = function (programId) {
        return __awaiter(this, void 0, void 0, function () {
            var getProgramQueryPayload, rawProgram, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        getProgramQueryPayload = {
                            query: "query GetProgram($programId: ID!) {\n          getProgram(programId: $programId) {\n            id\n            title\n            workouts {\n              id\n              title\n            }\n          }\n        }",
                            variables: {
                                programId: programId,
                            },
                        };
                        return [4 /*yield*/, this.request(getProgramQueryPayload)];
                    case 1:
                        rawProgram = _a.sent();
                        return [2 /*return*/, program_mapper_1.ProgramMapper.mapToDomain(rawProgram)];
                    case 2:
                        e_3 = _a.sent();
                        throw this.handleError(e_3);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    GraphQLProgramGateway.prototype.deleteProgram = function (programId) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteProgramQuery, deleteProgramMutationPayload;
            return __generator(this, function (_a) {
                try {
                    deleteProgramQuery = "mutation DeleteProgram($programId: ID!) {\n        deleteProgram(programId: $programId)\n      }";
                    deleteProgramMutationPayload = {
                        query: deleteProgramQuery,
                        variables: {
                            programId: programId,
                        },
                    };
                    return [2 /*return*/, this.request(deleteProgramMutationPayload)];
                }
                catch (error) {
                    return [2 /*return*/, Promise.resolve(false)];
                }
                return [2 /*return*/];
            });
        });
    };
    return GraphQLProgramGateway;
}(base_graphql_gateway_1.GraphQLGateway));
exports.GraphQLProgramGateway = GraphQLProgramGateway;
