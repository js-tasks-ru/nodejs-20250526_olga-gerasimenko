import { Module } from "@nestjs/common";
import { NotificationsModule } from './notifications/notifications.module';
import { TasksModule } from "./tasks/tasks.module";
import { UsersModule } from './users/users.module';

@Module({
  imports: [NotificationsModule, TasksModule, UsersModule],
})
export class AppModule {}
