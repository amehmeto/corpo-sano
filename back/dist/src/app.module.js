"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const program_module_1 = require("./program/program.module");
const graphql_1 = require("@nestjs/graphql");
const path_1 = require("path");
const typeorm_1 = require("@nestjs/typeorm");
const workout_module_1 = require("./workout/workout.module");
const exercise_module_1 = require("./exercise/exercise.module");
const config_1 = require("../config");
const athlete_module_1 = require("./athlete/athlete.module");
const auth_module_1 = require("./auth/auth.module");
const biometrics_module_1 = require("./biometrics/biometrics.module");
const daily_task_module_1 = require("./daily-task/daily-task.module");
const session_module_1 = require("./session/session.module");
const performance_module_1 = require("./performance/performance.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
            }),
            typeorm_1.TypeOrmModule.forRoot(config_1.config.db),
            exercise_module_1.ExerciseModule,
            program_module_1.ProgramModule,
            workout_module_1.WorkoutModule,
            athlete_module_1.AthleteModule,
            auth_module_1.AuthModule,
            biometrics_module_1.BiometricsModule,
            daily_task_module_1.DailyTaskModule,
            performance_module_1.PerformanceModule,
            session_module_1.SessionModule,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map