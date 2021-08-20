import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//UX Import
import { UxModule } from './ux/ux.module';

//Custom Components
import { DashbaordComponent } from './pages/dashbaord/dashbaord.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ShellComponent } from './shared/shell/shell.component';

//Providers
import { ConfirmationService, MessageService } from 'primeng/api';
import { CompaniesComponent } from './pages/companies/companies.component';
import { CompaniesFormComponent } from './pages/companies/companies-form/companies-form.component';
import { MapComponent } from './pages/map/map.component';
import { LocationsComponent } from './pages/locations/locations.component';
import { LocationsFormComponent } from './pages/locations/locations-form/locations-form.component';

const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    canActivate: [],
    children: [
      {
        path: 'dashboard',
        component: DashbaordComponent,
      },
      {
        path: 'companies',
        component: CompaniesComponent,
      },
      {
        path: 'companies/form',
        component: CompaniesFormComponent,
      },
      {
        path: 'companies/form/:id',
        component: CompaniesFormComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DashbaordComponent,
    SidebarComponent,
    ShellComponent,
    CompaniesComponent,
    CompaniesFormComponent,
    MapComponent,
    LocationsComponent,
    LocationsFormComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    UxModule,
  ],
  providers: [ConfirmationService, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
