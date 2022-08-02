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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const client_entity_1 = require("./entity/client.entity");
const typeorm_2 = require("@nestjs/typeorm");
const project_service_1 = require("../project/project.service");
const project_entity_1 = require("../project/entity/project.entity");
let ClientService = class ClientService {
    constructor(ClientRepo, projectrepo, ProjectServiice) {
        this.ClientRepo = ClientRepo;
        this.projectrepo = projectrepo;
        this.ProjectServiice = ProjectServiice;
    }
    async GetClients() {
        return await this.ClientRepo.find();
    }
    async GetClinetById(id) {
        return await this.ClientRepo.findOneBy({ id });
    }
    async AddClient(client) {
        return await this.ClientRepo.save(client);
    }
    async UpdateClient(id, client, projid) {
        const update = await this.ClientRepo.preload(Object.assign({ id }, client));
        if (projid != -1) {
            update.projects.push(await this.ProjectServiice.GetProjectById(projid));
        }
        return await this.ClientRepo.save(update);
    }
    async RemoveClient(id) {
        const pro = await this.ClientRepo.findOneBy({ id });
        const t = await this.projectrepo
            .createQueryBuilder('project')
            .select('')
            .where('project.clientId= :id', { id })
            .getMany();
        for (const p of t) {
            p.client = null;
            this.projectrepo.save(p);
        }
        return await this.ClientRepo.remove(pro);
    }
};
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(client_entity_1.ClientEntity)),
    __param(1, (0, typeorm_2.InjectRepository)(project_entity_1.ProjectEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        project_service_1.ProjectService])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map