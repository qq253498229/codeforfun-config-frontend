import {Component, OnInit} from '@angular/core';
import {ProjectService} from "./pages/project/project.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    isCollapsed = false;

    current = ''

    constructor(
        private projectService: ProjectService,
    ) {
    }

    ngOnInit(): void {
        this.load()
    }

    load() {
        const currentProject = this.projectService.getCurrent()
        if (currentProject) {
            this.current = currentProject[`name`]
        }
        this.projectService.current$.subscribe(res => {
            this.current = res[`name`]
        })
    }
}
