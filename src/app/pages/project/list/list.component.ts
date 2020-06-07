import {Component, OnInit} from '@angular/core';
import {ProjectService} from "../project.service";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    listOfData = [];

    constructor(
        private service: ProjectService
    ) {
    }

    ngOnInit(): void {
        this.load()
    }

    private load() {
        this.service.list.subscribe(res => {
            this.listOfData = res
        })
    }
}
