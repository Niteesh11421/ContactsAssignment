import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientAppService } from '../client-app.service';
import { Contacts } from '../contacts.model';

@Component({
  selector: 'app-list-contacts',
  templateUrl: './list-contacts.component.html',
  styleUrls: ['./list-contacts.component.css']
})
export class ListContactsComponent {
  listContacts: Contacts[] = [];
  isSortAsc: boolean = false;
  constructor(private clientAppService: ClientAppService, private router: Router) {
  }

  ngOnInit() {
    this.getContactsList()
  }

  getContactsList() {
    this.clientAppService.getContactList().subscribe((result: any) => {
      this.listContacts = result;
    });
  }

  addOrEditContacts(cont: Contacts) {
    this.clientAppService.contactsServiceDetails = cont;
    this.router.navigate(['/addeditcontacts']);
  }

  addContacts() {
    if (this.clientAppService.contactsServiceDetails) {
      this.clientAppService.contactsServiceDetails.Id = 0;
      this.clientAppService.contactsServiceDetails.FirstName = '';
      this.clientAppService.contactsServiceDetails.LastName = '';
      this.clientAppService.contactsServiceDetails.Email = '';
      this.clientAppService.contactsServiceDetails.Address = ''
      this.clientAppService.contactsServiceDetails.PhoneNumber = 0;
      this.clientAppService.contactsServiceDetails.City = '';
      this.clientAppService.contactsServiceDetails.State = '';
      this.clientAppService.contactsServiceDetails.Country = '';
      this.clientAppService.contactsServiceDetails.PostalCode = 0
    }
    this.router.navigate(['/addeditcontacts']);
  }

  columnSort(colName: any) {
    let contactsList: any = this.listContacts;
    if (this.isSortAsc == true) {
      contactsList.sort((a: any, b: any) => a[colName] < b[colName] ? 1 : a[colName] > b[colName] ? -1 : 0)
      this.isSortAsc = !this.isSortAsc
    }
    else {
      contactsList.sort((a: any, b: any) => a[colName] > b[colName] ? 1 : a[colName] < b[colName] ? -1 : 0)
      this.isSortAsc = !this.isSortAsc
    }
  }
}
