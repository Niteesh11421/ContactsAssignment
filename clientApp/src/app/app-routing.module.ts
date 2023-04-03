import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditContactsComponent } from './add-edit-contacts/add-edit-contacts.component';
import { ListContactsComponent } from './list-contacts/list-contacts.component';

const routes: Routes = [{ path: '', redirectTo: '/contactslist', pathMatch: 'full' },
{path:'contactslist', component: ListContactsComponent},
{path:'addeditcontacts', component: AddEditContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
