import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {EnvService} from "../env.service";
import {ProjectService} from "../../project/project.service";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

    form: FormGroup;
    projectId;
    isSpinning = true

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
            envId: [],
            envName: [],
            envCode: [],
            projectId: [],
        });

        const current = this.projectService.getCurrent()
        this.projectId = current.projectId

        this.route.paramMap.subscribe(res => {
            const id = res.get('id')
            if (id) {
                this.load(id)
            } else {
                this.isSpinning = false
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
        this.form.patchValue({projectId: this.projectId})
        this.http.post(`${environment.uri}/env`, this.form.value).subscribe(() => {
            this.message.create('success', '创建成功')
            this.router.navigate(['/env'])
        })
    }

    load(id) {
        this.http.get(`${environment.uri}/env/${id}`).subscribe(res => {
            this.form.patchValue(res)
            this.isSpinning = false
        })
    }
}
