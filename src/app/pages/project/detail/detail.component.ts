import {Component, OnInit} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup, ValidationErrors,
    Validators
} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ProjectService} from "../project.service";
import {Observable, Observer, timer} from "rxjs";
import * as _ from 'lodash'
import {map} from "rxjs/operators";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    form: FormGroup;


    userNameAsyncValidator(control: FormControl) {
        // fixme 重复发送http请求
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
        console.log(this.form.value)
    }

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private service: ProjectService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: [null, [Validators.required], [this.userNameAsyncValidator.bind(this)]],
        });
    }
}
