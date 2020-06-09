import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {EnvService} from "../env.service";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    form: FormGroup;


    nameAsyncValidator(control: FormControl) {
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
        this.http.post(`/api/config/env`, this.form.value).subscribe(res => {
            this.message.create('success', '创建成功')
            this.router.navigate(['/env'])
        })
    }

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private service: EnvService,
        private router: Router,
        private message: NzMessageService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null, [Validators.required], [this.nameAsyncValidator.bind(this)]],
            description: [null, [Validators.required]]
        });
    }
}
