import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../../env/env.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {ProjectService} from "../../project/project.service";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {


    form: FormGroup;
    projectId;
    app;

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
            envList: []
        });

        const current = this.projectService.getCurrent()
        this.projectId = current.id
        this.loadEnv()
        // this.loadApp()
    }

    submitForm(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        this.http.post(`/api/config/app?projectId=${this.projectId}`, this.form.value).subscribe(() => {
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
                })
            }
        })
    }

    loadEnv() {
        this.http.get(`/api/config/env/findAll?projectId=${this.projectId}`).subscribe(res => {
            console.log(res)
        })
    }
}
