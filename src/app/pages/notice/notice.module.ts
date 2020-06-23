import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {NoticeComponent} from './notice/notice.component';
import {RouterModule, Routes} from "@angular/router";

const routes: Routes = [
    {path: '', component: NoticeComponent},
]

@NgModule({
    declarations: [NoticeComponent],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes),
    ]
})
export class NoticeModule {
}
