"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
var Program = /** @class */ (function () {
    function Program(id, title, 
    //public readonly description: string,
    workouts) {
        this.id = id;
        this.title = title;
        this.workouts = workouts;
        if (!workouts)
            this.workouts = [];
    }
    return Program;
}());
exports.Program = Program;
