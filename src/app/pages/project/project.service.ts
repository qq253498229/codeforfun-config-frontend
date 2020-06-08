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

    private current = new Subject<any>()

    current$ = this.current.asObservable()

    setCurrent(obj: any) {
        localStorage.setItem('CURRENT_PROJECT', JSON.stringify(obj))
        this.current.next(obj)
    }

    getCurrent() {
        return JSON.parse(localStorage.getItem('CURRENT_PROJECT') || '{}')
    }

    projectList: any[]

    currentProject: string

    get list(): Observable<any[]> {
        const subject = new Subject<any[]>();
        if (this.projectList) {
            subject.next(this.projectList)
        } else {
            this.http.get('/api/config/project?size=5').subscribe(res => {
                subject.next(res[`content`])
            })
        }
        return subject;
    }

}
