"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryAthleteGateway = void 0;
var athlete_data_builder_1 = require("../../_data-builders/athlete-data.builder");
var athlete_mapper_1 = require("../mappers/athlete.mapper");
var InMemoryAthleteGateway = /** @class */ (function () {
    function InMemoryAthleteGateway() {
        this.rawAthletes = [
            athlete_data_builder_1.athleteDataBuilder(),
            athlete_data_builder_1.athleteDataBuilder(),
            athlete_data_builder_1.athleteDataBuilder(),
        ];
        this.athletes = this.rawAthletes.map(function (rawAthlete) {
            return athlete_mapper_1.AthleteMapper.mapToDomain(rawAthlete);
        });
    }
    InMemoryAthleteGateway.prototype.findAll = function () {
        return Promise.resolve(this.athletes);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    InMemoryAthleteGateway.prototype.findById = function (_athleteId) {
        return Promise.resolve(this.athletes[0]);
    };
    InMemoryAthleteGateway.prototype.delete = function (athleteId) {
        var foundIndex = this.athletes.findIndex(function (athlete) { return athlete.id === athleteId; });
        this.athletes.splice(foundIndex, 1);
        return Promise.resolve();
    };
    return InMemoryAthleteGateway;
}());
exports.InMemoryAthleteGateway = InMemoryAthleteGateway;
