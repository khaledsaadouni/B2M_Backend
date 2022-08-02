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
exports.CurrentEntity = void 0;
const typeorm_1 = require("typeorm");
const task_entity_1 = require("../../task/entities/task.entity");
const user_entity_1 = require("../../user/entity/user.entity");
let CurrentEntity = class CurrentEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CurrentEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)((type) => task_entity_1.TaskEntity, (task) => task.current, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], CurrentEntity.prototype, "tasks", void 0);
__decorate([
    (0, typeorm_1.OneToOne)((type) => user_entity_1.UserEntity, (user) => user.current, { cascade: true }),
    __metadata("design:type", user_entity_1.UserEntity)
], CurrentEntity.prototype, "user", void 0);
CurrentEntity = __decorate([
    (0, typeorm_1.Entity)('current')
], CurrentEntity);
exports.CurrentEntity = CurrentEntity;
//# sourceMappingURL=current.entity.js.map