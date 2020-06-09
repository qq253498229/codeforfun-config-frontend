import {Component, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../project.service";
import {Router} from "@angular/router";
import {NzMessageService, NzNotificationService} from "ng-zorro-antd";
import * as _ from 'lodash'

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private service: ProjectService,
        private router: Router,
        private message: NzMessageService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null],
            code: [null]
        });
    }

    // 校验项目名
    // https://angular.cn/guide/http#debouncing-requests

    submitForm(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        this.http.post(`/api/config/project`, this.form.value).subscribe(res => {
            this.message.create('success', '创建成功')
            this.router.navigate(['/project'])
        })
    }
}
