import {NgModule} from '@angular/core';
import {ListComponent} from './list/list.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {CommonModule} from "@angular/common";

const routes: Routes = [
    {path: '', component: ListComponent}
]

@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class ProjectModule {
}
