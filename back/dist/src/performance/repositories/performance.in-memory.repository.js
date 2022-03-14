"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryPerformanceRepository = void 0;
const performance_entity_1 = require("../entities/performance.entity");
class InMemoryPerformanceRepository {
    save(performance) {
        return Promise.resolve(new performance_entity_1.Performance(performance));
    }
}
exports.InMemoryPerformanceRepository = InMemoryPerformanceRepository;
//# sourceMappingURL=performance.in-memory.repository.js.map