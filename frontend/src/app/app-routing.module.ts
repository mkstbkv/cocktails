import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CocktailsComponent } from './pages/cocktails/cocktails.component';
import { LoginComponent } from './pages/login/login.component';
import { NewCocktailComponent } from './pages/new-cocktail/new-cocktail.component';
import { RoleGuardService } from './services/role-guard.service';
import { CocktailDetailsComponent } from './pages/cocktail-details/cocktail-details.component';
import { MyCocktailsComponent } from './pages/my-cocktails/my-cocktails.component';

const routes: Routes = [
  {path: '', component: CocktailsComponent},
  {
    path: 'cocktails/:id',
    component: CocktailDetailsComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {path: 'login', component: LoginComponent},
  {
    path: 'new-cocktail',
    component: NewCocktailComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {
    path: 'myCocktails',
    component: MyCocktailsComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
