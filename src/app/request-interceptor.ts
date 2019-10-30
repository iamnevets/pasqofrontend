import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // tslint:disable-next-line: prefer-const
    let user = JSON.parse(localStorage.getItem('user'));
    let authReq = req.clone();

    if (user) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${user.Token}` }
      });
    }

    return next.handle(authReq);
  }
}
