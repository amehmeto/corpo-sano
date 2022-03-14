"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmAthleteRepository = void 0;
const typeorm_1 = require("typeorm");
const athlete_entity_1 = require("../entities/athlete.entity");
let TypeOrmAthleteRepository = class TypeOrmAthleteRepository extends typeorm_1.Repository {
    async findById(athleteId) {
        const athlete = await this.findOne(athleteId, {
            relations: ['biometrics', 'dailyTasks', 'programs'],
        });
        athlete.programs = [...athlete.programs].sort((a, b) => this.sortByCreatedAt(a, b));
        athlete.dailyTasks = [...athlete.dailyTasks].sort((a, b) => this.sortByCreatedAt(a, b));
        return athlete;
    }
    async findByEmail(athleteEmail) {
        const athlete = await this.findOne({ email: athleteEmail }, {
            relations: ['biometrics', 'dailyTasks', 'programs'],
        });
        if (athlete.programs)
            athlete.programs = [...athlete.programs].sort((a, b) => this.sortByCreatedAt(a, b));
        athlete.dailyTasks = [...athlete.dailyTasks].sort((a, b) => this.sortByCreatedAt(a, b));
        return athlete;
    }
    sortByCreatedAt(a, b) {
        return a.createdAt >= b.createdAt ? 1 : -1;
    }
};
TypeOrmAthleteRepository = __decorate([
    (0, typeorm_1.EntityRepository)(athlete_entity_1.Athlete)
], TypeOrmAthleteRepository);
exports.TypeOrmAthleteRepository = TypeOrmAthleteRepository;
//# sourceMappingURL=typeorm-athlete.repository.js.map