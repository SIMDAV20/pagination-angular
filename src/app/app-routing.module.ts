import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JwPaginationModule } from 'jw-angular-pagination';

import { PaginationComponent } from './pages/pagination/pagination.component';
import { PaginationNgxComponent } from './pages/pagination-ngx/pagination-ngx.component';
import { AnimationsComponent } from './pages/animations/animations.component';

const routes: Routes = [
  { path: '', component: PaginationComponent },
  { path: 'pagination-ngx', component: PaginationNgxComponent },
  { path: 'animations', component: AnimationsComponent },
];

@NgModule({
  imports: [
    JwPaginationModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
