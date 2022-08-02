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
exports.ProjectEntity = void 0;
const typeorm_1 = require("typeorm");
const timestamp_entity_1 = require("../../generics/timestamp.entity");
const task_entity_1 = require("../../task/entities/task.entity");
const client_entity_1 = require("../../client/entity/client.entity");
let ProjectEntity = class ProjectEntity extends timestamp_entity_1.TimestampEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProjectEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProjectEntity.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date' }),
    __metadata("design:type", Date)
], ProjectEntity.prototype, "DL", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => task_entity_1.TaskEntity, (task) => task.project, {
        eager: true,
    }),
    __metadata("design:type", Array)
], ProjectEntity.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => client_entity_1.ClientEntity, (client) => client.projects, {
        eager: true,
    }),
    __metadata("design:type", client_entity_1.ClientEntity)
], ProjectEntity.prototype, "client", void 0);
ProjectEntity = __decorate([
    (0, typeorm_1.Entity)('project')
], ProjectEntity);
exports.ProjectEntity = ProjectEntity;
//# sourceMappingURL=project.entity.js.map