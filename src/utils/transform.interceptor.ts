import { EXCLUDE_PATHS } from "@/config/constants";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map } from "rxjs/operators";

export interface Response<T> {
  data: T;
}

export class TransformInterceptor<T extends { businessCode?: string }>
  implements NestInterceptor<T, Response<T> | unknown>
{
  intercept(context: ExecutionContext, next: CallHandler<T>) {
    const req = context.switchToHttp().getRequest();
    // 跳过拦截器
    if (EXCLUDE_PATHS.some((route) => req.url.includes(route))) {
      return next.handle();
    }
    return next.handle().pipe(
      map((data) => ({
        code: (data || {}).businessCode || 0,
        message: "OK",
        data,
      })),
    );
  }
}
