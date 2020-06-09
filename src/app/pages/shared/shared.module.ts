import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {IconsProviderModule} from "../../icons-provider.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
    NgZorroAntdModule,
} from "ng-zorro-antd";
import {InputTrimModule} from "ng2-trim-directive";

const THIRD_MODULES = [
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    HttpClientModule,
    NgZorroAntdModule,
    InputTrimModule,
];

const COMPONENTS = [];
const DIRECTIVES = [];
const PIPES = [];


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
    ]
})
export class SharedModule {
}
