import {Component, OnInit} from '@angular/core';
import {ProjectService} from "./pages/project/project.service";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Router} from "@angular/router";

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
        private hotkey: HotkeysService,
        private router: Router,
    ) {
        this.hotkey.add(new Hotkey(['alt+0', 'option+0'], (): boolean => {
            this.router.navigate(['/project'])
            return false; // Prevent bubbling
        }, undefined, '跳转到项目列表'));
        this.hotkey.add(new Hotkey(['alt+1', 'option+1'], (): boolean => {
            this.router.navigate(['/app'])
            return false; // Prevent bubbling
        }, undefined, '跳转到主页'));
        this.hotkey.add(new Hotkey(['alt+2', 'option+2'], (): boolean => {
            this.router.navigate(['/env'])
            return false; // Prevent bubbling
        }, undefined, '跳转到环境列表'));
        this.hotkey.add(new Hotkey(['alt+3', 'option+3'], (): boolean => {
            this.router.navigate(['/conf'])
            return false; // Prevent bubbling
        }, undefined, '跳转到配置列表'));
        this.hotkey.add(new Hotkey(['alt+4', 'option+4'], (): boolean => {
            this.router.navigate(['/notice'])
            return false; // Prevent bubbling
        }, undefined, '跳转到通知管理'));
    }

    ngOnInit(): void {
        const isCollapsed = localStorage.getItem('COLLAPSED')
        this.isCollapsed = isCollapsed && isCollapsed === 'true';
        this.load()
    }

    collapsedTrigger(e) {
        localStorage.setItem('COLLAPSED', e)
    }

    load() {
        const currentProject = this.projectService.getCurrent()
        if (currentProject) {
            this.current = currentProject[`projectName`]
        }
        this.projectService.current$.subscribe(res => {
            if (res) {
                this.current = res[`projectName`]
            } else {
                this.current = ''
            }
        })
    }
}
