import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import * as _ from 'lodash'
import {NzMessageService} from "ng-zorro-antd";

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
            checkOptions: []
        },
        'config': {
            allChecked: false,
            indeterminate: false,
            checkOptions: []
        },
        'app': {
            allChecked: false,
            indeterminate: false,
            checkOptions: []
        }
    }

    constructor(
        private http: HttpClient,
        private message: NzMessageService,
    ) {
    }

    ngOnInit(): void {
        this.load()
    }

    load() {
        this.http.get<any[]>(`${environment.uri}/notice/loadAll`).subscribe(res => {
            _.map(res, (o, i) => {
                this.checkAll[i] = {
                    allChecked: false,
                    indeterminate: false,
                    checkOptions: _.map(o, o1 => {
                        return {
                            label: o1[i + 'Name'],
                            value: o1[i + 'Id'],
                            checked: false
                        }
                    })
                }
            })
        })
    }

    submit() {
        const result = {}
        _.forIn(this.checkAll, (v, k) => {
            result[k] = _.map(_.filter(v.checkOptions, {checked: true}), o => {
                    return o.value
                }
            )
        })

        this.http.post(`${environment.uri}/notice`, result).subscribe(res => {
            this.message.create('success', '通知成功，服务端配置已经更新！')
        }, err => {
            if (err.status === 302) {
                this.message.create('info', err.error.message)
            } else {
                this.message.create('info', '系统错误，请联系管理员')
            }
        })
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
