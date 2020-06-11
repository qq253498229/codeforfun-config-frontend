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
        size: 12,
        projectId: null
    }
    result = {
        content: [],
        totalElements: 0
    }

    constructor(
        private http: HttpClient,
        private projectService: ProjectService,
    ) {
    }

    ngOnInit(): void {
        const current = this.projectService.getCurrent()
        this.param.projectId = current.id

        this.load()
    }

    load() {
        // @ts-ignore
        this.http.get(`/api/config/app`, {params: this.param}).subscribe(res => {
            console.log('res', res)
            this.result.content = res[`content`]
            this.result.totalElements = res[`totalElements`]
        })
    }

    changePage(pageSize) {
        this.param.page = pageSize - 1
        this.load()
    }
}
