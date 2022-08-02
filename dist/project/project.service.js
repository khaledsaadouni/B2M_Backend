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
exports.ProjectService = void 0;
const common_1 = require("@nestjs/common");
const project_entity_1 = require("./entity/project.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../task/entities/task.entity");
const client_entity_1 = require("../client/entity/client.entity");
const days_entity_1 = require("../days/entity/days.entity");
let ProjectService = class ProjectService {
    constructor(projectRepo, TaskRepo, ClientRepo, DaysRepo) {
        this.projectRepo = projectRepo;
        this.TaskRepo = TaskRepo;
        this.ClientRepo = ClientRepo;
        this.DaysRepo = DaysRepo;
    }
    async GetProjects() {
        return await this.projectRepo.find();
    }
    async GetProjectById(id) {
        return await this.projectRepo.findOneBy({ id });
    }
    async AddProject(project, id) {
        project.client = await this.ClientRepo.findOneBy({ id });
        return await this.projectRepo.save(project);
    }
    async UpdateProject(id, project, idc) {
        const newproject = await this.projectRepo.preload(Object.assign({ id }, project));
        if (!newproject) {
            throw new common_1.NotFoundException('The specefied project does not exist');
        }
        newproject.client = await this.ClientRepo.findOne({
            where: {
                id: idc,
            },
        });
        return await this.projectRepo.save(newproject);
    }
    async RemoveProject(id) {
        const p = await this.GetProjectById(id);
        for (const t of p.tasks) {
            for (const d of t.days) {
                this.DaysRepo.remove(d);
            }
            this.TaskRepo.remove(t);
        }
        return await this.projectRepo.delete(id);
    }
};
ProjectService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(project_entity_1.ProjectEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(client_entity_1.ClientEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(days_entity_1.DaysEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], ProjectService);
exports.ProjectService = ProjectService;
//# sourceMappingURL=project.service.js.map