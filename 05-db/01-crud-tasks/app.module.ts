import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from "./tasks/tasks.module";

@Module({
  imports: [    
    TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite',
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  }),
  TasksModule],
})
export class AppModule {}
