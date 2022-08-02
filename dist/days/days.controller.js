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
exports.DaysController = void 0;
const common_1 = require("@nestjs/common");
const days_service_1 = require("./days.service");
const UpdateDayDt_1 = require("./dto/UpdateDayDt");
let DaysController = class DaysController {
    constructor(DaysSerivce) {
        this.DaysSerivce = DaysSerivce;
    }
    async GetTasks() {
        return this.DaysSerivce.GetDays();
    }
    async AddDay(day, t) {
        return this.DaysSerivce.AddDay(day, t);
    }
    async UpdateDay(id, task) {
        return await this.DaysSerivce.UpdateDay(id, task);
    }
    async DeletDay(id) {
        return await this.DaysSerivce.RemovaDay(id);
    }
    async Getdaytask(t, d, m, y) {
        return await this.DaysSerivce.daytask(t, d, m, y);
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "GetTasks", null);
__decorate([
    (0, common_1.Post)('add/:task'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('task', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "AddDay", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, UpdateDayDt_1.UpdateDayDto]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "UpdateDay", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "DeletDay", null);
__decorate([
    (0, common_1.Get)(':tid/:d/:m/:y'),
    __param(0, (0, common_1.Param)('tid')),
    __param(1, (0, common_1.Param)('d')),
    __param(2, (0, common_1.Param)('m')),
    __param(3, (0, common_1.Param)('y')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Number]),
    __metadata("design:returntype", Promise)
], DaysController.prototype, "Getdaytask", null);
DaysController = __decorate([
    (0, common_1.Controller)('days'),
    __metadata("design:paramtypes", [days_service_1.DaysService])
], DaysController);
exports.DaysController = DaysController;
//# sourceMappingURL=days.controller.js.map