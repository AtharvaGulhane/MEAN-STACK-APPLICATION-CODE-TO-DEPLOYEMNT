import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user/user-form/user-form.component';
import { UserListComponent } from './user/user-list/user-list.component';

// Export the routes so it can be used in other files
export const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'create', component: UserFormComponent },
  { path: 'edit/:id', component: UserFormComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), UserListComponent, UserFormComponent],
  exports: [RouterModule, UserListComponent, UserFormComponent]
})
export class AppRoutingModule { }
