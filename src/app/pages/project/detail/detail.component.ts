import {Component, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../project.service";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    form: FormGroup;


    userNameAsyncValidator(control: FormControl) {
        // fixme 每输入一个字符都会发送一个http请求进行后台校验，会影响性能，应该改成几秒内发送一次
        return this.service.checkName(control.value).pipe(
            map(res => {
                if (res) {
                    return {}
                } else {
                    return {error: true, duplicated: true}
                }
            })
        )
    }


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
            name: [null, [Validators.required], [this.userNameAsyncValidator.bind(this)]],
        });
    }
}
