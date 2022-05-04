import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { JwPaginationModule } from 'jw-angular-pagination';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginationComponent } from './pages/pagination/pagination.component';
import { PaginationNgxComponent } from './pages/pagination-ngx/pagination-ngx.component';
import { AnimationsComponent } from './pages/animations/animations.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    PaginationNgxComponent,
    AnimationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    JwPaginationModule,
    NgxPaginationModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
