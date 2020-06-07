import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {FormControl} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    projectList: any[]

    currentProject: string

    constructor(
        private http: HttpClient
    ) {
    }

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

    set project(name: string) {
        this.currentProject = name
    }

    get project() {
        return this.currentProject
    }

    checkName(name: string) {
        return this.http.get('/api/config/project/checkName/' + name)
    }
}
