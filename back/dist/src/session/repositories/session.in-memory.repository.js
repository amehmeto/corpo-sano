"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemorySessionRepository = void 0;
const uuid_1 = require("uuid");
const session_entity_1 = require("../entities/session.entity");
class InMemorySessionRepository {
    async save(createSessionInput) {
        return Promise.resolve(new session_entity_1.Session(Object.assign(Object.assign({}, createSessionInput), { id: (0, uuid_1.v4)() })));
    }
}
exports.InMemorySessionRepository = InMemorySessionRepository;
//# sourceMappingURL=session.in-memory.repository.js.map