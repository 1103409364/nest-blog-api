import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs/operators";

export interface Response<T> {
  data: T;
}

export class TransformInterceptor<T extends { businessCode?: string }>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler<T>) {
    return next.handle().pipe(
      map((data) => ({
        code: (data || {}).businessCode || 0,
        message: "OK",
        data,
      })),
    );
  }
}
