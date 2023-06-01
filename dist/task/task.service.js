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
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const task_entity_1 = require("./entities/task.entity");
const typeorm_2 = require("@nestjs/typeorm");
const project_service_1 = require("../project/project.service");
const days_entity_1 = require("../days/entity/days.entity");
const user_entity_1 = require("../user/entity/user.entity");
let TaskService = class TaskService {
    constructor(TaskRepo, projectservice, DaysRepo, userRepository) {
        this.TaskRepo = TaskRepo;
        this.projectservice = projectservice;
        this.DaysRepo = DaysRepo;
        this.userRepository = userRepository;
    }
    async GetTasks() {
        const taskDayTime = await this.TaskRepo
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.project', 'project')
            .getMany();
        return taskDayTime;
    }
    async GetTaskByID(id) {
        const taskDayTime = await this.TaskRepo
            .createQueryBuilder('task')
            .leftJoinAndSelect('task.project', 'project')
            .where('task.id = :id', { id })
            .getOne();
        return taskDayTime;
    }
    async GetTaskByIdUser(id) {
        const taskDayTime = await this.TaskRepo
            .createQueryBuilder('task')
            .leftJoin('task.user', 'user')
            .where('user.id = :id', { id })
            .getMany();
        return taskDayTime;
    }
    async AddTask(Task, projID, id) {
        const p = await this.projectservice.GetProjectById(projID);
        const t = new task_entity_1.TaskEntity();
        t.task = Task.task;
        t.project = p;
        t.user = await this.userRepository.findOneBy({ id });
        return await this.TaskRepo.save(t);
    }
    async UpdateTask(id, task, iddev) {
        const newtask = await this.TaskRepo.preload(Object.assign({ id }, task));
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.id = :iddev ', {
            iddev,
        })
            .getOne();
        if (user) {
            newtask.user = user;
        }
        if (!newtask) {
            throw new common_1.NotFoundException('The specefied task does not exist');
        }
        return await this.TaskRepo.save(newtask);
    }
    async RemoveTask(id) {
        const pro = await this.TaskRepo.findOneBy({ id });
        for (const t of pro.days) {
            this.DaysRepo.remove(t);
        }
        return await this.TaskRepo.remove(pro);
    }
    async GetTasksProject(id) {
        const qb = this.TaskRepo.createQueryBuilder('task');
        return await qb.select('').where(`task.projectId = ${id}`).getMany();
    }
};
TaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(task_entity_1.TaskEntity)),
    __param(2, (0, typeorm_2.InjectRepository)(days_entity_1.DaysEntity)),
    __param(3, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        project_service_1.ProjectService,
        typeorm_1.Repository,
        typeorm_1.Repository])
], TaskService);
exports.TaskService = TaskService;
//# sourceMappingURL=task.service.js.map