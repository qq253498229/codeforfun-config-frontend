import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListComponent} from './list/list.component';
import {DetailComponent} from './detail/detail.component';
import {RouterModule, Routes} from "@angular/router";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [
    {path: '', component: ListComponent},
    {path: 'new', component: DetailComponent},
    {path: 'edit/:id', component: DetailComponent},
]


@NgModule({
    declarations: [ListComponent, DetailComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class AppModule {
}
