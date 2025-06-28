import { NestInterceptor, Injectable, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class ApiVersionInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const now = Date.now();
    return next
      .handle()
      .pipe(
        map((data) => {
          return {
            ...data,
            apiVersion: "1.0",
            executionTime: `${Date.now() - now}ms`
          };
        }),
      );
  }
}
