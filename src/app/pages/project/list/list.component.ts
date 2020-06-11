import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from "../project.service";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash'
import {NzMessageService} from "ng-zorro-antd";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    param = {
        page: 0,
        size: 10,
    }

    result = {
        content: [],
        totalElements: 0
    }

    current: { id: number, name: string }

    constructor(
        private service: ProjectService,
        private http: HttpClient,
        private message: NzMessageService,
    ) {
    }

    ngOnInit(): void {
        this.load()
    }

    private load() {
        // @ts-ignore
        this.http.get('/api/config/project', {params: this.param}).subscribe(res => {
            this.result.content = res[`content`]
            this.result.totalElements = res[`totalElements`]
        })
        this.current = this.service.getCurrent()
    }

    setCurrent(id) {
        this.current = _.find(this.result.content, o => o.id == id)
        this.service.setCurrent({id: this.current[`id`], name: this.current[`name`], code: this.current[`code`]})
    }

    delete(id: number) {
        this.http.delete(`/api/config/project/${id}`).subscribe(() => {
            this.message.create('success', '删除成功')
            this.load()
        })
    }

    changePage(pageSize) {
        this.param.page = pageSize - 1
        this.load()
    }
}
