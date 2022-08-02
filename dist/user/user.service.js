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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entity/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const current_entity_1 = require("../current_tasks/entity/current.entity");
const current_tasks_service_1 = require("../current_tasks/current_tasks.service");
const task_entity_1 = require("../task/entities/task.entity");
let UserService = class UserService {
    constructor(userRepository, TaskRepo, jwtService, currentservice, currentRepo) {
        this.userRepository = userRepository;
        this.TaskRepo = TaskRepo;
        this.jwtService = jwtService;
        this.currentservice = currentservice;
        this.currentRepo = currentRepo;
    }
    async getcurrent(id) {
        const u = await this.userRepository.findOneBy({ id });
        return this.currentservice.getCurrent(u.current.id);
    }
    async register(userData) {
        const user = new user_entity_1.UserEntity();
        user.username = userData.username;
        user.password = userData.password;
        user.name = userData.name;
        user.firstname = userData.firstname;
        user.job = userData.job;
        const c = this.currentservice.createCurrent();
        user.current = await c;
        user.email = userData.email;
        user.phone = userData.phone;
        user.role = userData.role;
        user.gender = userData.gender;
        user.salt = await bcrypt.genSalt();
        user.password = await bcrypt.hash(user.password, user.salt);
        try {
            await this.userRepository.save(user);
        }
        catch (e) {
            throw new common_1.ConflictException(`Le username et le email doivent être unique`);
        }
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
        };
    }
    async getloggeduser(id) {
        return await this.userRepository.findOneBy({ id });
    }
    async login(credentials) {
        const username = credentials.email;
        const password = credentials.password;
        const user = await this.userRepository
            .createQueryBuilder('user')
            .where('user.username = :username or user.email = :username', {
            username,
        })
            .getOne();
        if (!user)
            throw new common_1.NotFoundException('username ou password erronée c=>' +
                credentials.email +
                ' p=>' +
                credentials.password);
        const hashedPassword = await bcrypt.hash(password, user.salt);
        if (hashedPassword === user.password) {
            const payload = {
                username: user.username,
                email: user.email,
                role: user.role,
            };
            const jwt = await this.jwtService.sign(payload);
            return {
                access_token: jwt,
                id: user.id,
            };
        }
        else {
            console.log(user.email + ' ' + user.password);
            throw new common_1.NotFoundException('username ou password erronée u');
        }
    }
    async GetUsers() {
        return await this.userRepository.find();
    }
    async delete(id) {
        const u = await this.userRepository.findOneBy({ id });
        u.current = null;
        this.userRepository.save(u);
        for (const t of u.tasks) {
            t.user = null;
            this.TaskRepo.save(t);
        }
        return await this.userRepository.delete(id);
    }
    async UpdateUser(id, user) {
        if (!user.role) {
            delete user.role;
        }
        if (user.password) {
            user.salt = await bcrypt.genSalt();
            user.password = await bcrypt.hash(user.password, user.salt);
        }
        else {
            delete user.password;
        }
        const newuser = await this.userRepository.preload(Object.assign({ id }, user));
        if (!newuser) {
            throw new common_1.NotFoundException('The specefied user does not exist');
        }
        return await this.userRepository.save(newuser);
    }
    async Getdevs() {
        return await this.userRepository.find({ where: { role: 'dev' } });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(task_entity_1.TaskEntity)),
    __param(4, (0, typeorm_2.InjectRepository)(current_entity_1.CurrentEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        jwt_1.JwtService,
        current_tasks_service_1.CurrentTasksService,
        typeorm_1.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map