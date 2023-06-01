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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEntity = void 0;
const typeorm_1 = require("typeorm");
const days_entity_1 = require("../../days/entity/days.entity");
const project_entity_1 = require("../../project/entity/project.entity");
const current_entity_1 = require("../../current_tasks/entity/current.entity");
const user_entity_1 = require("../../user/entity/user.entity");
const TaskDayTime_1 = require("../../TaskDayTime/entity/TaskDayTime");
let TaskEntity = class TaskEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], TaskEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], TaskEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => days_entity_1.DaysEntity, (days) => days.task, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], TaskEntity.prototype, "days", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => project_entity_1.ProjectEntity, (project) => project.tasks, {
        cascade: true,
    }),
    __metadata("design:type", project_entity_1.ProjectEntity)
], TaskEntity.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => TaskDayTime_1.TasksDayTime, (tasksDayTime) => tasksDayTime.task, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], TaskEntity.prototype, "tasksDayTimes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => current_entity_1.CurrentEntity, (current) => current.tasks),
    __metadata("design:type", current_entity_1.CurrentEntity)
], TaskEntity.prototype, "current", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_entity_1.UserEntity, (user) => user.tasks),
    __metadata("design:type", user_entity_1.UserEntity)
], TaskEntity.prototype, "user", void 0);
TaskEntity = __decorate([
    (0, typeorm_1.Entity)('task')
], TaskEntity);
exports.TaskEntity = TaskEntity;
//# sourceMappingURL=task.entity.js.map