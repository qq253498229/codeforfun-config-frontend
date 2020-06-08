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

@Injectable({
    providedIn: 'root'
})
export class ProjectGuard implements CanActivate, CanActivateChild {

    constructor(
        private service: ProjectService,
        private router: Router,
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.service.getCurrent()) {
            return true;
        }
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
