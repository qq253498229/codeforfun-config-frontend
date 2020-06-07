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

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

    form: FormGroup;


    userNameAsyncValidator(control: FormControl) {
        //todo
        return new Observable((observer: Observer<ValidationErrors | null>) => {
            const func = _.debounce(() => {
                console.log(control.value)
                if (control.value === '123') {
                    observer.next({error: true, duplicated: true})
                } else {
                    observer.next(null)
                }
                observer.complete()
            }, 2000, {maxWait: 5000})
            func()
        })
        // const numbers = timer(1000);
        // numbers.subscribe(x => {
        //     console.log(x)
        //     console.log(control.value)
        // });
        // return numbers

        // return timer(500).switchMap(()=>{
        //     return Observable.of({availability: true})
        // });

        // return this.http.get(`/api/config/project/checkName/${control.value}`).pipe(
        //     debounceTime(1000),
        //     distinctUntilChanged()
        // )

        // return new Observable((observer: Observer<ValidationErrors | null>) => {
        //     const func = _.debounce(() => {
        //         console.log(control.value)
        //         if (control.value === '123') {
        //             observer.next({error: true, duplicated: true})
        //         } else {
        //             observer.next(null)
        //         }
        //         observer.complete()
        //     }, 300)
        //
        //     func()
        // })
    }

    // return new Observable((observer: Observer<ValidationErrors | null>) => {
    //     console.log(control.value)
    //     console.log(that.http)
    //     if (control.value === '123') {
    //         observer.next({error: true, duplicated: true})
    //     } else {
    //         observer.next(null)
    //     }
    //     observer.complete()
    // })

    // userNameAsyncValidator = (control: FormControl) =>
    //     new Observable((observer: Observer<ValidationErrors | null>) => {
    //         setTimeout(() => {
    //             this.service.checkName(control.value).subscribe(res => {
    //                 console.log('res', res)
    //                 if (res) {
    //                     observer.next(null);
    //                 } else {
    //                     observer.next({error: true, duplicated: true});
    //                 }
    //                 observer.complete();
    //             })
    //         }, 1000)
    //     });

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
