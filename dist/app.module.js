"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const task_module_1 = require("./task/task.module");
const typeorm_1 = require("@nestjs/typeorm");
const days_module_1 = require("./days/days.module");
const test_controller_1 = require("./test/test.controller");
const client_module_1 = require("./client/client.module");
const current_tasks_module_1 = require("./current_tasks/current_tasks.module");
const user_module_1 = require("./user/user.module");
const TaskDayTime_module_1 = require("./TaskDayTime/TaskDayTime.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            client_module_1.ClientModule,
            task_module_1.TaskModule,
            days_module_1.DaysModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: '',
                database: 'nest_project',
                synchronize: false,
                autoLoadEntities: true,
            }),
            current_tasks_module_1.CurrentTasksModule,
            user_module_1.UserModule,
            TaskDayTime_module_1.TaskDayTimeModule
        ],
        controllers: [app_controller_1.AppController, test_controller_1.TestController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map