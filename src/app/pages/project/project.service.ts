import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    keys = []

    constructor(
        private http: HttpClient,
        private hotkey: HotkeysService,
        private router: Router,
    ) {
    }

    projectList: any[]

    private current = new Subject<any>()

    current$ = this.current.asObservable()

    setCurrent(obj: any) {
        localStorage.setItem('CURRENT_PROJECT', JSON.stringify(obj))
        this.current.next(obj)
    }

    getCurrent() {
        const json = localStorage.getItem('CURRENT_PROJECT')
        return json ? JSON.parse(localStorage.getItem('CURRENT_PROJECT')) : null
    }

    get list(): Observable<any[]> {
        const subject = new Subject<any[]>();
        if (this.projectList) {
            subject.next(this.projectList)
        } else {
            this.http.get(`${environment.uri}/project?size=5`).subscribe(res => {
                subject.next(res[`list`])
                if (res[`list`].length > 0 && !this.getCurrent()) {
                    this.setCurrent(res[`list`][0])
                }
            })
        }
        return subject;
    }

    init() {
        this.keys.push(this.hotkey.add(new Hotkey(['alt+n', 'option+n'], (): boolean => {
            this.router.navigate(['/project/new'])
            return false; // Prevent bubbling
        }, undefined, '新建项目')))
        this.keys.push(this.hotkey.add(new Hotkey(['alt+l', 'option+l'], (): boolean => {
            this.router.navigate(['/project'])
            return false; // Prevent bubbling
        }, undefined, '项目列表')))
    }

    destroy() {
        this.keys.forEach(k => {
            this.hotkey.remove(k)
        })
    }
}
