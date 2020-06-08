import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ProjectService} from "../project.service";
import {HttpClient} from "@angular/common/http";
import * as _ from 'lodash'

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    listOfData = [];

    current = {}

    constructor(
        private service: ProjectService,
        private http: HttpClient,
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
        this.service.setCurrent(this.current)
    }
}
