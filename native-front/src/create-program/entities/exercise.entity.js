"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exercise = void 0;
var Exercise = /** @class */ (function () {
    function Exercise(id, template, numberOfSets, numberOfReps, interSetsRestTime, finalRestTime) {
        this.id = id;
        this.template = template;
        this.numberOfSets = numberOfSets;
        this.numberOfReps = numberOfReps;
        this.interSetsRestTime = interSetsRestTime;
        this.finalRestTime = finalRestTime;
    }
    return Exercise;
}());
exports.Exercise = Exercise;
