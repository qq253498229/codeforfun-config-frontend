import {Component, OnInit} from '@angular/core';
import {ProjectService} from "./pages/project/project.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isCollapsed = false;

    projectList = []

    currentProject = {}

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
        this.currentProject = this.projectService.getCurrent()
        this.projectService.current$.subscribe(res => {
            this.currentProject = res
        })
    }
}
