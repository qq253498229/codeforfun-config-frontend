import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class EnvService {
    keys = []

    constructor(
        private hotkey: HotkeysService,
        private router: Router,
    ) {
    }

    init() {
        this.keys.push(this.hotkey.add(new Hotkey(['alt+n', 'option+n'], (): boolean => {
            this.router.navigate(['/env/new'])
            return false; // Prevent bubbling
        }, undefined, '新建环境')))
        this.keys.push(this.hotkey.add(new Hotkey(['alt+l', 'option+l'], (): boolean => {
            this.router.navigate(['/env'])
            return false; // Prevent bubbling
        }, undefined, '环境列表')))
    }

    destroy() {
        this.keys.forEach(k => {
            this.hotkey.remove(k)
        })
    }
}
