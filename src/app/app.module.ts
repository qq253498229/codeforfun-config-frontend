import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {SharedModule} from "./pages/shared/shared.module";
import {NzMenuModule} from "ng-zorro-antd";
import {HotkeyModule} from "angular2-hotkeys";

registerLocaleData(zh);

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        NzMenuModule,
        HotkeyModule.forRoot({
            //禁止热键提示，默认false
            disableCheatSheet: false,
            //快捷键，默认?
            cheatSheetHotkey: '?',
            //是否允许使用ESC快捷键关闭，默认false
            cheatSheetCloseEsc: true,
            cheatSheetCloseEscDescription: '隐藏帮助页面',
            cheatSheetDescription: '显示 / 隐藏帮助页面'
        })
    ],
    providers: [{provide: NZ_I18N, useValue: zh_CN}],
    bootstrap: [AppComponent]
})
export class AppModule {
}
