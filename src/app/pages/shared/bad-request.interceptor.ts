import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import * as _ from "lodash";
import {NzNotificationService} from "ng-zorro-antd";

@Injectable()
export class BadRequestInterceptor implements HttpInterceptor {

    constructor(
        private notification: NzNotificationService,
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(tap(() => {
            }, (err: any) => {
                if (err.status === 400) {
                    _.map(err.error.errors, e => {
                        this.notification.create('error', '参数错误', e.defaultMessage)
                    })
                }
            }
        ));
    }
}
