"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProgramService = void 0;
const common_1 = require("@nestjs/common");
const program_entity_1 = require("./entities/program.entity");
const program_repository_interface_1 = require("./repositories/program-repository.interface");
let ProgramService = class ProgramService {
    constructor(programRepository) {
        this.programRepository = programRepository;
    }
    async create(title) {
        const program = new program_entity_1.Program({
            title,
        });
        return this.programRepository.save(program);
    }
    async getAllPrograms() {
        return this.programRepository.getAllPrograms();
    }
};
ProgramService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(program_repository_interface_1.PROGRAM_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], ProgramService);
exports.ProgramService = ProgramService;
//# sourceMappingURL=program.service.js.map