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
    listOfData = [];

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
        this.http.get<any[]>('/api/config/project').subscribe(res => {
            this.listOfData = res[`content`]
        })
        this.current = this.service.getCurrent()
    }

    setCurrent(id) {
        this.current = _.find(this.listOfData, o => o.id == id)
        this.service.setCurrent({id: this.current[`id`], name: this.current[`name`], remark: this.current[`code`]})
    }

    delete(id: number) {
        this.http.delete(`/api/config/project/${id}`).subscribe(() => {
            this.message.create('success', '删除成功')
            this.load()
        })
    }
}
