import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ApiVersionInterceptor } from "./interceptors/api-version.interceptor";
import { RolesGuard } from "./guards/roles.guard";
import { LoggingMiddleware } from "./middlewares/logging.middleware";

@Module({
  imports: [TasksModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiVersionInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
