"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModule = void 0;
const common_1 = require("@nestjs/common");
const project_controller_1 = require("./project.controller");
const project_service_1 = require("./project.service");
const typeorm_1 = require("@nestjs/typeorm");
const project_entity_1 = require("./entity/project.entity");
const task_entity_1 = require("../task/entities/task.entity");
const client_entity_1 = require("../client/entity/client.entity");
const days_entity_1 = require("../days/entity/days.entity");
let ProjectModule = class ProjectModule {
};
ProjectModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                project_entity_1.ProjectEntity,
                task_entity_1.TaskEntity,
                client_entity_1.ClientEntity,
                days_entity_1.DaysEntity,
            ]),
        ],
        controllers: [project_controller_1.ProjectController],
        providers: [project_service_1.ProjectService],
        exports: [project_service_1.ProjectService],
    })
], ProjectModule);
exports.ProjectModule = ProjectModule;
//# sourceMappingURL=project.module.js.map