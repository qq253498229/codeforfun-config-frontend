import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";
import {DetailComponent} from './detail/detail.component';

const routes: Routes = [
    {path: '', component: ListComponent},
    {path: 'new/:envId', component: DetailComponent},
]

@NgModule({
    declarations: [ListComponent, DetailComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class ConfModule {
}
