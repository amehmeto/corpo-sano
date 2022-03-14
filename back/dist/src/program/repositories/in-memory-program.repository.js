"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryProgramRepository = void 0;
const program_entity_1 = require("../entities/program.entity");
const uuid_1 = require("uuid");
class InMemoryProgramRepository {
    save(program) {
        return Promise.resolve(new program_entity_1.Program(Object.assign(Object.assign({}, program), { id: (0, uuid_1.v4)() })));
    }
    getAllPrograms() {
        return Promise.resolve([new program_entity_1.Program(), new program_entity_1.Program()]);
    }
}
exports.InMemoryProgramRepository = InMemoryProgramRepository;
//# sourceMappingURL=in-memory-program.repository.js.map