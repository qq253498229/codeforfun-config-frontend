import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {ProjectService} from "../../project/project.service";
import * as _ from 'lodash'
import {AppService} from "../app.service";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {


    form: FormGroup;
    app;

    param = {
        envId: null,
        project: {
            projectId: null,
            projectName: null,
            projectCode: null
        }
    }

    result = {
        envList: [],
        confList: [],
        checkbox: [],
    }


    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private service: AppService,
        private router: Router,
        private message: NzMessageService,
        private projectService: ProjectService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            appId: [],
            appName: [],
            appCode: [],
            projectId: [],
            configList: [],
        });

        this.param.project = this.projectService.getCurrent()
        this.loadApp()
        this.service.init()
    }

    ngOnDestroy(): void {
        this.service.destroy()
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
        this.form.patchValue({projectId: this.param.project.projectId})
        this.http.post(`${environment.uri}/app`, this.form.value).subscribe(() => {
            this.message.create('success', '创建成功')
            this.router.navigate(['/app'])
        })
    }

    loadApp() {
        this.route.paramMap.subscribe(p => {
            const id = p.get('id')
            if (id) {
                this.http.get(`${environment.uri}/app/${id}`).subscribe(res => {
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
        this.http.get<any[]>(`${environment.uri}/env/findAll?projectId=${this.param.project.projectId}`).subscribe(res => {
            this.result.envList = res
            const configList = this.form.get('configList').value
            _.forEach(this.result.envList, e => {
                _.forEach(e.configList, c => {
                    c.value = c.configId
                    c.label = c.configName
                    c.checked = _.findIndex(configList, {configId: c.configId}) > -1
                })
            })
        })
    }

    copyInputMessage(inputElement) {
        inputElement.select();
        document.execCommand('copy');
        inputElement.setSelectionRange(0, 0);
        this.message.create('success', `复制成功！`);
    }
}
