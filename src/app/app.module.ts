import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MaterialModule } from './shared/material.module';
import { PublisherListComponent } from './pages/publisher-list/publisher-list.component';
import { InterceptorService } from './core/interceptor/interceptor.service';
import { LoginComponent } from './pages/auth/login/login.component';
import { HomeComponent } from './core/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TablePrimengComponent } from './pages/publisher-list/table-primeng/table-primeng.component';
import { TableMaterialComponent } from './pages/publisher-list/table-material/table-material.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    PublisherListComponent,
    DashboardComponent,
    TableMaterialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TablePrimengComponent,
    MaterialModule
  ],
  providers: [
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
//providers: [JwtHelperService],  // <-- Add this line
