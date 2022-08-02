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
exports.DaysService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const days_entity_1 = require("./entity/days.entity");
const task_entity_1 = require("../task/entities/task.entity");
let DaysService = class DaysService {
    constructor(DaysRepo, TaskRepo) {
        this.DaysRepo = DaysRepo;
        this.TaskRepo = TaskRepo;
    }
    async GetDays() {
        return await this.DaysRepo.find();
    }
    async GetDayByID(id) {
        return await this.DaysRepo.findOneBy({ id });
    }
    async AddDay(Day, id) {
        const p = await await this.TaskRepo.findOneBy({ id });
        const t = new days_entity_1.DaysEntity();
        t.day = Day.day;
        t.month = Day.month;
        t.year = Day.year;
        t.coef = Day.coef;
        t.task = p;
        return await this.DaysRepo.save(t);
    }
    async UpdateDay(id, day) {
        const newday = await this.DaysRepo.preload(Object.assign({ id }, day));
        if (!newday) {
            throw new common_1.NotFoundException('The specefied task does not exist');
        }
        return await this.DaysRepo.save(newday);
    }
    async RemovaDay(id) {
        const pro = await this.DaysRepo.findOneBy({ id });
        return await this.DaysRepo.remove(pro);
    }
    async daytask(t, d, m, y) {
        const qb = this.DaysRepo.createQueryBuilder('day');
        return await qb
            .select('')
            .where(`day.taskId = ${t} and day.day=${d} and day.month=${m} and day.year= ${y}`)
            .getOne();
    }
};
DaysService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(days_entity_1.DaysEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(task_entity_1.TaskEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], DaysService);
exports.DaysService = DaysService;
//# sourceMappingURL=days.service.js.map