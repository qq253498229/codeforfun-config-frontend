import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash'
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
    }

    result = {
        list: [],
        total: 0
    }

    current: { projectId: number, projectName: string }

    constructor(
        private service: ProjectService,
        private http: HttpClient,
        private message: NzMessageService,
    ) {
    }

    ngOnInit(): void {
        this.load()
        this.service.init()
    }

    ngOnDestroy(): void {
        this.service.destroy()
    }

    private load() {
        // @ts-ignore
        this.http.get(`${environment.uri}/project`, {params: this.param}).subscribe(res => {
            this.result.list = res[`list`]
            this.result.total = res[`total`]
        })
        this.current = this.service.getCurrent()
    }

    setCurrent(projectId) {
        this.current = _.find(this.result.list, o => o.projectId == projectId)
        this.service.setCurrent(this.current)
    }

    delete(id: number) {
        this.http.delete(`${environment.uri}/project/${id}`).subscribe(() => {
            this.message.create('success', '删除成功')
            if (id == this.current.projectId) {
                this.service.setCurrent(null)
            }
            this.load()
        })
    }

    changePage(pageSize) {
        this.param.page = pageSize - 1
        this.load()
    }
}
