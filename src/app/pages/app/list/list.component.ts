import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../../project/project.service";
import {AppService} from "../app.service";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    param = {
        page: 0,
        size: 12,
        projectId: null
    }
    result = {
        list: [],
        total: 0
    }

    constructor(
        private http: HttpClient,
        private projectService: ProjectService,
        private service: AppService,
    ) {
    }

    ngOnInit(): void {
        const current = this.projectService.getCurrent()
        this.param.projectId = current.projectId

        this.load()
        this.service.init()
    }

    ngOnDestroy(): void {
        this.service.destroy()
    }

    load() {
        // @ts-ignore
        this.http.get(`${environment.uri}/app`, {params: this.param}).subscribe(res => {
            this.result.list = res[`list`]
            this.result.total = res[`total`]
        })
    }

    changePage(pageSize) {
        this.param.page = pageSize - 1
        this.load()
    }
}
