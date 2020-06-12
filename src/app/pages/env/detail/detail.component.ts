import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {EnvService} from "../env.service";
import {ProjectService} from "../../project/project.service";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

    form: FormGroup;
    projectId;

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
            code: []
        });

        const current = this.projectService.getCurrent()
        this.projectId = current.id

        this.route.paramMap.subscribe(res => {
            const id = res.get('id')
            if (id) {
                this.load(id)
            }
        })

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
        this.http.post(`/api/config/env?projectId=${this.projectId}`, this.form.value).subscribe(() => {
            this.message.create('success', '创建成功')
            this.router.navigate(['/env'])
        })
    }

    load(id) {
        this.http.get(`/api/config/env/${id}`).subscribe(res => {
            this.form.patchValue(res)
        })
    }
}
