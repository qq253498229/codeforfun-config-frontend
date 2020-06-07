import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "./pages/project/project.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isCollapsed = false;

    projectList = []

    constructor(
        private projectService: ProjectService,
    ) {
    }

    ngOnInit(): void {
        this.load()
    }

    load() {
        this.projectService.list.subscribe(res => {
            this.projectList = res;
        })
    }
}
