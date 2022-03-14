"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAthleteRepository = void 0;
const athlete_entity_1 = require("../entities/athlete.entity");
const uuid_1 = require("uuid");
const athlete_data_builder_1 = require("../data-builders/athlete.data-builder");
const repository_errors_enum_1 = require("../types/repository-errors.enum");
class InMemoryAthleteRepository {
    constructor() {
        this.athletesData = [
            (0, athlete_data_builder_1.athleteDataBuilder)(),
            (0, athlete_data_builder_1.athleteDataBuilder)(),
            (0, athlete_data_builder_1.athleteDataBuilder)(),
        ];
        this.athletes = this.athletesData.map((athleteData) => new athlete_entity_1.Athlete(athleteData));
    }
    save(athlete) {
        const { email } = athlete;
        const registeredAthleteEmails = this.athletesData.map((_athlete) => _athlete.email);
        if (registeredAthleteEmails.includes(email))
            throw new Error(repository_errors_enum_1.RepositoryErrors.DUPLICATED_ENTRY);
        return Promise.resolve(new athlete_entity_1.Athlete(Object.assign({ id: (0, uuid_1.v4)() }, athlete)));
    }
    findById(athleteId) {
        return Promise.resolve(this.athletes.find((athlete) => athlete.id === athleteId));
    }
    find() {
        return Promise.resolve(this.athletes);
    }
    findByEmail(athleteEmail) {
        return Promise.resolve(this.athletes.find((athlete) => athlete.email === athleteEmail));
    }
}
exports.InMemoryAthleteRepository = InMemoryAthleteRepository;
//# sourceMappingURL=in-memory-athlete.repository.js.map