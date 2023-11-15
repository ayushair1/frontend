import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManagerComponent } from './manager/manager.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/LoginComponent';
import { DeveloperComponent } from './developer/developer.component';
import { AuthGuard } from './_auth/auth.guard';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'manager', component: ManagerComponent, canActivate:[AuthGuard], data:{role:['Manager']} },
  { path: 'developer', component: DeveloperComponent,  canActivate:[AuthGuard], data:{role:['Developer']} },
  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}