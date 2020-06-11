import {Injectable} from '@angular/core';
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AppService {
    keys = []

    constructor(
        private hotkey: HotkeysService,
        private router: Router,
    ) {
    }

    init() {
        this.keys.push(this.hotkey.add(new Hotkey(['alt+n', 'option+n'], (): boolean => {
            this.router.navigate(['/app/new'])
            return false; // Prevent bubbling
        }, undefined, '新建应用')))
        this.keys.push(this.hotkey.add(new Hotkey(['alt+l', 'option+l'], (): boolean => {
            this.router.navigate(['/app'])
            return false; // Prevent bubbling
        }, undefined, '应用列表')))
    }

    destroy() {
        this.keys.forEach(k => {
            this.hotkey.remove(k)
        })
    }
}

