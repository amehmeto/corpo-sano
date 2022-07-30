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
exports.InMemoryProgramGateway = void 0;
var program_entity_1 = require("../entities/program.entity");
var program_data_builder_1 = require("../../_data-builders/program.data-builder");
var uuid_1 = require("uuid");
var workout_entity_1 = require("../entities/workout.entity");
var scheduled_days_data_builder_1 = require("../../_data-builders/scheduled-days.data-builder");
var program_mapper_1 = require("../mappers/program.mapper");
var InMemoryProgramGateway = /** @class */ (function () {
    function InMemoryProgramGateway() {
        this.rawPrograms = [program_data_builder_1.programDataBuilder()];
        this.programs = this.rawPrograms.map(function (rawProgram) {
            return program_mapper_1.ProgramMapper.mapToDomain(rawProgram);
        });
    }
    InMemoryProgramGateway.prototype.create = function (programInput) {
        var newId = uuid_1.v4();
        this.programs.push(new program_entity_1.Program(newId, programInput.title, []));
        var createdProgram = this.programs.find(function (program) { return program.id === newId; });
        if (!createdProgram)
            throw new Error('Program not created');
        return Promise.resolve(createdProgram);
    };
    InMemoryProgramGateway.prototype.find = function () {
        console.log(this.programs[0].workouts);
        return Promise.resolve(this.programs);
    };
    InMemoryProgramGateway.prototype.findById = function (programId) {
        var program = this.programs.find(function (_program) { return _program.id === programId; });
        return Promise.resolve(program);
    };
    InMemoryProgramGateway.prototype.addWorkout = function (programId, workoutInput) {
        return __awaiter(this, void 0, void 0, function () {
            var program;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findById(programId)];
                    case 1:
                        program = _a.sent();
                        if (!program)
                            throw new Error('Program not found');
                        program.workouts.push(new workout_entity_1.Workout(uuid_1.v4(), workoutInput.title, workoutInput.description, workoutInput.programId, [], scheduled_days_data_builder_1.scheduledDaysDataBuilder()));
                        return [2 /*return*/, Promise.resolve(program.workouts[0])];
                }
            });
        });
    };
    InMemoryProgramGateway.prototype.deleteWorkout = function (programId, workoutId) {
        var programIndex = this.programs.findIndex(function (_program) { return _program.id === programId; });
        if (programIndex === -1)
            throw new Error('Program not found');
        var workoutIndex = this.programs[programIndex].workouts.findIndex(function (_workout) { return _workout.id === workoutId; });
        this.programs[programIndex].workouts.splice(workoutIndex, 1);
        return Promise.resolve(true);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    InMemoryProgramGateway.prototype.deleteProgram = function (programId) {
        return Promise.resolve(false);
    };
    return InMemoryProgramGateway;
}());
exports.InMemoryProgramGateway = InMemoryProgramGateway;
