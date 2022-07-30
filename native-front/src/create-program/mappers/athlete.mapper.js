"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteMapper = void 0;
var athlete_entity_1 = require("../../home/entities/athlete.entity");
var AthleteMapper = /** @class */ (function () {
    function AthleteMapper() {
    }
    AthleteMapper.mapToDomain = function (rawAthlete) {
        return new athlete_entity_1.Athlete(rawAthlete.id, rawAthlete.name, rawAthlete.surname, rawAthlete.email, rawAthlete.phone, rawAthlete.address, rawAthlete.birthDate);
    };
    return AthleteMapper;
}());
exports.AthleteMapper = AthleteMapper;
