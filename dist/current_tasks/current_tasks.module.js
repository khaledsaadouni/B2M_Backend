"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentTasksModule = void 0;
const common_1 = require("@nestjs/common");
const current_tasks_controller_1 = require("./current_tasks.controller");
const current_tasks_service_1 = require("./current_tasks.service");
const typeorm_1 = require("@nestjs/typeorm");
const current_entity_1 = require("./entity/current.entity");
const task_entity_1 = require("../task/entities/task.entity");
let CurrentTasksModule = class CurrentTasksModule {
};
CurrentTasksModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([current_entity_1.CurrentEntity, task_entity_1.TaskEntity])],
        controllers: [current_tasks_controller_1.CurrentTasksController],
        providers: [current_tasks_service_1.CurrentTasksService],
        exports: [current_tasks_service_1.CurrentTasksService],
    })
], CurrentTasksModule);
exports.CurrentTasksModule = CurrentTasksModule;
//# sourceMappingURL=current_tasks.module.js.map