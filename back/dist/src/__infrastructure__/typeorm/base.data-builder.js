"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseEntityDataBuilder = void 0;
const Faker = require("faker");
function baseEntityDataBuilder(base = {}) {
    const template = {
        id: Faker.datatype.uuid(),
        createdAt: Faker.date.past(),
        updatedAt: Faker.date.recent(),
        deletedAt: null,
        version: Faker.datatype.number(5),
    };
    return Object.assign(Object.assign({}, template), base);
}
exports.baseEntityDataBuilder = baseEntityDataBuilder;
//# sourceMappingURL=base.data-builder.js.map