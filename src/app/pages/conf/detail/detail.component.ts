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
    projectId
    envId

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
            name: [null],
            code: [null]
        });

        const current = this.projectService.getCurrent()
        this.projectId = current.id

        this.route.paramMap.subscribe(res => {
            this.envId = res.get('envId')
        })
    }

    submitForm(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        this.http.post(`/api/config/conf?envId=${this.envId}`, this.form.value).subscribe(() => {
            this.message.create('success', '创建成功')
            this.router.navigate(['/conf'])
        })
    }
}