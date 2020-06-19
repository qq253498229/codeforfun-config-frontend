import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../../project/project.service";
import {EnvService} from "../env.service";
import {NzMessageService} from "ng-zorro-antd";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    param = {
        page: 0,
        size: 10,
        projectId: null
    }

    result = {
        list: [],
        total: 0
    }

    isSpinning = true

    constructor(
        private http: HttpClient,
        private projectService: ProjectService,
        private service: EnvService,
        private message: NzMessageService,
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
        this.http.get(`${environment.uri}/env`, {params: this.param}).subscribe(res => {
            this.result.list = res[`list`]
            this.result.total = res[`total`]
            this.isSpinning = false
        })
    }

    changePage(pageSize) {
        this.param.page = pageSize - 1
        this.load()
    }

    delete(id) {
        this.http.delete(`${environment.uri}/env/${id}`).subscribe(res => {
            this.message.create('success', '删除成功')
            this.load()
        })
    }
}
