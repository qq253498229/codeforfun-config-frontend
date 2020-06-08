import {Injectable} from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    CanActivateChild,
    Router
} from '@angular/router';
import {Observable} from 'rxjs';
import {ProjectService} from "./project.service";
import {NzMessageService} from "ng-zorro-antd";

@Injectable({
    providedIn: 'root'
})
export class ProjectGuard implements CanActivate, CanActivateChild {

    constructor(
        private service: ProjectService,
        private router: Router,
        private message: NzMessageService,
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.service.getCurrent()) {
            return true;
        }
        this.message.create('info', '请先设置当前项目')
        this.router.navigate(['/project'])
        return false;
    }

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.canActivate(next, state);
    }

}
