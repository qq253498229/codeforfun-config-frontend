import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {IconsProviderModule} from "../../icons-provider.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    NgZorroAntdModule,
} from "ng-zorro-antd";
import {InputTrimModule} from "ng2-trim-directive";
import {BadRequestInterceptor} from "./bad-request.interceptor";
import {HotkeyModule} from "angular2-hotkeys";

const THIRD_MODULES = [
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    HttpClientModule,
    NgZorroAntdModule,
    InputTrimModule,
    HotkeyModule,
];

const COMPONENTS = [];
const DIRECTIVES = [];
const PIPES = [];
const HTTP_INTERCEPTOR_LIST = [
    {provide: HTTP_INTERCEPTORS, useClass: BadRequestInterceptor, multi: true}
];


@NgModule({
    declarations: [
        ...PIPES,
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    imports: [
        CommonModule,
        ...THIRD_MODULES,
    ],
    exports: [
        ...THIRD_MODULES,
        ...PIPES,
        ...COMPONENTS,
        ...DIRECTIVES,
    ],
    providers: [
        ...HTTP_INTERCEPTOR_LIST,
    ]
})
export class SharedModule {
}
