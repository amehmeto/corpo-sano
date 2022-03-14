"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyTaskInMemoryRepository = void 0;
const daily_task_entity_1 = require("../entities/daily-task.entity");
const daily_task_data_builder_1 = require("../data-builders/daily-task.data-builder");
class DailyTaskInMemoryRepository {
    constructor() {
        this.dailyTasks = [
            new daily_task_entity_1.DailyTask((0, daily_task_data_builder_1.dailyTaskDataBuilder)()),
            new daily_task_entity_1.DailyTask((0, daily_task_data_builder_1.dailyTaskDataBuilder)()),
            new daily_task_entity_1.DailyTask((0, daily_task_data_builder_1.dailyTaskDataBuilder)()),
            new daily_task_entity_1.DailyTask((0, daily_task_data_builder_1.dailyTaskDataBuilder)()),
        ];
    }
    find() {
        return Promise.resolve(this.dailyTasks);
    }
}
exports.DailyTaskInMemoryRepository = DailyTaskInMemoryRepository;
//# sourceMappingURL=daily-task.in-memory.repository.js.map