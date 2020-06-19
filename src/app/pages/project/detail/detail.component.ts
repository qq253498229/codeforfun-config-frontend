import {Component, OnDestroy, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
    isSpinning = true

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private service: ProjectService,
        private router: Router,
        private message: NzMessageService,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            projectId: [],
            projectName: [],
            projectCode: []
        });

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

    // 校验项目名
    // https://angular.cn/guide/http#debouncing-requests

    submitForm(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        this.http.post(`${environment.uri}/project`, this.form.value).subscribe(res => {
            if (this.form.value.projectId && this.form.value.projectId == this.service.getCurrent().projectId) {
                this.service.setCurrent(this.form.value)
            }
            this.message.create('success', '创建成功')
            this.router.navigate(['/project'])
        })
    }

    load(id) {
        this.http.get(`${environment.uri}/project/${id}`).subscribe(res => {
            this.form.patchValue(res)
            this.isSpinning = false
        })
    }
}
