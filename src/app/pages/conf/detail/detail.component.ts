import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {EnvService} from "../../env/env.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NzMessageService} from "ng-zorro-antd";
import {ProjectService} from "../../project/project.service";
import {Hotkey, HotkeysService} from "angular2-hotkeys";

@Component({
    selector: 'app-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
    form: FormGroup;
    projectId
    envId
    keys = []
    format = true
    propertyText = ''

    constructor(
        private fb: FormBuilder,
        private http: HttpClient,
        private service: EnvService,
        private router: Router,
        private message: NzMessageService,
        private projectService: ProjectService,
        private route: ActivatedRoute,
        private hotkey: HotkeysService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            id: [],
            name: [],
            code: [],
            propertyList: this.fb.array([])
        });

        const current = this.projectService.getCurrent()
        this.projectId = current.id

        this.route.paramMap.subscribe(res => {
            this.envId = res.get('envId')
            const id = res.get('id')
            if (id) {
                this.load(id)
            }
        })

        this.keys.push(this.hotkey.add(new Hotkey(['alt+n', 'option+n'], (): boolean => {
            this.router.navigate(['/conf/new', this.envId])
            return false; // Prevent bubbling
        }, undefined, '新建配置')))
        this.keys.push(this.hotkey.add(new Hotkey(['alt+l', 'option+l'], (): boolean => {
            this.router.navigate(['/conf'])
            return false; // Prevent bubbling
        }, undefined, '配置列表')))
    }

    get propertyList() {
        return this.form.get('propertyList') as FormArray
    }

    load(id: string) {
        this.http.get(`/api/config/conf/${id}`).subscribe(res => {
            this.form.patchValue(res)
            this.formatChange(res)
        })
    }

    ngOnDestroy(): void {
        this.keys.forEach(k => {
            this.hotkey.remove(k)
        })
    }

    submitForm(): void {
        for (const i in this.form.controls) {
            this.form.controls[i].markAsDirty();
            this.form.controls[i].updateValueAndValidity();
        }
        this.convertTextToForm()
        this.http.post(`/api/config/conf?envId=${this.envId}`, this.form.value).subscribe(() => {
            this.message.create('success', '创建成功')
            this.router.navigate(['/conf'])
        })
    }

    addProperty(obj?: any) {
        this.propertyList.push(this.fb.group({
            id: [obj ? obj.id : null],
            key: [obj ? obj.key : null],
            value: [obj ? obj.value : null],
        }))
    }

    formatChange(res?: any) {
        if (res) {
            res[`propertyList`].forEach(p => this.addProperty(p))
        }
        if (this.format) {
            this.propertyText = ''
            this.form.value.propertyList.forEach(p => {
                this.propertyText += p.key + "=" + p.value + "\n"
            })
        }
    }

    remove(idx) {
        this.propertyList.removeAt(idx)
    }

    convertTextToForm() {
        const result = []
        const list = this.propertyText.split("\n")
        list.forEach(o => {
            if (o.indexOf("=") > 0) {
                const obj = o.split("=")
                result.push({key: obj[0], value: obj[1]})
            }
        })
        this.form.value.propertyList = result
    }
}
