"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeekDays = void 0;
const graphql_1 = require("@nestjs/graphql");
var WeekDays;
(function (WeekDays) {
    WeekDays["MONDAY"] = "MONDAY";
    WeekDays["TUESDAY"] = "TUESDAY";
    WeekDays["WEDNESDAY"] = "WEDNESDAY";
    WeekDays["THURSDAY"] = "THURSDAY";
    WeekDays["FRIDAY"] = "FRIDAY";
    WeekDays["SATURDAY"] = "SATURDAY";
    WeekDays["SUNDAY"] = "SUNDAY";
})(WeekDays = exports.WeekDays || (exports.WeekDays = {}));
(0, graphql_1.registerEnumType)(WeekDays, {
    name: 'WeekDays',
});
//# sourceMappingURL=week-days.enum.js.map