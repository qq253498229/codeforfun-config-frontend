import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
    selector: 'app-notice',
    templateUrl: './notice.component.html',
    styleUrls: ['./notice.component.scss']
})
export class NoticeComponent implements OnInit {
    checkAll = {
        'env': {
            allChecked: false,
            indeterminate: false,
            checkOptions: [
                {label: 'env1', value: 'env1', checked: false},
                {label: 'env2', value: 'env2', checked: false},
                {label: 'env3', value: 'env3', checked: false},
            ]
        },
        'conf': {
            allChecked: false,
            indeterminate: false,
            checkOptions: [
                {label: 'conf1', value: 'conf1', checked: false},
                {label: 'conf2', value: 'conf2', checked: false},
                {label: 'conf3', value: 'conf3', checked: false},
            ]
        },
        'app': {
            allChecked: false,
            indeterminate: false,
            checkOptions: [
                {label: 'app1', value: 'app1', checked: false},
                {label: 'app2', value: 'app2', checked: false},
                {label: 'app3', value: 'app3', checked: false},
            ]
        }
    }

    constructor(
        private http: HttpClient,
    ) {
    }

    ngOnInit(): void {
        this.load()
    }

    load() {
        this.http.get(environment.uri+`/`)
    }

    updateAllChecked(flag: string): void {
        const param = this.checkAll[flag]
        param.indeterminate = false;
        if (param.allChecked) {
            param.checkOptions = param.checkOptions.map(item => {
                return {
                    ...item,
                    checked: true
                };
            });
        } else {
            param.checkOptions = param.checkOptions.map(item => {
                return {
                    ...item,
                    checked: false
                };
            });
        }
    }

    updateSingleChecked(flag: string): void {
        const param = this.checkAll[flag]
        if (param.checkOptions.every(item => !item.checked)) {
            param.allChecked = false;
            param.indeterminate = false;
        } else if (param.checkOptions.every(item => item.checked)) {
            param.allChecked = true;
            param.indeterminate = false;
        } else {
            param.indeterminate = true;
        }
    }
}
