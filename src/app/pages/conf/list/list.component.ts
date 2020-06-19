import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../../project/project.service";
import {NzMessageService} from "ng-zorro-antd";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Router} from "@angular/router";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
    projectId
    envList = []
    keys = []
    param = {
        page: 0,
        size: 10,
        envId: null
    }

    result = {
        list: [],
        total: 0
    }
    isSpinning = true

    constructor(
        private http: HttpClient,
        private message: NzMessageService,
        private projectService: ProjectService,
        private router: Router,
        private hotkey: HotkeysService,
    ) {
    }

    ngOnInit(): void {
        const current = this.projectService.getCurrent()
        this.projectId = current.projectId

        this.loadEnvList()

        this.keys.push(this.hotkey.add(new Hotkey(['alt+n', 'option+n'], (): boolean => {
            this.router.navigate(['/conf/new', this.param.envId])
            return false; // Prevent bubbling
        }, undefined, '新建配置')))
        this.keys.push(this.hotkey.add(new Hotkey(['alt+l', 'option+l'], (): boolean => {
            this.router.navigate(['/conf'])
            return false; // Prevent bubbling
        }, undefined, '配置列表')))
    }

    ngOnDestroy(): void {
        this.keys.forEach(k => {
            this.hotkey.remove(k)
        })
    }

    changeEnv(envId) {
        this.isSpinning = true
        this.param.envId = envId
        this.loadConfList()
    }

    loadEnvList() {
        this.http.get(`${environment.uri}/env?projectId=${this.projectId}`).subscribe(res => {
            this.envList = res[`list`]
            if (this.envList && this.envList.length > 0) {
                this.changeEnv(this.envList[0].envId)
            }
        })
    }

    loadConfList() {
        // @ts-ignore
        this.http.get(`${environment.uri}/conf`, {params: this.param}).subscribe(res => {
            this.result.list = res[`list`]
            this.result.total = res[`total`]
            this.isSpinning = false
        })
    }


    changePage(pageSize) {
        this.isSpinning = true
        this.param.page = pageSize - 1
        this.loadConfList()
    }

    delete(confId) {
        this.http.delete(`${environment.uri}/conf/${confId}`).subscribe(res => {
            this.message.create('success', '删除成功')
            this.loadConfList()
        })
    }
}
