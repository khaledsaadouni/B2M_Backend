"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskDayTimeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const task_entity_1 = require("../task/entities/task.entity");
const TaskDayTime_1 = require("./entity/TaskDayTime");
const TaskDayTime_controller_1 = require("./TaskDayTime.controller");
const TaskDayTime_service_1 = require("./TaskDayTime.service");
let TaskDayTimeModule = class TaskDayTimeModule {
};
TaskDayTimeModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([TaskDayTime_1.TasksDayTime, task_entity_1.TaskEntity])],
        providers: [TaskDayTime_service_1.TaskDayTimeService],
        controllers: [TaskDayTime_controller_1.TaskDayTimeController],
    })
], TaskDayTimeModule);
exports.TaskDayTimeModule = TaskDayTimeModule;
//# sourceMappingURL=TaskDayTime.module.js.map