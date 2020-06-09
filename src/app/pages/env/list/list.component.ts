import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../../project/project.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    param = {
        page: 0,
        size: 10,
        projectId: null
    }

    result = {
        content: [],
        totalElements: 0
    }


    constructor(
        private http: HttpClient,
        private project: ProjectService,
    ) {
    }

    ngOnInit(): void {
        const current = this.project.getCurrent()
        this.param.projectId = current.id

        this.load()
    }

    load() {
        // @ts-ignore
        this.http.get('/api/config/env', {params: this.param}).subscribe(res => {
            this.result.content = res[`content`]
            this.result.totalElements = res[`totalElements`]
        })
    }

    changePage(pageSize) {
        this.param.page = pageSize - 1
        this.load()
    }
}
