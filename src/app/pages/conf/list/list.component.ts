import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../../project/project.service";
import {NzMessageService} from "ng-zorro-antd";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    projectId
    envList = []

    param = {
        page: 0,
        size: 10,
        envId: null
    }

    result = {
        content: [],
        totalElements: 0
    }

    constructor(
        private http: HttpClient,
        private message: NzMessageService,
        private projectService: ProjectService,
    ) {
    }

    ngOnInit(): void {
        const current = this.projectService.getCurrent()
        this.projectId = current.id

        this.loadEnvList()
    }

    changeEnv(envId) {
        this.param.envId = envId
        this.loadConfList()
    }

    loadEnvList() {
        this.http.get(`/api/config/env?projectId=${this.projectId}`).subscribe(res => {
            this.envList = res[`content`]
            if (this.envList && this.envList.length > 0) {
                this.changeEnv(this.envList[0].id)
            }
        })
    }

    loadConfList() {
        // @ts-ignore
        this.http.get(`/api/config/conf`, {params: this.param}).subscribe(res => {
            this.result.content = res[`content`]
            this.result.totalElements = res[`totalElements`]
        })
    }


    changePage(pageSize) {
        this.param.page = pageSize - 1
        this.loadConfList()
    }

    delete(confId) {
        this.http.delete(`/api/config/conf/${confId}`).subscribe(res => {
            this.message.create('success', '删除成功')
            this.loadConfList()
        })
    }
}
