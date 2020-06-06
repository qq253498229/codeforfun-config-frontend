import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
    {path: '', pathMatch: 'full', redirectTo: '/home'},
    {path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
    {path: 'project', loadChildren: () => import('./pages/project/project.module').then(m => m.ProjectModule)},
    {path: 'env', loadChildren: () => import('./pages/env/env.module').then(m => m.EnvModule)},
    {path: 'conf', loadChildren: () => import('./pages/conf/conf.module').then(m => m.ConfModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
