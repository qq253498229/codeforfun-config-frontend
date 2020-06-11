import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../../env/env.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {ProjectService} from "../../project/project.service";
import * as _ from 'lodash'

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


    form: FormGroup;
    app;

    param = {
        envId: null,
        projectId: null,
    }

    result = {
        envList: [],
        confList: [],
        checkbox: [],
    }


    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private service: EnvService,
        private router: Router,
        private message: NzMessageService,
        private projectService: ProjectService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            id: [],
            name: [],
            code: [],
            configList: [],
        });

        const current = this.projectService.getCurrent()
        this.param.projectId = current.id
        this.loadApp()
    }

    submitForm(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        const configList = []
        this.result.envList.forEach(e => {
            e.configList.forEach(c => {
                if (c.checked === true) {
                    configList.push(c)
                }
            })
        })
        this.form.patchValue({configList: configList})
        this.http.post(`/api/config/app?projectId=${this.param.projectId}`, this.form.value).subscribe(() => {
            this.message.create('success', '创建成功')
            this.router.navigate(['/app'])
        })
    }

    loadApp() {
        this.route.paramMap.subscribe(p => {
            const id = p.get('id')
            if (id) {
                this.http.get(`/api/config/app/${id}`).subscribe(res => {
                    this.app = res
                    this.form.patchValue(res)
                    this.loadEnv()
                })
            } else {
                this.loadEnv()
            }
        })
    }

    loadEnv() {
        this.http.get<any[]>(`/api/config/env/findAll?projectId=${this.param.projectId}`).subscribe(res => {
            this.result.envList = res
            const configList = this.form.get('configList').value
            _.forEach(this.result.envList, e => {
                _.forEach(e.configList, c => {
                    c.value = c.id
                    c.label = c.name
                    c.checked = _.findIndex(configList, {id: c.id}) > -1
                })
            })
        })
    }

    log($event: any) {
        console.log('log', $event)
    }
}
