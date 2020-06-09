import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
    listOfData = []

    constructor(
        private http: HttpClient
    ) {
    }

    ngOnInit(): void {
        this.load()
    }

    load() {
        this.http.get(`/api/config/env`).subscribe(res => {
            this.listOfData = res[`content`]
        })
    }
}
