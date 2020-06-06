import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {IconsProviderModule} from "../../icons-provider.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const THIRD_MODULES = [
    FormsModule,
    ReactiveFormsModule,
    IconsProviderModule,
    HttpClientModule,
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