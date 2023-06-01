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
exports.TaskDayTimeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const task_entity_1 = require("../task/entities/task.entity");
const TaskDayTime_1 = require("./entity/TaskDayTime");
const moment = require("moment-timezone");
let TaskDayTimeService = class TaskDayTimeService {
    constructor(TaskDayTimeRepo, TaskRepo) {
        this.TaskDayTimeRepo = TaskDayTimeRepo;
        this.TaskRepo = TaskRepo;
    }
    async GetTaskDayTime() {
        const taskDayTime = await this.TaskDayTimeRepo
            .createQueryBuilder('taskDayTime')
            .leftJoinAndSelect('taskDayTime.task', 'task')
            .getMany();
        return taskDayTime;
    }
    async GetTaskDayTimeByID(id) {
        const taskDayTime = await this.TaskDayTimeRepo
            .createQueryBuilder('taskDayTime')
            .leftJoinAndSelect('taskDayTime.task', 'task')
            .where('taskDayTime.id = :id', { id })
            .getOne();
        return taskDayTime;
    }
    async AddTaskDayTime(taskDayTime, id) {
        const p = await this.TaskRepo.findOneBy({ id });
        const t = new TaskDayTime_1.TasksDayTime();
        t.dateDebut = taskDayTime.dateDebut;
        t.dateFin = taskDayTime.dateFin;
        t.duration = taskDayTime.duration;
        t.task = p;
        return await this.TaskDayTimeRepo.save(t);
    }
    async UpdateTaskDayTime(id, taskDayTime) {
        const newtaskdaytime = await this.TaskDayTimeRepo.preload(Object.assign({ id }, taskDayTime));
        if (!newtaskdaytime) {
            throw new common_1.NotFoundException('The specefied task does not exist');
        }
        return await this.TaskDayTimeRepo.save(newtaskdaytime);
    }
    async RemovaTaskDayTime(id) {
        const pro = await this.TaskDayTimeRepo.findOneBy({ id });
        return await this.TaskDayTimeRepo.remove(pro);
    }
    async getTaskDayTimeByDate(datedebut, datefin) {
        const dbTimeZone = await this.TaskDayTimeRepo.query('SELECT @@system_time_zone AS dbTimeZone');
        const formattedDatedebut = moment.utc(datedebut).tz(dbTimeZone[0].dbTimeZone).format('YYYY-MM-DD HH:mm:ss');
        const formattedDatefin = moment.utc(datefin).tz(dbTimeZone[0].dbTimeZone).format('YYYY-MM-DD HH:mm:ss');
        const taskDayTime = await this.TaskDayTimeRepo
            .createQueryBuilder('taskDayTime')
            .leftJoinAndSelect('taskDayTime.task', 'task')
            .where('taskDayTime.dateDebut BETWEEN :datedebut AND :datefin AND taskDayTime.dateFin BETWEEN :datedebut AND :datefin', { datedebut: formattedDatedebut, datefin: formattedDatefin })
            .getMany();
        return taskDayTime;
    }
    async getTaskDayTimeByUserId(userId) {
        return this.TaskDayTimeRepo
            .createQueryBuilder('tasksdaytime')
            .leftJoinAndSelect('tasksdaytime.task', 'task')
            .leftJoin('task.user', 'user')
            .where('user.id = :userId', { userId })
            .getMany();
    }
};
TaskDayTimeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(TaskDayTime_1.TasksDayTime)),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TaskDayTimeService);
exports.TaskDayTimeService = TaskDayTimeService;
//# sourceMappingURL=TaskDayTime.service.js.map