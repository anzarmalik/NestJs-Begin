import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, pipe } from 'rxjs';
import { tap } from 'rxjs/operators';
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(
      '🚀 ~ file: wrap-response.interceptor.ts ~ line 7 ~ WrapResponseInterceptor ~ intercept ~ CallHandler',
    );

    return next.handle().pipe(
      tap((data) => {
        console.log(
          '🚀 ~ file: wrap-response.interceptor.ts ~ line 17 ~ WrapResponseInterceptor ~ intercept ~ data',
          data,
        );
      }),
    );
  }
}
