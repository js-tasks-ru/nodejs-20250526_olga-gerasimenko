import { Module } from "@nestjs/common";
import { NotificationsModule } from '../notifications/notifications.module';
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { UsersModule } from '../users/users.module';

@Module({
  imports: [NotificationsModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
