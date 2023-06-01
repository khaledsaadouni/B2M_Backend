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
exports.TaskDayTimeController = void 0;
const common_1 = require("@nestjs/common");
const UpdateTaskDayTime_1 = require("./dto/UpdateTaskDayTime");
const TaskDayTime_service_1 = require("./TaskDayTime.service");
let TaskDayTimeController = class TaskDayTimeController {
    constructor(DaysSerivce) {
        this.DaysSerivce = DaysSerivce;
    }
    async GetTasksDayTime() {
        return this.DaysSerivce.GetTaskDayTime();
    }
    async GetTasksDayTimeById(id) {
        return this.DaysSerivce.GetTaskDayTimeByID(id);
    }
    async AddTaskDayTime(day, t) {
        return this.DaysSerivce.AddTaskDayTime(day, t);
    }
    async UpdateTaskDayTime(id, task) {
        return await this.DaysSerivce.UpdateTaskDayTime(id, task);
    }
    async DeletTaskDayTime(id) {
        return await this.DaysSerivce.RemovaTaskDayTime(id);
    }
    async Getdaytask(debut, fin) {
        const dateDebut = new Date(debut);
        const isoDateStrDebut = dateDebut.toISOString();
        console.log("date debut :", isoDateStrDebut);
        const dateFin = new Date(fin);
        const isoDateStrfin = dateFin.toISOString();
        console.log("Date Fin", isoDateStrfin);
        return await this.DaysSerivce.getTaskDayTimeByDate(isoDateStrDebut, isoDateStrfin);
    }
    async getTaskDayTimeByUser(userId) {
        return await this.DaysSerivce.getTaskDayTimeByUserId(userId);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TaskDayTimeController.prototype, "GetTasksDayTime", null);
__decorate([
    (0, common_1.Get)('getById/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskDayTimeController.prototype, "GetTasksDayTimeById", null);
__decorate([
    (0, common_1.Post)('add/:task'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('task', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], TaskDayTimeController.prototype, "AddTaskDayTime", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateTaskDayTime_1.UpdateTaskDayTimeDto]),
    __metadata("design:returntype", Promise)
], TaskDayTimeController.prototype, "UpdateTaskDayTime", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskDayTimeController.prototype, "DeletTaskDayTime", null);
__decorate([
    (0, common_1.Get)('getbydate/:dd/:df'),
    __param(0, (0, common_1.Param)('dd')),
    __param(1, (0, common_1.Param)('df')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Date,
        Date]),
    __metadata("design:returntype", Promise)
], TaskDayTimeController.prototype, "Getdaytask", null);
__decorate([
    (0, common_1.Get)('getByUser/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], TaskDayTimeController.prototype, "getTaskDayTimeByUser", null);
TaskDayTimeController = __decorate([
    (0, common_1.Controller)('taskdaytime'),
    __metadata("design:paramtypes", [TaskDayTime_service_1.TaskDayTimeService])
], TaskDayTimeController);
exports.TaskDayTimeController = TaskDayTimeController;
//# sourceMappingURL=TaskDayTime.controller.js.map