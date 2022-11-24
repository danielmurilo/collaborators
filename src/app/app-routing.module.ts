import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CadastrarUsuarioComponent } from './views/cadastrar-usuario/cadastrar-usuario.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { EditCollaboratorComponent } from './views/edit-collaborator/edit-collaborator.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { NewCollaboratorComponent } from './views/new-collaborator/new-collaborator.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    title: "Collaborators | Home"
  },
  {
    path: 'login',
    component: LoginComponent,
    title: "Collaborators | Login"
  },
  {
    path: 'cadastrar',
    component: CadastrarUsuarioComponent, 
    title: "Collaborators | Cadastre-se"
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    title: "Collaborators | Painel de Controle"
  },
  {
    path: 'dashboard/new',
    component: NewCollaboratorComponent,
    title: 'Collaborators | Novo Colaborador',
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard/edit/:id',
    component: EditCollaboratorComponent,
    title: 'Collaborators | Editar Colaborador',
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
