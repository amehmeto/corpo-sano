"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authCredentialsInputDataBuilder = void 0;
const Faker = require("faker");
function authCredentialsInputDataBuilder(authCredentialsInput = {}) {
    const template = {
        email: Faker.internet.email(),
        password: 'qwerty',
    };
    return Object.assign(Object.assign({}, template), authCredentialsInput);
}
exports.authCredentialsInputDataBuilder = authCredentialsInputDataBuilder;
//# sourceMappingURL=auth-credentials-input.data-builder.js.map