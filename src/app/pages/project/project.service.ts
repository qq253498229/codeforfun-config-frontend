import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(
        private http: HttpClient
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
            this.http.get('/api/config/project?size=5').subscribe(res => {
                subject.next(res[`content`])
                if (res[`content`].length > 0 && !this.getCurrent()) {
                    this.setCurrent(res[`content`][0])
                }
            })
        }
        return subject;
    }

    checkName(name: string) {
        return this.http.get('/api/config/project/checkName/' + name)
    }
}
